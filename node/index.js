const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
};

const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`);

app.get('/', (req, res) => {
  const name = `Usuário${Math.floor(Math.random() * 1000)}`;
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) throw err;

    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) throw err;

      const namesList = results.map(r => `<li>${r.name}</li>`).join('');
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${namesList}</ul>
      `);
    });
  });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
