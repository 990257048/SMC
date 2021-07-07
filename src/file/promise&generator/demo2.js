// generator生成器

// function* createIterator(a) {
//     console.log(a);
//     let v1 = yield a;
//     console.log(v1);
//     let v2 = yield v1 * v1;
//     console.log(v2);
//     return 100;
// }
// let gen = createIterator(10);




// run1 后面的内容本身作为 yield表达式的返回值
// let gen_run = (createIterator) => {
//     let gen = createIterator();
//     // gen.next(...)
//     // gen.next(...)
//     // gen.next(...)
//     // ...
//     let initO = gen.next();
//     let run  = function ({done, value}){
//         if(!done){
//             run(gen.next(value))
//         }
//     }
// }


let createIterator = (array) => {
    let index = 0;
    return {
        next: function () {
            let done = index < array.length ? false : true;
            return {
                value: !done ? array[index++] : undefined,
                done
            }
        }
    }
}

// let gen = createIterator([1, 2, 3, 4]);

function run(taskDef) {
    // 先将生成器存起来  不存起来就会死循环喽
    const task = taskDef();
    let result = task.next();  // 拿到第一个结果
    // 使用递归，保持对next的持续调用
    function step() {
        if (
            !result.done &&
            Object.prototype.toString.call(result.value) === '[object Function]'
        ) {
            result.value((err, data) => {
                if (err) {
                    result = task.throw(err);
                    // 抛出异常就立即停止后续所有代码
                    return;
                }
                result = task.next(data);
                step()
            })
        }
    }
    step()
}

run(function* () {
    let data = yield fetchData();
    console.log(data); // "我是一个回调数据"
})




