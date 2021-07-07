// async函数

let 猜点数 = (n) => new Promise((resolve, reject) => {
    let m = Math.floor(Math.random() * 6 + 1);
    setTimeout(() => {
        if (n == '大') {
            if (m > 3) {
                resolve('猜中： ' + m + '点');
            } else {
                reject('未猜中： ' + m + '点');
            }
        } else {
            if (m < 3) {
                resolve('猜中： ' + m + '点');
            } else {
                reject('未猜中： ' + m + '点');
            }
        }
    }, 2000);
});

async function fn() {
    let r1 = await 猜点数('大');
    console.log(r1);
    return r1
}

// async函数会返回promise
fn().then(r => {
    console.log(r);
});