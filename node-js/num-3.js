// 大文件操作
const fs = require('fs');
const reader = fs.createReadStream('in.txt',{highWaterMark:11});
reader.setEncoding('utf8')
const writer = fs.createWriteStream('out.txt');
let data='';
reader.on('data',(chunk)=>{
    // writer.write(chunk)
    data += chunk
})
reader.on('end',()=>{
    // writer.end()
    console.log('读写完毕！',data)
})
// 可读流提供了管道方法pipe(),封装了data事件和写入操作
// reader.pipe(writer)