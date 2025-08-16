import './App.css';
import Pokemon  from './Pokemon.js';
import NoMachine from './NoMachine.js';
import DogPics from './DogPics.js';
import YesNo from './YesNo.js';
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
                <button onClick={() => setActiveComponent('dog-pics')} className={`switch-button ${activeComponent === 'dog-pics' ? 'active' : ''}`}>
                    Dog Pics
                </button>
                <button onClick={() => setActiveComponent('yes-no')} className={`switch-button ${activeComponent === 'yes-no' ? 'active' : ''}`}>
                    Yes/No
                </button>
            </div>
            <div className='component-display'>
                {activeComponent === 'no' && <NoMachine/>}
                {activeComponent === 'pokemon' && <Pokemon/>}
                {activeComponent === 'dog-pics' && <DogPics/>}
                {activeComponent === 'yes-no' && <YesNo/>}

            </div>
            <div className='app-footer'>
                <p>React playground</p>
            </div>
        </div>
    );
}
export default App;