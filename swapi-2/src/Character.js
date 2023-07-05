import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './site.css';

function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [homeworldId, setHomeworldId] = useState(null);
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`/api/characters/${id}`)
        .then(response => response.json())
        .then(data => {
        setCharacter(data);
        setHomeworldId(data.homeworld);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`/api/characters/${id}`)
        .then(response => response.json())
        .then(data => {
            setCharacter(data);
            return fetch(`/api/planets/${data.homeworld}`);
        })
        .then(response => response.json())
        .then(data => setPlanet(data))
        .catch(error => console.error('Error:', error));
}, [id, homeworldId]);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/characters/${id}/films`)
      .then(response => response.json())
      .then(data => setFilms(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!character || !planet || !films) {
    return <div>Loading...</div>;
  }

  return (
    <body>
        <main>
            <h1 id="name">{character.name}</h1>
            <section id="generalInfo">
                <p>Height: {character.height} cm</p>
                <p>Mass: {character.mass} kg</p>
                <p>Born: {character.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>
                    <Link class="individuals" to={`/planets/${planet.id}`}>{planet.name}</Link>
                </p>
            </section>
            <section id="films">
                <h2>Films</h2>
                <ul>{films.map(film => <p key={film.id}>
                    <Link class="individuals" to={`/films/${film.id}`}>{film.title}</Link></p>)}
                </ul>
            </section>
        </main>
    </body>
  );
}

export default Character;