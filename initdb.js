const pg = require('pg');
const client = new pg.Client({
  host
    : process.env.PGHOST || "localhost",
    user
    : process.env.PGUSER || "postgres",
  password
    : process.env.PGPASSWORD || "password",
  database
    : process.env.PGDATABASE || "myapp",    
});
client.connect();
client.query(
  'DROP TABLE IF EXISTS users ;CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(100) not null)')
.then(()=> {
    return client.query("INSERT INTO users(email) VALUES('user1@myapp.com')");
})
.then(()=> {
    return client.end();
})
.catch(e => console.error(e.stack));