const http   = require('http');
const app    = require('./app');

const port = 3000;

const server = http.createServer(app);
const nei = http.createServer()
server.listen(port , () => {
    console.log('listenining at port : ' , port);
});
