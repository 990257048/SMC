
// mvvm核心：  发布·订阅 | 脏值检查 | 数据劫持


var data = {
    value: 'origin-value'
}
var arr = [1,2,3,4];
observe(arr);
arr[0] = 'new-value'

// 观察
function observe (data) {
    if(!data || typeof data != 'object'){
        return;
    }
    for(var prop in data){
        defineReactive(data, prop, data[prop])
    }
}

// 数据劫持
function defineReactive (obj, prop, val) {
    var dep = new Dep();
    observe(val);
    Object.defineProperty(obj, prop, {
        configurable: false,   //是否能删掉
        enumerable: true,
        get: function () {
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set: function (newVal) {
            if(val === newVal){
                return;
            }
            console.log(`检查到${prop}属性值发生变化，原值：${val}，新值：${newVal}`);
            val = newVal;
        }
    });
}

//消息订阅器
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(sub => sub.update())
    }
}

//观察者


