let p = new Promise((resolve, reject) => {
    let x = 1;
    if (x > 0) {
        resolve({ msg: '异步调用成功', data: { x: 1, y: 2 } });
    }
    else {
        reject({ msg: '异步调用失败', data: {} });
    }
});
//异步调用结果
p.then((data) => {
    console.log('OK');
    console.log(data);
    //console.log(data.msg,data.data);
})
    //异步调用异常捕获
    .catch(err => {
    console.log(err);
});
//异步函数
function promiseFunc(t) {
    console.log(`${t / 1000}秒后调用异步`);
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t, '异步调用完成');
    });
}
//调用异步函数
promiseFunc(1000).then(value => { console.log(value); });
let promiseAction = new Promise((resolve, reject) => {
    console.log('执行了一些异步操作...');
    resolve('异步操作完成了!');
});
promiseAction.then(value => { console.log(value); });
// @ts-ignore
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// let getDataAsync=(url)=>{
//     let p = new Promise((resolve, reject) => {
//         let c =new XMLHttpRequest();
//         c.open('GET',url);
//         c.onreadystatechange = h;
//         c.responseType = 'json';
//         c.setRequestHeader('Accept','application/json');
//         c.send();
//         function h(){
//             if(this.readyState!==4){return;}
//             if (this.status===200){
//                 console.log('请求成功返回:',this.status);
//                 resolve(this.response);
//             }else {
//                 reject(new Error(this.statusText));
//             }
//         }
//     });
//     return p;
// };
// getDataAsync('http://192.168.31.180/data.json')
// .then(data=>{console.log(data);})
// .catch(err=>{console.log(err);});
//通过https加载json数据
let url = 'https://img-home.csdnimg.cn/data_json/toolbar/toolbar1105.json';
let url1 = 'https://mp-api.iqiyi.com/base/api/1.0/get_role';
let GetJsonData = function (url) {
    const https = require('https');
    https.get(url, (response) => {
        let data = '';
        //数据正在接收中...
        response.on('data', (chunk) => {
            data += chunk;
        });
        //数据接收完成
        response.on('end', () => {
            console.log('同步请求数据完成:', JSON.parse(data));
        });
    }).on("error", (error) => {
        console.log("Error: " + error.message);
    });
};
GetJsonData(url);
//异步请求JSON数据实现
let GetJsonDataAsync = (url) => {
    const https = require('https');
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            //数据正在接收中...
            response.on('data', (chunk) => {
                data += chunk;
            });
            //数据接收完成
            response.on('end', () => {
                //console.log(JSON.parse(data));
                resolve(data); //数据接收完成
            });
        }).on("error", (error) => {
            console.log("Error: " + error.message);
            reject(new Error(error.message));
        });
    });
};
//异步调用
GetJsonDataAsync(url).then(value => {
    console.log("======================下面为异步加载数据=================================");
    if (typeof value === "string") {
        console.log('异步加载请求数据完成:', JSON.parse(value));
    }
}).catch(err => { console.log(err); });
//通过request库请求json数据,使用前 sudo npm i -g request安装包
const request = require('request');
request(url, function (error, response, body) {
    console.error('错误:', error);
    console.log('状态码:', response && response.statusCode);
    console.log('数据:', JSON.parse(body));
});
//异步方式
let RequestJsonAsync = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (e, r, d) => {
            if (null != e) {
                reject(new Error(e));
            }
            else {
                resolve(JSON.parse(d));
            }
        });
    });
};
RequestJsonAsync(url).then(value => {
    console.log("==============request异步加载json===============================");
    console.log(value);
}).catch(err => { console.log(err); });
//nodejs needle库使用 ,使用前 npm i needle --save 安装包
const needle = require('needle');
needle.get(url, function (error, response) {
    if (!error && response.statusCode == 200)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.body);
});
//异步模式
needle('get', url, { json: true }).then(resp => {
    if (resp.statusCode == 200) {
        console.log(">>>>>>>>>>>>>>异步模式>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", resp.body);
    }
}).catch(err => { console.log(err); });
//使用axios库使用,axios直接异步  使用前安装 npm i -g axios --save
const axios = require('axios');
axios.get(url)
    .then(res => {
    console.log(res);
})
    .catch(err => {
    console.log(err);
});
//axios支持多请求并发
axios.all([
    axios.get(url),
    axios.get(url1)
]).then(axios.spread((res1, res2) => {
    console.log(res1);
    console.log(res2);
})).catch(err => {
    console.log(err);
});
//supertaget库使用
const superagent = require('superagent');
superagent.get(url)
    .end((err, res) => {
    if (err) {
        return console.log(err);
    }
    console.log("superagent库调用==========>", res.body);
});
//fetch库使用 使用前安装 npm i node-fetch  3x版本只能import导入 --save  支持异步
// @ts-ignore
// import fetch from 'node-fetch'; //不能在模块之外使用
// fetch(url)
//     .then(res => res.json()) // expecting a json response
//     .then(json => {
//         console.log(json);
//     })
//     .catch(err => {
//         console.log(err);
//     });
let p1 = new Promise((resolve, reject) => {
    resolve('p1 resolve');
});
let p2 = new Promise((resolve, reject) => {
    resolve('p2 resolve');
});
//只要p1,p2中的其中一个有状态改变,马上返回pRace
let pRace = Promise.race([p1, p2]);
pRace.then(value => {
    console.log(value);
});
Promise.prototype.done = (resolve, reject) => {
    this.then(resolve, reject).catch(reason => {
        setTimeout(() => {
            throw reason;
        });
    });
};
Promise.prototype.finally = function (callback) {
    let p = this.constructor;
    return this.then(value => p.resolve(callback()).then(() => value), reason => p.resolve(callback()).then(() => { throw reason; }));
};
function getFun() {
    return new Promise((resolve, reject) => {
        try {
            let foo = yield getFun();
            console.log(foo);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function run(generator) {
    let it = generator();
    function go(result) {
        if (result.done)
            return result.value;
        return result.value.then(function (value) {
            return go(it.next(value));
        });
    }
}
//# sourceMappingURL=PromiseEx.js.map