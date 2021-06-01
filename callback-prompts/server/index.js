const http = require('http');
const router = require('./handlers/router.js');

const server = http.createServer(router.parser);

const ip = "127.0.0.1";
const port = 3000;

server.listen(port, ip, (err) => {
  if(err) throw err;
  else console.log(`Listening on local port ${port}...`);
});
