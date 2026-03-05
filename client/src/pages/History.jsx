import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('https://fake-news-detector-of3b.onrender.com/api/history');
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fake-news-detector-of3b.onrender.com/api/history/${id}`);
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>📚 Search History</h2>
        {/* <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          Last 20 analyzed news articles
        </p> */}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="spinner" />
          <p>Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
          padding: '50px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px'
        }}>
          <p style={{ fontSize: '3rem' }}>📭</p>
          <p>No history yet — analyze some news first!</p>
        </div>
      ) : (
        history.map((item) => (
          <div key={item._id} style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '15px',
            border: `1px solid ${item.verdict === 'REAL' ? 'rgba(40,167,69,0.4)' : 'rgba(220,53,69,0.4)'}`,
            borderLeft: `4px solid ${item.verdict === 'REAL' ? '#51cf66' : '#ff6b6b'}`
          }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{
                background: item.verdict === 'REAL' ? 'rgba(40,167,69,0.2)' : 'rgba(220,53,69,0.2)',
                color: item.verdict === 'REAL' ? '#51cf66' : '#ff6b6b',
                padding: '4px 12px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {item.verdict === 'REAL' ? '✅ REAL' : '❌ FAKE'}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                🕐 {new Date(item.createdAt).toLocaleString('en-IN')}
              </span>
            </div>

            {/* News Text */}
            <p style={{
              color: 'white',
              marginBottom: '10px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {item.text}
            </p>

            {/* Confidence Bar */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Confidence</span>
                <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.confidence}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '6px' }}>
                <div style={{
                  width: `${item.confidence}%`,
                  background: item.verdict === 'REAL'
                    ? 'linear-gradient(90deg, #51cf66, #94d82d)'
                    : 'linear-gradient(90deg, #ff6b6b, #f5576c)',
                  height: '100%',
                  borderRadius: '10px'
                }} />
              </div>
            </div>

            {/* Explanation */}
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>
              {item.explanation}
            </p>

            {/* Delete Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  background: 'rgba(255,99,99,0.15)',
                  color: '#ff6b6b',
                  border: '1px solid rgba(255,99,99,0.3)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🗑️ Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default History;