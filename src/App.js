import React, { useState, useEffect } from 'react';
import axios from 'axios';
import asciify from 'asciify-image';
import './App.css';

function App() {
  const [artworks, setArtworks] = useState([]);
  const [asciiArts, setAsciiArts] = useState({});

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('https://www.wikiart.org/en/api/2/PaintingsByStyle?style=baroque');
        console.log('Artworks fetched:', response.data.paintings);  // Log the fetched data
        setArtworks(response.data.paintings);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const generateAsciiArt = async (url) => {
      const options = {
        fit: 'box',
        width: 50,
        height: 50,
      };
      try {
        const asciiArt = await asciify(url, options);
        console.log('ASCII art generated:', asciiArt);  // Log the generated ASCII art
        setAsciiArts(prevState => ({ ...prevState, [url]: asciiArt }));
      } catch (error) {
        console.error('Error generating ASCII art:', error);
      }
    };

    artworks.forEach(art => generateAsciiArt(art.image));
  }, [artworks]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Baroque Art and ASCII Art</h1>
        {artworks.map(art => (
          <div key={art.id} className="art-container">
            <div>
              <img src={art.image} alt={art.title} className="art-image" />
              <p>{art.artistName}</p>
            </div>
            <div>
              <pre>{asciiArts[art.image]}</pre>
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
