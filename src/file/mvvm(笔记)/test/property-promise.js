// Object.defineProperty
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

// 属性描述符: 数据描述符()和存取描述符(getter setter)

//            configurable	enumerable	 value	  writable	  get	  set
// 数据描述符	可以	        可以	    可以	  可以	   不可以	不可以
// 存取描述符	可以	        可以	   不可以	 不可以	    可以	 可以



// var temp;
// var a = {};
// // Object.defineProperty(a, 'a', {
// //     value: 12,	  
// //     writable: true
// // });

// Object.defineProperty(a, 'a', {
//     value: 111,
//     get: () => temp,
//     set: v => { temp = v }
// });

// a.a = 13;
// console.log(a);

// this.$el = this.isElementNode(el) ? el : document.querySelector(el);



// mock promise

// then catch finally all race


let getData = delay => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(delay > 1000){
                res('ok' + delay);
            }
            rej('err' + delay);
        }, delay);
    });
}


let testPromise = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(new Promise((res, rej) => {
            setTimeout(() => {
                rej('ok');
            }, 5000);
        }))
    }, 5000);
});


// testPromise().then((a) => {
//     console.log(a);
// }, (a) => {
//     console.log(a);
// }).finally((a) => {
//     console.log(a);
// });


// Promise状态： 等待中（无结果） 已成功（有结果） 已失败（有结果）

// Promiose.resolve(v)  返回Promise对象,已成功,结果是v
// Promiose.reject(v)  返回Promise对象,已失败,结果是v

// Promise.prototype.then 能改变promise结果, 返回值即为promise结果, 若返回promise对象后能在下一个then索取结果
// Promise.prototype.finally 不能改变promise结果

// resolve(promise) 能改变promise状态，改变后的状态为promise对象的结果的状态

// Promise.all([promise1, promise2, promise3, ...])    并发执行promise,最后一个出结果的promise出结果时Promise.all出结果，结果为所有promise的结果集
// Promise.race([promise1, promise2, promise3, ...])   并发执行promise,第一个出结果的promise出结果时Promise.race出结果，结果为第一个出结果的promise的结果

// 预编译 作用域 作用域链 闭包 原型 原型链 this指向 正则 数据结构 DOM编程 事件 ajax ES6特性（let const 解构 箭头函数 Promise async-await generator）
// css css3 普通文档流 定位流 浮动流 BFC 弹性布局 居中问题 移动端适配方案     
// 标签 语义化 canvas 多媒体元素 多线程 socket 
// typescript type interface class 泛型 less
// react 组件通信 hooks redux（原理） redux-saga（原理） dva(用法)  性能优化(*** 渲染机制 )  antd用法  umi用法 
// vue mvvm实现 vuex 

// Promise.prototype  then catch finally  then((resolve, reject) => {...})
// Promise  all race resolve reject


// Promise.reject(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("成功");
//     }, 1000);
// })).then(r => {
//     console.log(r);
// }, r => {
//     console.log(r);
//     return "改变结果"
// }).then(r => {
//     console.log(r);
// });



Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("失败");
    }, 1000);
})).then(r => {
    console.log(r);
}, r => {
    console.log(r);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                reject("又失败了")
            }));
        }, 1000);
    })
}).then(r => {
    console.log(r);
}, r => {
    console.log(r);
});




























