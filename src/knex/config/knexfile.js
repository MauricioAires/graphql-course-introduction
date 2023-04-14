const { resolve } = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
})

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, '..', 'migrations')
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, '..', 'migrations')
    }
  }
}
