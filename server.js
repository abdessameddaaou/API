const http = require('http');
const app = require('./app');

app.set(3000);
const server = http.createServer(app);

server.listen(3000);
