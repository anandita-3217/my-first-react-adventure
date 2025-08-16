// No app
import { useState } from 'react';
import './NoMachine.css';
function NoMachine() {
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
        const response = await fetch("http://localhost:5000/no");
        const data = await response.json();
        setAnswer(`${data.reason}`);
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
    
    
    setLoading(false);
  };
  // const fetchNo = async () =>{
  //   setLoading(true);
  //   try{
  //     const noresponse = await fetch("http:localhost:5000/no");
  //     const data = await noresponse.json();
  //     setAnswer(`${data.reason}`);
  //   }
  //   catch(error){
  //     console.error('Failed due to:',error);
  //     setAnswer(error);
  //   }
  // };

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
    askTheNoOracle();
    }
};

  return (
    <div className="no-machine-container">
      <h1 className="no-machine-title">
        🚫 The Ultimate "NO" Machine 🚫
      </h1>
      
      <p className="no-machine-subtitle">
        Ask me anything and I'll tell you why you shouldn't do it!
      </p>

      <div className="no-machine-input-section">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Should I eat that entire pizza?"
          className="no-machine-input"
          onKeyPress={handleKeyPress}
        />
        
        <button
          onClick={askTheNoOracle}
          disabled={loading}
          className="no-machine-button"
        >
          {loading ? 'Thinking...' : 'Ask the Oracle'}
        </button>
        {/* <button
          onClick={fetchNo}
          disabled={loading}
          className="no-machine-button"
        >
Get a reason
        </button> */}
      </div>

      {answer && (
        <div className="no-machine-answer">
          <h3 className="answer-title">Oracle Says:</h3>
          <p className="answer-text">{answer}</p>
        </div>
      )}

      <div className="app-footer">
        <p>Powered by stubbornness and poor life choices</p>
      </div>
    </div>
  );
}
export default NoMachine;

