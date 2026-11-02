const mongoose = require('mongoose');
const { Schema } = mongoose;

const VitalsSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bp: { type: String, trim: true, default: "" },
    sugar: { type: String, trim: true, default: "" },
    weight: { type: String, trim: true, default: "" },
    note: { type: String, trim: true, default: "" },
    date: { type: Date, default: Date.now },
}, {
    collection: 'vitals',
    timestamps: true
});

const Vitals = mongoose.model('Vitals', VitalsSchema);

module.exports = { Vitals };