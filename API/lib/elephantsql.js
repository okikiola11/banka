"use strict";

var _pg = require("pg");

var _dotenv = require("dotenv");

_dotenv.dotenv.config(); // or native libpq bindings
// var pg = require('pg').native


var conString = process.env.ELEPHANTSQL; // Can be found in the Details page

var client = new _pg.Client(conString);
client.on('connect', function () {
  console.log('connected to postgres');
});