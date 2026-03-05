import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';

const Home = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!text.trim()) {
      setError('Please enter some news text!');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:5000/api/analyze', { text });
      setResult(res.data);
    } catch (err) {
      setError('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="container">

      {/* Hero Text */}
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          Is This News Real or Fake? 🤔
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
          Paste any news headline or article — our AI will verify it instantly!
        </p>
      </div>

      {/* Input Card */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '30px',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <textarea
          rows={6}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            fontSize: '1rem',
            resize: 'vertical',
            outline: 'none',
          }}
          placeholder="📋 Paste news article or headline here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && (
          <p style={{ color: '#ff6b6b', marginTop: '10px', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
          <button
            onClick={analyze}
            disabled={loading}
            style={{
              flex: 1,
              padding: '14px',
              background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? '🔄 Analyzing...' : '🔍 Analyze News'}
          </button>

          {(text || result) && (
            <button
              onClick={cancel}
              style={{
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ✖ Cancel
            </button>
          )}
        </div>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="loading-overlay" style={{ marginTop: '30px' }}>
          <div className="spinner" />
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>AI analyzing your news...</p>
        </div>
      )}

      {/* Result */}
      {result && !loading && <ResultCard result={result} />}

    </div>
  );
};

export default Home;