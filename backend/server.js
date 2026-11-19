const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const productos = [
  { id: 1, nombre: 'Laptop HP', categoria: 'Tecnología', precio: 2800 },
  { id: 2, nombre: 'Mouse Inalámbrico', categoria: 'Accesorios', precio: 85 },
  { id: 3, nombre: 'Monitor LG 24"', categoria: 'Tecnología', precio: 650 },
  { id: 4, nombre: 'Teclado Mecánico', categoria: 'Accesorios', precio: 220 }
];

app.get('/api/productos', (req, res) => {
  const { nombre } = req.query;
  const resultado = nombre
    ? productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
    : productos;

  res.json(resultado);
});

app.listen(3001, () => {
  console.log('API REST ejecutándose en http://localhost:3001');
});