// Buffer 对象
const str = '深入浅出Node.js';
const buf = Buffer.from(str);
console.log(buf,buf.length);
console.log(buf[5]);
buf[5] = -257;
console.log(buf[5]);
