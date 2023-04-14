import knexFn from 'knex';
import knexfile from './config/knexfile'

export const knex = knexFn(knexfile[process.env.NODE_ENV || 'development']);
