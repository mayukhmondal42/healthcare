const express = require('express');
const reportRouter = express.Router();
const { Report } = require('../models/Reports');
const { userAuth } = require('../middleware/authmiddle');
const { upload, cloudinary, uploadToCloudinary } = require('../cloudinary/cloudinary');
const { analyzeFileBase64 } = require('../gemini-api/gemini');

reportRouter.post('/upload', userAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'File is required' });

        
        const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        console.log("Cloudinary OK:", uploadResult.secure_url);

        let ai = { ok: false, parsed: null };
        try {
            const base64File = req.file.buffer.toString("base64");
            ai = await analyzeFileBase64(base64File, req.file.mimetype);
            console.log("AI result ok:", ai.ok);
        } catch (aiErr) { console.log("AI failed, still saving:", aiErr.message); }

        const report = await Report.create({
            user: req.user._id,
            filename: req.file.originalname,
            fileUrl: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            title: ai?.parsed?.title || req.file.originalname,
            date: ai?.parsed?.date || '',
            summary: ai?.parsed?.summary || 'Report uploaded',
            explanation_en: ai?.parsed?.explanation_en || ai?.parsed?.summary || '',
            explanation_ro: ai?.parsed?.explanation_ro || '',
            suggested_questions: ai?.parsed?.suggested_questions || [],
        });
        return res.status(200).json({ success: true, message: 'Report processed ✅', report });
    } catch (err) {
        console.error("Upload Error:", err);
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

reportRouter.get('/myreports', userAuth, async (req, res) => {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, reports });
});

reportRouter.delete('/:id', userAuth, async (req, res) => {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
    if (report.public_id) await cloudinary.uploader.destroy(report.public_id);
    await Report.findByIdAndDelete(report._id);
    return res.json({ success: true, message: 'Report deleted ✅' });
});

reportRouter.get('/insights', userAuth, async (req, res) => {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    const insights = reports.map((r) => ({
        _id: r._id, reportTitle: r.title || r.filename,
        summary: r.summary || "No summary available",
        explanation_en: r.explanation_en || "No explanation available",
        explanation_ro: r.explanation_ro || "No explanation available",
    }));
    return res.json({ success: true, insights });
});

reportRouter.get('/:id', userAuth, async (req, res) => {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
    return res.json({ success: true, report });
});

module.exports = { reportRouter };