import React from 'react';

const ResultCard = ({ result }) => {
  const isReal = result.verdict === 'REAL';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '25px',
      marginTop: '25px',
      border: `2px solid ${isReal ? 'rgba(40,167,69,0.5)' : 'rgba(220,53,69,0.5)'}`,
      boxShadow: `0 8px 32px ${isReal ? 'rgba(40,167,69,0.2)' : 'rgba(220,53,69,0.2)'}`,
      animation: 'fadeIn 0.5s ease'
    }}>

      {/* Verdict */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '2.5rem' }}>{isReal ? '✅' : '❌'}</span>
        <div>
          <h2 style={{
            color: isReal ? '#51cf66' : '#ff6b6b',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {result.verdict}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            AI Confidence Score
          </p>
        </div>
      </div>

      {/* Confidence Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Confidence</span>
          <span style={{ color: 'white', fontWeight: 'bold' }}>{result.confidence}%</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '10px' }}>
          <div style={{
            width: `${result.confidence}%`,
            background: isReal
              ? 'linear-gradient(90deg, #51cf66, #94d82d)'
              : 'linear-gradient(90deg, #ff6b6b, #f5576c)',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 1s ease'
          }} />
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h4 style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>📋 Explanation</h4>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>{result.explanation}</p>
      </div>

      {/* Sources */}
      {result.sources && result.sources.length > 0 && (
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}>🔗 Trusted Sources</h4>
          {result.sources.map((source, index) => (
            <a key={index} href={source} target="_blank" rel="noreferrer"
              style={{
                display: 'block',
                color: '#74c0fc',
                marginBottom: '8px',
                fontSize: '0.9rem',
                textDecoration: 'none',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
              🌐 {source}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultCard;