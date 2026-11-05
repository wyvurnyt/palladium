// Run with: node server.js  then open http://localhost:5555 (other devices: http://YOUR-LAN-IP:5555)
const http = require('http');
const fs = require('fs');
const rooms = {};

http.createServer((req, res) => {
  const match = req.url.match(/^\/api\/room\/(\w+)/);

  if (!match) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(fs.readFileSync(__dirname + '/index.html'));
  }

  const code = match[1].toUpperCase();
  if (req.method == 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => { rooms[code] = body; res.end(); });
  } else if (rooms[code]) {
    res.end(rooms[code]);
  } else {
    res.writeHead(404).end();
  }
}).listen(5555, '0.0.0.0');