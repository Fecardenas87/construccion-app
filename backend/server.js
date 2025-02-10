const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 5000;

// 1ero en esta parte realizo la Conexión a MySQL desde el usuario Root 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'construccion_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(express.json());


//Luego creo las rutas para el GET, POST y DELETE
// Acá creo la ruta para obtener productos
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Acá creo la ruta para agregar un producto
app.post('/api/products', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  db.query(
    'INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)',
    [name, description, price, imageUrl],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, name, description, price, imageUrl });
    }
  );
});

// Acá creo la ruta para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});