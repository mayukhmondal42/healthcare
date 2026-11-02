const { exec } = require("child_process");
const fs = require("fs");

async function analyzeFileBase64(base64, mimetype) {
  const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
  const apiKey = process.env.GEMINI_API_KEY;
  const models = ["gemini-3-flash-preview", "gemini-3.5-flash", "gemini-3.5-flash-lite"];

  const prompt = `Analyze this medical report and return ONLY JSON: {"title":"...","date":"...","summary":"...","explanation_en":"...","explanation_ro":"...","explanation_bn":"...","suggested_questions":["...","..."]} - explanation_en in simple English, explanation_ro in Roman Urdu, explanation_bn in simple Bangla`;

  for (const model of models) {
    console.log(`Trying auto model: ${model}`);
    try {
      const payload = JSON.stringify({
        contents: [{ parts: [{ inlineData: { mimeType: mimetype, data: cleanBase64 } }, { text: prompt }] }]
      });
      fs.writeFileSync("/tmp/payload.json", payload);

      const curlCmd = `curl -s "https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}" -H "Content-Type: application/json" -d @/tmp/payload.json`;

      const result = await new Promise((resolve, reject) => {
        exec(curlCmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
          if (err) return reject(err);
          resolve(stdout);
        });
      });

      const json = JSON.parse(result);
      if (json.error) throw new Error(json.error.message);
      let text = json.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start !== -1) text = text.slice(start, end + 1);
      const parsed = JSON.parse(text);
      console.log("AI result ok:", model);
      return { ok: true, parsed };
    } catch (e) {
      console.log(`Model ${model} failed:`, e.message.slice(0, 200));
    }
  }
  return { ok: false, parsed: null, error: "All models failed" };
}
module.exports = { analyzeFileBase64 };