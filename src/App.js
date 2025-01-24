import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchRandomArtwork = async () => {
      try {
        // Fetch object IDs
        const response = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=baroque');
        const objectIDs = response.data.objectIDs;
        
        // Select a random object ID
        const randomIndex = Math.floor(Math.random() * objectIDs.length);
        const randomObjectID = objectIDs[randomIndex];
        
        // Fetch artwork details
        const artworkResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`);
        setArtwork(artworkResponse.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    };

    fetchRandomArtwork();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Baroque Artwork</h1>
        <div className="art-container">
          {artwork ? (
            <div>
              <img src={artwork.primaryImageSmall} alt={artwork.title} className="art-image" />
              <p>{artwork.artistDisplayName}</p>
              <p>{artwork.title}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

