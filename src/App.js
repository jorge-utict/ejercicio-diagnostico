import "./App.css";
import { useState, useEffect } from "react";
import Characters from "./components/Characters";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/characters')
      .then(res => res.json())
      .then(data => {
        console.log(data); // 👈 CLAVE
        setCharacters(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">personajes de Rick y Morty</h1>
      </header>
      {characters && characters.map(p => (
        <div key={p.id}>
          <h2>{p.nombre}</h2>
          <p>{p.estatus}</p>
          <p>{p.especie}</p>
          <p>{p.tipo}</p>
          <p>{p.genero}</p>
          <img src={p.imagen} alt={p.nombre} />
        </div>
      ))}
    </div>
  );
}

export default App;
