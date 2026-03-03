const axios = require('axios');
const News = require('../models/News');

exports.analyzeNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'News text is required' });
    }

    const prompt = `Analyze this news and return ONLY a JSON object with these exact fields:
{
  "verdict": "REAL" or "FAKE",
  "confidence": number between 0-100,
  "explanation": "2-3 line reason",
  "sources": ["url1", "url2"]
}

News: ${text}

Return ONLY the JSON object, nothing else.`;

    const response = await axios({
      method: 'post',
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      params: {
        key: process.env.GEMINI_API_KEY
      },
      data: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500
        }
      }
    });

    const raw = response.data.candidates[0].content.parts[0].text;
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleaned);

    const saved = await News.create({
      text,
      verdict: result.verdict,
      confidence: result.confidence,
      explanation: result.explanation,
      sources: result.sources
    });

    res.status(200).json(saved);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data?.error?.message || error.message });
  }
};