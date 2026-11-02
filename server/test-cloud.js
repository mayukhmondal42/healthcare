const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { uploadToCloudinary } = require('./src/cloudinary/cloudinary');

(async () => {
  console.log("Testing TINY buffer...");
  const tinyBuffer = Buffer.from("hello test file");
  try {
    const r = await uploadToCloudinary(tinyBuffer, "image/jpeg");
    console.log("TINY SUCCESS:", r.secure_url);
  } catch(e){ 
    console.log("TINY FAIL:", e.message); 
  }

  console.log("Testing REAL file size...");
  
})();