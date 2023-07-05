import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './CharacterList';
import Character from './Character';
import Planet from './Planet';
import Film from './Film';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/planets/:id" element={<Planet />} />
        <Route path="/films/:id" element={<Film />} />
        <Route path="/" element={<CharacterList />} />
      </Routes>
    </Router>
  );
}

export default App;
