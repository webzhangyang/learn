// 查看进程的内存占用
console.log('查看进程的内存占用:', process.memoryUsage())
// 查看电脑的内存s
const os = require('os')
console.log('查看当前电脑的内存总量:', os.totalmem())
console.log('查看当前电脑的内存使用总量:', os.freemem())

const showMem = () => {
    const mem = process.memoryUsage()
    const format = bytes => (bytes / 1024 / 1024).toFixed(2) + 'MB'
    console.log(`Process: heapTotal ${format(mem.heapTotal)} heapUsed ${format(mem.heapUsed)} rss ${format(mem.rss)}`)
    console.log(new Array(60).fill('-').join(''))
}

// 使用数组保存数据
const useMem1 = () => {
    const size = 20 * 1024 * 1024,
        arr = new Array(size)
    for(let i = 0; i < arr.length; i++){
        arr[i] = 0
    }
    return arr
}

// 使用buffer保存数据
// Buffer对象不同于其他对象，它不经过V8的内存分配机制，所以也不会有堆内存的大小限制
// 这意味着利用堆外内存可以突破内存限制的问题
const useMem2 = () => {
    const size = 20 * 1024 * 1024,
        buffer = Buffer.alloc(size)
    for(let i = 0; i < buffer.length; i++){
        buffer[i] = 0
    }
    return buffer
}

const total1 = []
for(let j = 0; j < 15; j++){
    showMem()
    total1.push(useMem2())
}
showMem()

console.log('查看进程的内存占用:', process.memoryUsage())
console.log('查看当前电脑的内存总量:', os.totalmem())
console.log('查看当前电脑的内存使用总量:', os.freemem())