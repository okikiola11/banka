import {
    Client,
} from 'pg';
import {
    dotenv,
} from 'dotenv';

dotenv.config();
// or native libpq bindings
// var pg = require('pg').native

const conString = process.env.ELEPHANTSQL; // Can be found in the Details page
const client = new Client(conString);
client.on('connect', () => {
    console.log('connected to postgres');
});
