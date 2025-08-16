// Pokemon app
// import { useState } from 'react';

// function App() {
//   const [pokemonName, setPokemonName] = useState('');
//   const [pokemonData, setPokemonData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchPokemon = async () => {
//     if (!pokemonName.trim()) {
//       setError('Enter a Pokémon name first!');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setPokemonData(null);

//     try {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      
//       if (!response.ok) {
//         throw new Error('Pokémon not found! Try "pikachu", "charizard", or "bulbasaur"');
//       }

//       const data = await response.json();
//       setPokemonData(data);
      
//     } catch (err) {
//       setError(err.message);
//     }
    
//     setLoading(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       fetchPokemon();
//     }
//   };

//   const getRandomPokemon = () => {
//     const randomPokemon = [
//       'pikachu', 'charizard', 'bulbasaur', 'squirtle', 
//       'jigglypuff', 'meowth', 'psyduck', 'snorlax',
//       'eevee', 'mew', 'lucario', 'garchomp'
//     ];
//     const random = randomPokemon[Math.floor(Math.random() * randomPokemon.length)];
//     setPokemonName(random);
//     // Automatically fetch it
//     setTimeout(() => fetchPokemon(), 100);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
//       <h1>🔴 Pokémon Fetcher! 🔴</h1>
//       <p>Enter a Pokémon name and see their image and stats!</p>

//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={pokemonName}
//           onChange={(e) => setPokemonName(e.target.value)}
//           placeholder="Enter Pokémon name (e.g., pikachu)"
//           style={{
//             padding: '10px',
//             width: '250px',
//             fontSize: '16px',
//             marginRight: '10px',
//             border: '2px solid #ddd',
//             borderRadius: '5px'
//           }}
//           onKeyPress={handleKeyPress}
//         />
        
//         <button
//           onClick={fetchPokemon}
//           disabled={loading}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: '#ff6b6b',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             marginRight: '10px'
//           }}
//         >
//           {loading ? 'Catching...' : 'Catch Pokémon!'}
//         </button>

//         <button
//           onClick={getRandomPokemon}
//           disabled={loading}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: '#4ecdc4',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: loading ? 'not-allowed' : 'pointer'
//           }}
//         >
//           Random
//         </button>
//       </div>

//       {error && (
//         <div style={{
//           padding: '15px',
//           backgroundColor: '#ffebee',
//           border: '2px solid #f44336',
//           borderRadius: '5px',
//           color: '#f44336',
//           marginBottom: '20px'
//         }}>
//           {error}
//         </div>
//       )}

//       {pokemonData && (
//         <div style={{
//           border: '2px solid #ddd',
//           borderRadius: '10px',
//           padding: '20px',
//           backgroundColor: '#f9f9f9'
//         }}>
//           <h2 style={{ textTransform: 'capitalize', color: '#333' }}>
//             {pokemonData.name} (#{pokemonData.id})
//           </h2>
          
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//             {/* Front sprite */}
//             <div style={{ textAlign: 'center' }}>
//               <h4>Front</h4>
//               <img 
//                 src={pokemonData.sprites.front_default} 
//                 alt={`${pokemonData.name} front`}
//                 style={{ width: '150px', height: '150px', border: '2px solid #ddd', borderRadius: '10px' }}
//               />
//             </div>

//             {/* Back sprite */}
//             <div style={{ textAlign: 'center' }}>
//               <h4>Back</h4>
//               <img 
//                 src={pokemonData.sprites.back_default} 
//                 alt={`${pokemonData.name} back`}
//                 style={{ width: '150px', height: '150px', border: '2px solid #ddd', borderRadius: '10px' }}
//               />
//             </div>

