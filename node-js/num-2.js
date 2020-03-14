// 内存泄漏排查
const http = require('http');
const heapdump = require('heapdump');
const leakArray = [];
const leak = () => { leakArray.push(`leak${Math.random()}`) };
http.createServer((req, res) => {
    leak();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337)
console.log(process.pid);
console.log('Sever running at http://127.0.0.1:1337');