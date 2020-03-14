// ! 需求：弹窗里的数据是通过配置的，后台返回的是在该时段内有效的数据，现在需要按照权重、显示次数来判断需要显示的弹窗
// ! 权重1比2要大，次数消耗掉就换下一个弹窗，权重可能一样，可能不一样，这一次的数据里可以出现权重比上一次的全都要大的
let mockData = [
    {
        picUrl: 'h1',
        popCount: 3,
        popWeight: 2,
        showHourBegin: '09:00',
        showHourEnd: '12:00',
        targetUrl: 'h2'
    },
    {
        picUrl: 'h2',
        popCount: 3,
        popWeight: 3,
        showHourBegin: '09:00',
        showHourEnd: '12:00',
        targetUrl: 'h3'
    },
]
let oldData;
function handleData(arr = []) {
    return arr.map(val => {
        const { popWeight = '', showHourBegin = '', showHourEnd = '', picUrl = '', targetUrl = '' } = val
        const str = '' + popWeight + showHourBegin + showHourEnd + picUrl + targetUrl
        return {
            ...val,
            specific: str
        }
    })
}

function setLastPopData(popData, lastPopHasShow, interimSave = {}) {
    if (!oldData) {
        oldData = {
            lastPop: '',
            lastPopWeight: 0,
            lastPopHasShow: 0,
            interimSave: {},
            hasShowAll: false,
            hasShowWeight: new Set()
        }
    }
    oldData.lastPop = popData.specific
    oldData.lastPopWeight = popData.popWeight
    oldData.lastPopHasShow = lastPopHasShow
    oldData.interimSave = interimSave
    oldData.hasShowWeight.add(popData.popWeight)
    
}

function showPop() {
    // 如果全部展示过了，那就直接返回false
    if (oldData && oldData.hasShowAll) {
        return false
    }
    const newArr = handleData(mockData)

    // 如果缓存从未创建过，直接返回第一个数据
    if (!oldData) {
        let popData = newArr[0];
        setLastPopData(popData, 1) // 即将展示这个弹窗，那么已经显示过的次数就加一
        return popData
    }
    const { lastPop, lastPopWeight, lastPopHasShow } = oldData;
    for (let i = 0, len = newArr.length; i < len; i++) {
        let popData = newArr[i]
        // 新的数据里，出现了没出现过的权重，并且比上一次显示的弹窗的权重大的弹窗数据
        if (popData.popWeight < lastPopWeight && !oldData.hasShowWeight.has(popData.popWeight)) {
            setLastPopData(popData, 1, { lastPop, lastPopWeight, lastPopHasShow })
            return popData
        } else if (popData.popWeight >= lastPopWeight) {
            // 权重一致,就检查特定值是否相等，且显示的次数是否用完
            if (popData.specific === oldData.lastPop) {
                if (popData.popCount > oldData.lastPopHasShow) {
                    // 如果限定次数还没用完
                    oldData.lastPopHasShow++ // 即将展示这个弹窗，那么已经显示过的次数就加一
                    return popData
                } else {
                    // 限定的次数用完了
                    let nextShow = newArr[i + 1]
                    if (nextShow) {
                        let count = 1;
                        // 如果刚好是临时保存的对象
                        if (nextShow.specific === oldData.interimSave.lastPop) {
                            if (nextShow.popCount > oldData.interimSave.lastPopHasShow) {
                                count = oldData.interimSave.lastPopHasShow + 1
                            }
                        }
                        setLastPopData(nextShow, count)
                        return nextShow
                    }
                }
            }
        }
    }
    // 整个遍历都完成了，却还是没办法得到要显示的弹窗数据，那就认为已经把所有的弹窗展示过了
    oldData.hasShowAll = true
}

function onShow() {
    let showPopData = showPop()
    if (showPopData) {
        console.log('展示的弹窗数据为: ', showPopData)
    } else {
        console.log('弹窗数据集合里的都展示过了。。。')
    }
}

