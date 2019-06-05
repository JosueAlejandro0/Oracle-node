const express = require('express');
const router = require('./router.js');
const http = require('http');
const morgan = require('morgan');
var app = express();

function TestServer(){
  return new Promise((resolve, reject) => {
    httpServer = http.createServer(app);
    // Combines logging info from request and response
    app.use(morgan('combined'));
    // Parse incoming JSON requests and revive JSON.
    app.use(express.json({
      reviver: reviveJson
    }));
    // Mount the router at /api so all its routes start with /api
    app.use('/', router);
    httpServer.listen(5000)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${5000}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
    });
  });
}

module.exports.TestServer = TestServer;

function close() {
    return new Promise((resolve, reject) => {
      app.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }     
module.exports.close = close;


const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}