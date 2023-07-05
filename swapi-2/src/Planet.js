import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Planet() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`/api/planets/${id}`)
      .then(response => response.json())
      .then(data => {
        setPlanet(data);
        return fetch(`/api/planets/${id}/characters`);
      })
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`/api/films`)
      .then(response => response.json())
      .then(allFilms => {
        const promises = allFilms.map(film => fetch(`/api/films/${film.id}/planets`));
        Promise.all(promises)
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(allPlanets => {
            const filmsWithPlanet = allFilms.filter((film, index) => 
              allPlanets[index].some(planet => planet.id === parseInt(id))
            );
            setFilms(filmsWithPlanet);
          });
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!planet || !characters || !films) {
    return <div>Loading...</div>;
  }

  return (
    <body>
        <main>
            <h1 id="name">{planet.name}</h1>
            <section id="generalInfo">
                <p>Climate: {planet.climate}</p>
                <p>Surface Water: {planet.surface_water}</p>
                <p>Diameter: {planet.diameter}</p>
                <p>Rotation Period: {planet.rotation_period}</p>
                <p>Terrain: {planet.terrain}</p>
                <p>Gravity: {planet.gravity}</p>
                <p>Orbital Period: {planet.orbital_period}</p>
                <p>Population: {planet.population}</p>
            </section>
            <section id="planets">
                <h2>Characters</h2>
                <ul>
                    {characters.map(character => <p key={character.id}>
                        <Link class="individuals" to={`/characters/${character.id}`}>{character.name}</Link></p>)}
                </ul>
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

export default Planet;