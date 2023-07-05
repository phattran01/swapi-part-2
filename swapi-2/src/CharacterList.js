import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './site.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <body>
        <div>

            <h1>Star Wars Universe Lookup</h1>
            <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool here)</span></label>

            <section id="charactersList">
            {characters.map(character => (
                <div key={character.id}>
                <Link class="individuals" to={`/characters/${character.id}`}>{character.name}</Link>
                </div>
            ))}
            </section>

        </div>
    </body>
  );
}

export default CharacterList;