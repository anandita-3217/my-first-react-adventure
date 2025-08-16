import './GitHubFind.css';
import { useState } from 'react';
function GitHubFind(){
    const [gitHubProfile, setGitHubProfile] = useState('');
    const [gitHubData, setGitHubData] = useState(null);
    const [error, setError] = useState('');
    const fetchGitHub = async () =>{
        if(!gitHubProfile.trim()){
            setError('Enter valid profile');
            return;
        }
        setError('');
        setGitHubData(null);
        try{
            const response = await fetch(`https://api.github.com/users/${gitHubProfile}`);
            if(!response.ok){
                throw new Error("Not a valid profile");
                
            }
            const data = await response.json();
            setGitHubData(data);
        }
        catch(error){
            console.log(error);
            setError(error.message);
        }
    };
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            fetchGitHub();
        }
    };
    const getMyGitHub = () => {
        setGitHubProfile('anandita-3217');

    };
    return(
    <div className='git-hub-container'>
        <h1 className='git-hub-title'>Find Anyone's GitHub</h1>
        <p className='git-hub-subtitle'>Search for people using their GitHub usernames</p>
        <div className='git-hub-input-section'>
            
            <input type='text' className='git-hub-input' value={gitHubProfile} placeholder='Find people with their github username' onChange={(e)=>setGitHubProfile(e.target.value)} onKeyPress={handleKeyPress} />
            
            <button onClick={fetchGitHub} className='git-hub-button'>Find</button>
            <button onClick={getMyGitHub} className='git-hub-button'>My GitHub</button>
            
        </div>
            {error && (<div className='git-hub-error'>{error}</div>)}

            {gitHubData && 
            <div className='git-hub-data'>
                <h2 className='git-hub-name'>{gitHubData.login}</h2>
                <div className='git-hub-image-container'>
                    <h4>{gitHubData.name}</h4>
                    <a href={`${gitHubData.html_url}`}>
                        <img src={gitHubData.avatar_url} alt={gitHubData.name} className='git-hub-image'/>
                    </a>
                </div>
                <div className='git-hub-stats'>
                    <h3>Base Stats</h3>
                    <div className='stats-grid'>
                        <div className='stat-item'><strong>Public Repos:</strong>{gitHubData.public_repos}</div>
                        <div className='stat-item'><strong>Followers:</strong>{gitHubData.followers}</div>
                        <div className='stat-item'><strong>Following:</strong>{gitHubData.following}</div>
                    </div>
                </div>
            </div>
            }
        <div className='git-hub-footer'>All the best!</div>
    </div>
    );

}
export default GitHubFind;
