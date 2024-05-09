import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Github() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleUsernameChange = debounce((newUsername) => {
    setUsername(newUsername);
  }, 500); 

 
  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) return; // Don't fetch if the username is empty

      setIsSearching(true);
      setError(''); // Clear previous errors
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const reposResponse = await axios.get(userResponse.data.repos_url);

        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('User not found');
        } else {
          setError('Error fetching data');
        }
        setUser(null);
        setRepos([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchGitHubData();
  }, [username]); // Depend on username

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub Username"
        onChange={(e) => handleUsernameChange(e.target.value)}
      />

      {isSearching && <p>Searching...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h1>{user.name || 'No Name'}</h1>
          <p>{user.bio || 'No Bio available.'}</p>
          <img src={user.avatar_url} alt={user.login || 'User'} style={{ width: 100, height: 100 }} />
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <h2>Repositories</h2>
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a> - Stars: {repo.stargazers_count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Github;