//             {/* Shiny front (if available) */}
//             {pokemonData.sprites.front_shiny && (
//               <div style={{ textAlign: 'center' }}>
//                 <h4>Shiny ✨</h4>
//                 <img 
//                   src={pokemonData.sprites.front_shiny} 
//                   alt={`${pokemonData.name} shiny`}
//                   style={{ width: '150px', height: '150px', border: '2px solid #ffd700', borderRadius: '10px' }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Stats */}
//           <div style={{ marginTop: '20px' }}>
//             <h3>Base Stats:</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
//               {pokemonData.stats.map((stat, index) => (
//                 <div key={index} style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
//                   <strong style={{ textTransform: 'capitalize' }}>{stat.stat.name}:</strong> {stat.base_stat}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Types */}
//           <div style={{ marginTop: '15px' }}>
//             <h3>Type(s):</h3>
//             <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//               {pokemonData.types.map((type, index) => (
//                 <span 
//                   key={index} 
//                   style={{
//                     padding: '5px 15px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     borderRadius: '20px',
//                     textTransform: 'capitalize',
//                     fontSize: '14px'
//                   }}
//                 >
//                   {type.type.name}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Height and Weight */}
//           <div style={{ marginTop: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//             <div>
//               <strong>Height:</strong> {pokemonData.height / 10} meters
//             </div>
//             <div>
//               <strong>Weight:</strong> {pokemonData.weight / 10} kg
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// No app
// import { useState } from 'react';
// import './App.css';
// function App() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const askTheNoOracle = async () => {
//     if (!question.trim()) {
//       setAnswer('Ask me something first! (But the answer will still be no)');
//       return;
//     }

//     setLoading(true);      
//       try {
//         const response = await fetch("http://localhost:5000/no");
//         const data = await response.json();
//         setAnswer(`${data.reason}`);
//       } catch (backupError) {
//         console.error('Backup failed too:', backupError);
        
//         // Final fallback: Our own creative "no"
//         const creativeFails = [
//           'NO - The API is having trust issues',
//           'NO - Even the internet is saying no to this request',
//           'NO - CORS blocked us harder than a nightclub bouncer',
//           'NO - The API went out for cigarettes and never came back',
//           'NO - Error 404: Motivation not found'
//         ];
        
//         const randomFail = creativeFails[Math.floor(Math.random() * creativeFails.length)];
//         setAnswer(randomFail);
//       }
    
    
//     setLoading(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       askTheNoOracle();
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1 className="app-title">
//         🚫 The Ultimate "NO" Machine 🚫
//       </h1>
      
//       <p className="app-subtitle">
//         Ask me anything and I'll tell you why you shouldn't do it!
//       </p>

//       <div className="input-section">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Should I eat that entire pizza?"
//           className="question-input"
//           onKeyPress={handleKeyPress}
//         />
        
//         <button
//           onClick={askTheNoOracle}
//           disabled={loading}
//           className="submit-button"
//         >
//           {loading ? 'Thinking...' : 'Ask the Oracle'}
//         </button>
//       </div>

//       {answer && (
//         <div className="answer-box">
//           <h3 className="answer-title">Oracle Says:</h3>
//           <p className="answer-text">{answer}</p>
//         </div>
//       )}

//       <div className="app-footer">
//         <p>Powered by stubbornness and poor life choices</p>
//       </div>
//     </div>
//   );
// }

// export default App;
import './App.css';
import Pokemon  from './Pokemon.js';
import NoMachine from './NoMachine.js';
import { useState } from 'react';

function App(){
    const [activeComponent,setActiveComponent] = useState('no');
    return (
        <div className='app-container'>
            <h1 className='main-title'> My React Learning Sandbox</h1>
            <div className='component-switcher'>
                <button onClick={() => setActiveComponent('no')} className={`switch-button ${activeComponent === 'no' ? 'active' : ''}`}>
                    No Machine
                </button>
                <button onClick={() => setActiveComponent('pokemon')} className={`switch-button ${activeComponent === 'pokemon' ? 'active' : ''}`}>
                    Pokemon Fetcher
                </button>
            </div>
            <div className='component-display'>
                {activeComponent === 'no' && <NoMachine/>}
                {activeComponent === 'pokemon' && <Pokemon/>}

            </div>
            <div className='main-app-footer'>
                <p>React playgounrd pls work</p>
            </div>
        </div>
    );
}
export default App;