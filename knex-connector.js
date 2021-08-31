// knex-connector.js
const knex = require('knex')

// knex connector
const connectedKnex = knex({
    client: 'pg',
    version: '12',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'pg_flights'
    }
})

module.exports = connectedKnex;