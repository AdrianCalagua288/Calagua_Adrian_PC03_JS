import { useState, useEffect } from 'react';
import axios from 'axios';

function BuscadorProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://cautious-halibut-xrwwx6x76j5r3rxp-3001.app.github.dev/api/productos')
      .then((res) => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch((err) => {
        setError('Error al conectar con el servidor Express');
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Catálogo de Productos</h2>

      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ul>
        {productosFiltrados.map((p) => (
          <li key={p.id}>
            {p.nombre} — {p.categoria} (S/. {p.precio})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuscadorProductos;