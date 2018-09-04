'use strict';

const express = require('express');
const pg= require('pg');


const port = process.env.PORT || 3000;

const pgp = new pg.Pool({
  host
    : process.env.PGHOST || "localhost",
    user
    : process.env.PGUSER || "postgres",
  password
    : process.env.PGPASSWORD || "password",
  database
    : process.env.PGDATABASE || "myapp", 
  statement_timeout:5000   
});
;

const app = express();

app.route('/users')
  .get((req,res) => {
    pgp.query('SELECT * FROM users')
    .then(qres => {
      res.json(qres.rows);
    })
    .catch(e=> {
      console.error(e);
      res.status(400);
      res.send(e);
    });
  });

  app.route('/readiness')
  .get((req,res) => {
    console.log("readiness");
    pgp.query('SELECT 1')
    .then(qres => {
      console.log("ok");
      res.json({});
    })
    .catch(e=> {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  app.route('/liveness')
  .get((req,res) => {
      console.log("liveness");
      res.json({});
  });

app.listen(port);

console.log('RESTful API server started on: ' + port);
