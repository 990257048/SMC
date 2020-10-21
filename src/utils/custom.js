// 自定义工具函数 20200824 add by gch

let debounce = function (fn, delay) {  // 防抖 （输入框自动完成 onresize ...）
    let timer = null;
    return function (...args) {
        let _this = this;
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    }
}

let throttle = function (fn, delay) { // 节流 （防止多次点击按钮）
    let timer = null;
    return function (...args) {
        let _this = this;
        !timer && setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
        }, delay);
    }
}

let deepClone = function (obj) { //比较标准的深克隆（基本类型 对象 数组 正则 时间）（用于reducer）
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;
    if(obj instanceof RegExp){
        return new RegExp(obj);
    }
    if(obj instanceof Date){
        return new Date(obj);
    }
    // ...有别的类型再追加
    let newObj = new obj.constructor();
    for(let key in obj){ // fn obj arr
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

export {debounce, throttle, deepClone}