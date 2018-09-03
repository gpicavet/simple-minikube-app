'use strict';

const express = require('express');
const pg= require('pg');


const port = process.env.PORT || 3000;

const pgc = new pg.Client({
  host
    : process.env.PGHOST || "localhost",
    user
    : process.env.PGUSER || "postgres",
  password
    : process.env.PGPASSWORD || "password",
  database
    : process.env.PGDATABASE || "myapp",    
});
pgc.connect();

const app = express();

app.route('/users')
  .get((req,res) => {
    pgc.query('SELECT * FROM users')
    .then(qres => {
      res.json(qres.rows);
    })
    .catch(e=> {
      console.error(e);
      res.status(400);
      res.send(e);
    });
  });

  app.route('/healthz')
  .get((req,res) => {
    pgc.query('SELECT 1')
    .then(qres => {
      res.json({});
    })
    .catch(e=> {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

app.listen(port);

console.log('RESTful API server started on: ' + port);
