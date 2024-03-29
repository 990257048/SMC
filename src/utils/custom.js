

// 自定义工具函数 20200824 add by gch

let debounce = function (fn, delay) {  // 防抖 （输入框自动完成 onresize ...）
    let timer = null;
    return function (...args) {
        let _this = this;
        if (timer !== null) {   //有任务在等待执行时直接清掉，建立新的任务等待执行
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
        if (!timer) {
            timer = setTimeout(function () {   //有任务在等待执行时直接退出，不做任何处理，没有任务时再建立任务等待执行。
                fn.apply(_this, args);
                timer = null;
            }, delay);
        }
    }
}


let deepClone = function (obj) { //比较标准的深克隆（基本类型 对象 数组 正则 时间 文件）（用于reducer）
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;  // fn --- null {} []
    if (obj instanceof File) {   //文件对象   
        return obj;
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    // ...有别的类型再追加
    let newObj = new obj.constructor();
    for (let key in obj) { // obj arr
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

let findValueByProp = (origin, prop) => {  // 从origin找prop属性值
    if (prop == '') {
        return origin;
    }
    return prop.split('.').reduce((prev, nextProp) => {
        return prev ? prev[nextProp] ? prev[nextProp] : null : null;
    }, origin);
}

let retNewStateByProp = (origin, prop, value) => { // origin的prop属性值设置成value
    // 有，替换  没有，超纲了
    let propArr = prop.split('.');
    let includeProp = []; //记录origin包含的属性
    let noProp = []; //记录origin不包含的属性
    let res = propArr.reduce((prev, nextProp, i) => {
        if (prev == 'err' || !prev) {
            noProp.push(propArr[i - 1]);
            return 'err';
        }
        if (prev.hasOwnProperty(nextProp)) {
            includeProp.push(propArr[i - 1])
            return prev[nextProp];
        } else {
            noProp.push(propArr[i - 1]);
            return 'err';
        }
        // return prev.hasOwnProperty(nextProp) ? prev[nextProp] : 'err';
    }, origin);

    if (res != 'err') {   // 设置值
        propArr.reduce((prev, nextProp, i) => {
            if (i == propArr.length - 1) {
                prev[nextProp] = value;
            }
            return prev[nextProp]
        }, origin);
    } else {
        //prop超纲了
    }
    return origin;
}

// let getBase64 = (file, callback) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => callback(reader.result))
//     reader.readAsDataURL(file);
// }

let getBase64 = (file, name, uid) => {
    return new Promise((res) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            res({
                base64: reader.result,
                name, uid
            });
        });
        reader.readAsDataURL(file);
    });
}

let filterByObj = (obj, fn) => {
    let ret_o = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && fn(obj[prop], prop)) {
            ret_o[prop] = obj[prop];
        }
    }
    // ret_o.constructor = obj.constructor;
    ret_o.__proto__ = obj.__proto__;
    return ret_o;
}

let mapByObj = (obj, fn) => {
    let ret_o = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ret_o[prop] = fn(obj[prop], prop);
        }
    }
    // ret_o.constructor = obj.constructor;
    ret_o.__proto__ = obj.__proto__;
    return ret_o;
}

// 操作Key(用於前後端數據交互)
let handlePlaneObjectProp1 = (origin, match) => {   // 以match: {old: 'new'}為準
    let target = {};
    let originKeys = Object.keys(origin);
    Object.keys(match).forEach(oldKey => {
        if (originKeys.includes(oldKey)) {
            target[match[oldKey]] = origin[oldKey];
        } else {
            console.error('match中指定的oldKey在源數據origin中不存在！');
            target[match[oldKey]] = "";
        }
    });
    return target;
}

let handlePlaneObjectProp2 = (origin, match) => {   // 以origin為準  match: {old: 'new'}
    let target = {};
    let matchKeys = Object.keys(match);
    Object.keys(origin).forEach(oldKey => {
        if (matchKeys.includes(oldKey)) {
            target[match[oldKey]] = origin[oldKey];
        } else {
            target[oldKey] = origin[oldKey];
        }
    });
    return target;
}

let handlePlaneObjectProp3 = (origin, match) => {   // 以match: {new: 'old'}為準
    let target = {};
    let originKeys = Object.keys(origin);
    Object.keys(match).forEach(oldKey => {
        if (originKeys.includes(oldKey)) {
            target[match[oldKey]] = origin[oldKey];
        } else {
            console.error('match中指定的oldKey在源數據origin中不存在！');
            target[match[oldKey]] = "";
        }
    });
    return target;
}













// let xmlStr1 = "<div class='div'><p>hello</p></div>"
// let reg1 = /<([A-z]*?) [\w\W]*?>([\w\W]*)<\/\1>/;  // 拿到标签内容

// let xmltoJSON = (xmlStr) => {

// }




export { debounce, throttle, deepClone, findValueByProp, retNewStateByProp, getBase64, filterByObj, mapByObj }