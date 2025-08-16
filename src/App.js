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
            <div className='app-footer'>
                <p>React playground</p>
            </div>
        </div>
    );
}
export default App;