const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const crypto = require('crypto');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary check:", process.env.CLOUDINARY_CLOUD_NAME ? "OK - " + process.env.CLOUDINARY_CLOUD_NAME : "MISSING ❌");

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only PDF and image files allowed'), false);
};

const upload = multer({ 
  storage: multer.memoryStorage(), 
  fileFilter, 
  limits: { fileSize: 10 * 1024 * 1024 } 
});


const uploadToCloudinary = async (buffer, mimetype) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "health-reports";
  const sigString = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash('sha1').update(sigString).digest('hex');

  const form = new FormData();
  form.append('file', new Blob([buffer], { type: mimetype }), 'file.jpg');
  form.append('api_key', process.env.CLOUDINARY_API_KEY);
  form.append('timestamp', timestamp);
  form.append('folder', folder);
  form.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`, {
    method: 'POST',
    body: form
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};

module.exports = { upload, cloudinary, uploadToCloudinary };