
// pending(等待，进行中) fulfilled(成功) rejected(失败) resolved(定型)

let create_success = (delay) => new Promise((resolve) => {
    setTimeout(() => {
        resolve('success! ' + delay)
    }, delay);
});

let create_fail = (delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('fail! ' + delay)
    }, delay);
});

let cb_success = r => {
    console.log('成功了', r);
}

let cb_fail = r => {
    console.log('失败了', r);
}

let cb_finally = r => {
    console.log('结束');
}


// 全部定型再出结果(失败优先)
// Promise.all([create_success(1000), create_success(2000), create_success(3000)]).then(cb_success, cb_fail);

// 默认成功
// Promise.all([100, 200]).then(cb_success, cb_fail);

// 竞争
// Promise.race([create_success(1000), create_fail(2000), create_success(3000)]).then(cb_success, cb_fail);

// Promise.race([11, 22, 33]).then(cb_success, cb_fail);

// resolve
// 参数一定是据因
// Promise.resolve(create_success(1000)).then(cb_success, cb_fail);
// Promise.resolve(create_fail(1000)).then(cb_success, cb_fail);
// Promise.resolve('success').then(cb_success, cb_fail);

// Promise.resolve({
//     then: (resolve, reject) => {
//         setTimeout(() => {
//             resolve('success 3000');
//         }, 3000);
//     }
// }).then(cb_success, cb_fail);

// Promise.resolve({
//     then: (resolve, reject) => {
//         setTimeout(() => {
//             reject('fail 3000');
//         }, 3000);
//     }
// }).then(cb_success, cb_fail);


// reject

// Promise.reject(create_fail(1000)).then(cb_success, cb_fail);

// Promise.reject(create_success(1000)).then(cb_success).catch(cb_fail).finally(cb_finally);

// Promise.reject({
//     then: (resolve, reject) => {
//         setTimeout(() => {
//             resolve('success 3000');
//         }, 3000);
//     }
// }).then(cb_success, cb_fail);






// =================================================================================================================
// 模拟实现Promise

let Promise1 = () => {
    // PENDING FULFULLED REJECTED RESOLVED
    // Promise executor resolve reject value reason onFulfilled onRejected
    // all race then catch

}

class MyPromise {
    static PENDING = 'PENDING'
    static FULFILLED = 'FULFILLED'
    static REJECTED = 'REJECTED'
    constructor(executor) {
        this.state = MyPromise.PENDING
        this.value = null
        this.reason = null
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject.call(this, e)
        }
    }
    resolve(value) {
        if (this.state === MyPromise.PENDING) {
            setTimeout(() => {
                this.state = MyPromise.FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach((cb) => cb(this.value))
            })
        }
    }
    reject(reason) {
        if (this.state === MyPromise.PENDING) {
            setTimeout(() => {
                this.state = MyPromise.REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach((cb) => cb(this.reason))
            })
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                    throw reason
                }
        let promise2
        if (this.state === MyPromise.FULFILLED) {
            return (promise2 = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
        if (this.state === MyPromise.REJECTED) {
            return (promise2 = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
        if (this.state === MyPromise.PENDING) {
            return (promise2 = new MyPromise((resolve, reject) => {
                this.onFulfilledCallbacks.push((value) => {
                    try {
                        const x = onFulfilled(value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push((reason) => {
                    try {
                        const x = onRejected(reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
    }
    resolvePromise(promise2, x, resolve, reject) {
        let called
        if (promise2 === x) {
            reject(new TypeError('Chaining cycle detected for promise'))
        }
        if (x instanceof MyPromise) {
            if (x.state === MyPromise.PENDING) {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject)
                }, reject)
            } else {
                x.then(resolve, reject)
            }
        } else if (
            (typeof x === 'object' && x !== null) ||
            typeof x === 'function'
        ) {
            try {
                const then = x.then
                if (typeof then === 'function') {
                    then.call(
                        x,
                        (y) => {
                            if (called) {
                                return
                            }
                            called = true
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r) => {
                            if (called) {
                                return
                            }
                            called = true
                            reject(r)
                        }
                    )
                } else {
                    resolve(x)
                }
            } catch (e) {
                if (called) {
                    return
                }
                called = true
                reject(e)
            }
        } else {
            resolve(x)
        }
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

let create_success1 = (delay) => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success! ' + delay)
    }, delay);
});

let create_fail1 = delay => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('error! ' + delay)
    }, delay);
})

create_success1(1000).then(cb_success, cb_fail);
create_fail1(1000)

setTimeout(() => {
    console.log(1111)
}, 0);
