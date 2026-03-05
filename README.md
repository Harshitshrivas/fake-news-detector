# 📰 Fake News Detector

An AI-powered MERN stack web application that analyzes news articles and determines whether they are **REAL** or **FAKE** using the Groq AI API (LLaMA model).

## 🌐 Live Demo
- **Frontend:** https://fake-news-detector-8w9y.vercel.app
- **Backend:** https://fake-news-detector-of3b.onrender.com

## 🖼️ Screenshots
> Add screenshots here

## ✨ Features
- 🤖 AI-powered fake news detection using Groq (LLaMA 3.1)
- 📊 Confidence score with visual progress bar
- 🔗 Trusted source suggestions
- 📚 Search history saved in MongoDB
- 🗑️ Delete individual history items
- 🌙 Dark glassmorphism UI
- 🌐 Supports Hindi & English news
- ⚡ Real-time analysis

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Axios, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI API | Groq (LLaMA 3.1-8b-instant) |
| Deployment | Vercel (Frontend), Render (Backend) |

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Groq API key

### Installation

1. Clone the repo
```bash
git clone https://github.com/Harshitshrivas/fake-news-detector.git
cd fake-news-detector
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Create `.env` file in `server` folder
```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

5. Run backend
```bash
cd server
npm run dev
```

6. Run frontend
```bash
cd client
npm start
```

## 📁 Project Structure
```
fake-news-detector/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── History.jsx
│   │   └── App.js
│
├── server/                 # Node + Express Backend
│   ├── controllers/
│   │   └── newsController.js
│   ├── models/
│   │   └── News.js
│   ├── routes/
│   │   └── analyze.js
│   └── index.js
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze news article |
| GET | `/api/history` | Get search history |
| DELETE | `/api/history/:id` | Delete history item |

## 👨‍💻 Author
**Harshit Shrivas**
- GitHub: [@Harshitshrivas](https://github.com/Harshitshrivas)

## 📄 License
MIT License
