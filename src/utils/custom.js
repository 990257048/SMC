// 自定义工具函数 20200824 add by gch

let debounce = function (fn, delay) {  // 防抖
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

export {debounce} 