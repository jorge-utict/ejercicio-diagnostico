import "./App.css";
import { useState, useEffect } from "react";
import Characters from "./components/Characters";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/characters')
    .then((res) => {
      if (!res.ok) throw new Error("Error en la API");
      return res.json();
    })
    .then((data) => {
      setCharacters(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const filtro = characters.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Cargando personajes...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="title">Personajes de Rick y Morty</h1>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="btn-search"
          />
        </header>
      </div>
      <div className="characters">
        <div className="container-characters">
          {filtro.map((p) => (
            <div className="character-container" key={p.id}>
              <div>
                <img src={p.imagen} alt={p.nombre} />
              </div>
              <div>
                <h3>{p.nombre}</h3>
                <h6><span className="text-grey">{p.especie}</span></h6><br/><br/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
