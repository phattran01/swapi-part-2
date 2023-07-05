import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './site.css';

function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch(`/api/films/${id}`)
      .then(response => response.json())
      .then(data => {
        setFilm(data);
        return fetch(`/api/films/${id}/characters`);
      })
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`/api/films/${id}/planets`)
      .then(response => response.json())
      .then(data => setPlanets(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!film || characters.length === 0 || planets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <body>
        <main>
            <h1 id="name">{film.title}</h1>
            <section id="generalInfo">
                <p>Release: {film.release_date}</p>
                <p>Director: {film.director}</p>
                <p>Episode: {film.episode_id}</p>
            </section>
            <section id="planets">
                <h2>Characters</h2>
                <ul>
                    {characters.map(character => <p key={character.id}>
                        <Link class="individuals" to={`/characters/${character.id}`}>{character.name}</Link></p>)}
                </ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul>
                    {planets.map(planet => <p key={planet.id}>
                        <Link class="individuals" to={`/planets/${planet.id}`}>{planet.name}</Link></p>)}
                </ul>
            </section>
        </main>
    </body>
  );
}

export default Film;