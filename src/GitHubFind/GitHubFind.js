import './GitHubFind.css';
import { useState } from 'react';
function GitHubFind(){
    const [gitHubProfile, setGitHubProfile] = useState('');
    const [gitHubData, setGitHubData] = useState(null);
    const [error, setError] = useState('');
    const fetchLanguages = async(username) =>{
        try{
            const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            const repos = await repoResponse.json();
            const languages = {};
            repos.forEach(repo => {
                if(repo.language){
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });
            return languages;
        }
        catch(error){
            console.log("Language fetch failed: ",error);
            return {};
        }
    };  
    const fetchContributionStreak = async (username) => {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        const data = await response.json();
        
        // This gives you contribution data by year
        return {
            currentStreak: data.contributions?.[0]?.contributionDays?.length || 0,
            totalContributions: data.total?.contributions || 0
        };
    } catch (error) {
        console.log("Contribution fetch failed:", error);
        return { currentStreak: 0, totalContributions: 0 };
    }
};
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
            const languages = await fetchLanguages(gitHubProfile);
            const streak = await fetchContributionStreak(gitHubProfile);

            setGitHubData({
                ...data,
                languages,
                contributionStreak: streak
            });

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
    const getGitHubAge = (createdAt) => {
        const years = new Date().getFullYear() - new Date(createdAt).getFullYear();
        return `${years} year${years !== 1 ? 's' : ''}`;
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
                        <div className='stat-item'><strong>GitHub Age:  </strong>{getGitHubAge(gitHubData.created_at)}</div>
                        <div className='stat-item'><strong>Public Repos:    </strong>{gitHubData.public_repos}</div>
                        <div className='stat-item'><strong>Followers:   </strong>{gitHubData.followers}</div>
                        <div className='stat-item'><strong>Following:   </strong>{gitHubData.following}</div>
                        <div className='stat-item'><strong>Languages:   </strong>
                        {gitHubData.languages ? Object.entries(gitHubData.languages).map(([lang, count]) => `${lang} (${count})`) .join(', ') : 'Loading...'}</div>
                        <div className='stat-item'><strong>Contribution Streak: </strong>{gitHubData.contributionStreak ? `${gitHubData.contributionStreak.currentStreak} days` : 'Loading...'}</div>
                    </div>
                </div>
            </div>
            }
        <div className='git-hub-footer'>All the best!</div>
    </div>
    );

}
export default GitHubFind;
