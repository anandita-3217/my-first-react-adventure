import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askTheNoOracle = async () => {
    if (!question.trim()) {
      setAnswer('Ask me something first! (But the answer will still be no)');
      return;
    }

    setLoading(true);
    
    try {
      // Let's try a different approach - using cors-anywhere
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = 'https://naas.isalman.dev/no';
      
      const response = await fetch(proxyUrl + apiUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.text();
      setAnswer(`The real API says: "${data}" 🎉`);
      
    } catch (error) {
      console.error('First attempt failed, trying backup...', error);
      
      // Backup plan: Try the original API directly (sometimes it works!)
      try {
        const response = await fetch('https://naas.isalman.dev/no');
        const data = await response.text();
        setAnswer(`Direct API call worked: "${data}" 🎉`);
      } catch (backupError) {
        console.error('Backup failed too:', backupError);
        
        // Final fallback: Our own creative "no"
        const creativeFails = [
          'NO - The API is having trust issues',
          'NO - Even the internet is saying no to this request',
          'NO - CORS blocked us harder than a nightclub bouncer',
          'NO - The API went out for cigarettes and never came back',
          'NO - Error 404: Motivation not found'
        ];
        
        const randomFail = creativeFails[Math.floor(Math.random() * creativeFails.length)];
        setAnswer(randomFail);
      }
    }
    
    setLoading(false);
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>
        🚫 The Ultimate "NO" Machine 🚫
      </h1>
      
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Ask me anything and I'll tell you why you shouldn't do it!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Should I eat that entire pizza?"
          style={{
            padding: '12px',
            width: '300px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            marginRight: '10px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && askTheNoOracle()}
        />
        
        <button
          onClick={askTheNoOracle}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Thinking...' : 'Ask the Oracle'}
        </button>
      </div>

      {answer && (
        <div style={{
          padding: '20px',
          backgroundColor: '#ffebee',
          border: '2px solid #d32f2f',
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>
            Oracle Says:
          </h3>
          <p style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>
            {answer}
          </p>
        </div>
      )}

      <div style={{ marginTop: '40px', fontSize: '14px', color: '#999' }}>
        <p>Powered by stubbornness and poor life choices</p>
      </div>
    </div>
  );
}

export default App;