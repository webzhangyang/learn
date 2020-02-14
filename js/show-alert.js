// ! 需求：多个独立的弹窗，按照顺序一一展示，而不是叠加到一起
class ShowPopUps {
    constructor(timeCell = 0) {
        this.showPops = []; // 展示队列
        this.closePops = []; // 关闭队列
        this.timeCell = timeCell; // 每个弹窗之间的时间间隔
        this.timer = null; // 定时器
    }

    // 增加显示/关闭弹窗的方法到展示队列
    addPop({ open, close, index }) {
        // * index参数可选，表示把弹窗的打开/关闭的方法插入到指定的位置
        if (!open || !close) return console.warn('打开弹窗和关闭弹窗的方法必须同时存在');
        if (!index) index = this.showPops.length;
        if (this.showPops[index]) index++; // * 如果传递进来的下标位置处已经有值了，那就顺位往后挪一位
        this.showPops[index] = open;
        this.closePops[index] = close;
    }

    // 调用展示弹窗的方法
    showPopFnc() {
        // ? 如果人为控制展示弹窗的时间间隔比this.timeCell小,则会在上一个定时器还在等待期间就执行了showPopFunc方法，
        // ? 所以这时候清除定时器是有必要的，时间间隔用的会是操作的时间间隔 
        clearTimeout(this.timer); 
        // 如果此时关闭队列长度比展示队列还要长，那么需要先关闭一次，才能再次展示
        if (this.closePops.length > this.showPops.length) {
            this.closePopFnc();
            this.timer = setTimeout(() => {
                this.showPopFnc(); // 展示下一个弹窗是需要等待一个时间间隔
            }, this.timeCell);
            return
        }
        this.changePopFnc('showPops');
    }

    // 调用关闭弹窗的方法
    closePopFnc(callback) {
        this.changePopFnc('closePops'); // 关闭弹窗是立马关闭

    }

    // 调用打开/关闭弹窗的方法
    changePopFnc(type = 'showPops') {
        if (this[type].length === 0) return;
        let func = this[type].shift(); // * 首先确定可以拿到第一个元素后，就把它移除队列，然后调用
        if (typeof func === 'function') {
            func();
        } else {
            this.changePopFnc(type)
        }
    }

    // 增加展示弹窗的方法后立即展示弹窗
    addPopAndShowPop(popData) {
        this.addPop(popData);
        this.showPopFnc();
    }
}

// 示例，open与close总是成双成对的出现
let time = 300; // or 3000
let test = new ShowPopUps(5000)
for (let i = 0; i < 5; i++) {
    test.addPop({
        open: () => console.log('open:' + i),
        close: () => console.log('close:' + i),
        index: i * 2
    })
}
console.log('showPops:: ', test.showPops)
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        test.showPopFnc()
    }, i * 1000)
}
setTimeout(() => {
    test.closePopFnc()
    test.showPopFnc()
}, 5000)

// todo 请问，当变量time分别为300和3000时，打印的结果有什么不同，为什么？