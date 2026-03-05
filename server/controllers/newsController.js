const Groq = require('groq-sdk');
const News = require('../models/News');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.analyzeNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'News text is required' });
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
         content: `Analyze this news and return ONLY a JSON object:
{
  "verdict": "REAL" or "FAKE",
  "confidence": 95,
  "explanation": "2-3 line reason",
  "sources": ["url1", "url2"]
}

Important: confidence must be a number between 60-99, never 0.

News: ${text}

Return ONLY JSON, nothing else.`
        }
      ],
      temperature: 0.1,
      max_tokens: 500
    });

    const raw = completion.choices[0].message.content;
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
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await News.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};