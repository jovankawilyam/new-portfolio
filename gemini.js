import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY tidak ditemukan di .env");
  process.exit(1);
}

const ai = new GoogleGenerativeAI(apiKey);

async function tanyaGemini() {
  const prompt = process.argv.slice(2).join(" "); 
  if (!prompt) {
    console.log("❌ Masukkan pertanyaan!");
    return;
  }

  try {
    console.log("🤖 Gemini sedang berpikir...");
    
    // Gunakan model yang paling umum tersedia
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    console.log("\n================ JAWABAN GEMINI ================\n");
    console.log(result.response.text());
    console.log("\n================================================\n");
    
  } catch (error) {
    console.error("❌ Kesalahan:", error.message);
    if (error.status === 404) {
      console.log("\n⚠️ Model tidak ditemukan. Mencoba mencantumkan model yang tersedia...");
      try {
        // Coba model lain sebagai fallback jika flash tidak ada
        const fallbackModel = ai.getGenerativeModel({ model: "gemini-pro" });
        const fallbackResult = await fallbackModel.generateContent(prompt);
        console.log("\n(Berhasil menggunakan fallback: gemini-pro)");
        console.log(fallbackResult.response.text());
      } catch (e) {
        console.log("❌ Gagal juga menggunakan model fallback.");
      }
    }
  }
}

tanyaGemini();