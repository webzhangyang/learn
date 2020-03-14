"use strict"
var b = 10;
(function b() {
    // b = 20;
    var b = 20;
    console.log(b)
}())
// 自执行函数属于函数表达式，这里是标示为b的函数表达式，被认为是常量，不可更改，严格模式下会报错（Assignment to constant variable）
// 正常模式下，b = 20则会被忽略