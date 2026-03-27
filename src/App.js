import "./App.css";
import { useState, useEffect } from "react";
import Characters from "./components/Characters";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (page > totalPages) return;
    setLoading(true);
    setError(null);
    fetch(`http://localhost:4000/api/v1/characters?page=${page}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("No hay más páginas disponibles");
        }
        throw new Error("Error en la API");
      }
      return res.json();
    })
    .then((data) => {
      setCharacters(data.results);
      setTotalPages(data.totalPages);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [page]);

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
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          disabled={loading || page >= totalPages}
        >
          Siguiente
        </button>
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
