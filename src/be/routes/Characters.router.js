const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    const data = await response.json();
    const personajes = data.results.map(p => ({
      id: p.id,
      nombre: p.name,
      estatus: p.status,
      especie: p.species,
      tipo: p.type,
      genero: p.gender,
      imagen: p.image
    }));
    res.json({
      page: Number(page),
      totalPages: data.info.pages,
      totalResults: data.info.count,
      results: personajes
    });

  } catch (error) {
    // console.error('Error al obtener los personajes:', error);
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

module.exports = router;
