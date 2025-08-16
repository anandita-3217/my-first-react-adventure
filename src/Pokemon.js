// Pokemon app
import { useState } from 'react';
import './Pokemon.css';

function Pokemon() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPokemon = async () => {
    if (!pokemonName.trim()) {
      setError('Enter a Pokémon name first!');
      return;
    }

    setLoading(true);
    setError('');
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error('Pokémon not found! Try "pikachu", "charizard", or "bulbasaur"');
      }

      const data = await response.json();
      setPokemonData(data);
      
    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchPokemon();
    }
  };

  const getRandomPokemon = () => {
    const randomPokemon = [
      'pikachu', 'charizard', 'bulbasaur', 'squirtle', 
      'jigglypuff', 'meowth', 'psyduck', 'snorlax',
      'eevee', 'mew', 'lucario', 'garchomp'
    ];
    const random = randomPokemon[Math.floor(Math.random() * randomPokemon.length)];
    setPokemonName(random);
    // Automatically fetch it
    setTimeout(() => fetchPokemon(), 100);
  };

  return (
    <div className='pokemon-container'>
      <h1 className='pokemon-title'>🔴 Pokémon Fetcher! 🔴</h1>
      <p className='pokemon-subtitle'>Enter a Pokémon name and see their image and stats!</p>

      <div className='pokemon-input-section'>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name (e.g., pikachu)"
          className='pokemon-input'
          onKeyPress={handleKeyPress}
        />
        
        <button
          onClick={fetchPokemon}
          disabled={loading}
          className='pokemon-button'
        >
          {loading ? 'Catching...' : 'Catch Pokémon!'}
        </button>

        <button
          onClick={getRandomPokemon}
          disabled={loading}
          className='pokemon-button random'
        >
          Random
        </button>
      </div>

      {error && (
        <div className='pokemon-error'>
          {error}
        </div>
      )}

      {pokemonData && (
        <div className='pokemon-data'>
          <h2 className='pokemon-name'>
            {pokemonData.name} (#{pokemonData.id})
          </h2>
          
          <div className='pokemon-images'>
            {/* Front sprite */}
            <div className='pokemon-image-container'>
              <h4>Front</h4>
              <img 
                src={pokemonData.sprites.front_default} 
                alt={`${pokemonData.name} front`}
                className='pokemon-image'
              />
            </div>

            {/* Back sprite */}
            <div className='pokemon-image-container'>
              <h4>Back</h4>
              <img 
                src={pokemonData.sprites.back_default} 
                alt={`${pokemonData.name} back`}
                className='pokemon-image'
              />
            </div>

            {/* Shiny front (if available) */}
            {pokemonData.sprites.front_shiny && (
              <div className='pokemon-image-container shiny'>
                <h4>Shiny ✨</h4>
                <img 
                  src={pokemonData.sprites.front_shiny} 
                  alt={`${pokemonData.name} shiny`}
                  className='pokemon-image '
                />
              </div>
            )}
          </div>

          {/* Stats */}
          <div className='pokemon-stats'>
            <h3>Base Stats:</h3>
            <div className='stats-grid'>
              {pokemonData.stats.map((stat, index) => (
                <div key={index} className='stat-item'>
                  <strong>{stat.stat.name}:</strong> {stat.base_stat}
                </div>
              ))}
            </div>
          </div>

          {/* Types */}
          <div className='pokemon-types'>
            <h3>Type(s):</h3>
            <div className='types-contianer'>
              {pokemonData.types.map((type, index) => (
                <span 
                  key={index} 
                  className='type-badge'
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Height and Weight */}
          <div className='pokemon-physical'>
            <div>
              <strong>Height:</strong> {pokemonData.height / 10} meters
            </div>
            <div>
              <strong>Weight:</strong> {pokemonData.weight / 10} kg
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
