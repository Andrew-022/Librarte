const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/data/users', async (req, res) => {
  try {
    let existingUsers = [];

    try {
      const data = await fs.promises.readFile('src/data/users.json');
      existingUsers = JSON.parse(data);
    } catch (error) {
      // Continue
    }

    res.status(200).json(existingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/data/users', async (req, res) => {
  try {
    const userData = req.body;

    let existingUsers = [];

    try {
      const data = await fs.promises.readFile('src/data/users.json');
      existingUsers = JSON.parse(data);

    } catch (error) {
      // Continue
    }
    if (existingUsers.length > 0) {
      existingUsers.push(userData);
      await fs.promises.writeFile('src/data/users.json', JSON.stringify(existingUsers));
      res.status(200).send('Data has been successfully appended.');
    } else {
      await fs.promises.writeFile('src/data/users.json', JSON.stringify([userData]));
      res.status(200).send('Data has been successfully written.');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/data/users', async (req, res) => {
  try {
    let existingUsers = [];

    try {
      const data = await fs.promises.readFile('src/data/users.json');
      existingUsers = JSON.parse(data);
    } catch (error) {
      // Continue
    }

    res.status(200).json(existingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/data/author', async (req, res) => {
  try {
    let authorData;

    try {
      const data = await fs.promises.readFile('src/data/author.json'); // Lee el archivo author.json
      authorData = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor al leer el archivo');
    }

    res.status(200).json(authorData); // Envía los datos del autor como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/data/reviews', async (req, res) => {
  try {
    let reviewData;

    try {
      const data = await fs.promises.readFile('src/data/reviews.json'); // Lee el archivo author.json
      reviewData = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor al leer el archivo');
    }

    res.status(200).json(reviewData); // Envía los datos del autor como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


app.get('/data/books', async (req, res) => {
  try {
    let authorData;

    try {
      const data = await fs.promises.readFile('src/data/author.json'); // Lee el archivo author.json
      authorData = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor al leer el archivo');
    }

    res.status(200).json(authorData); // Envía los datos del autor como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});
app.get('/data/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    let booksData;

    try {
      const data = await fs.promises.readFile('src/data/books.json');
      booksData = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor al leer el archivo de libros');
    }

    const book = booksData.books.find(book => book.id === bookId);

    if (!book) {
      return res.status(404).send('Libro no encontrado');
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
