let arr=[1,2,3];
arr.unshift(...[7,8,9]);//添加多个元素到数组开始位置
console.log(arr);
console.log(arr.shift());//删除第一个元素并返回第一个元素
arr.push(20);//向数组结尾添加一个元素
console.log(arr);
console.log(arr.pop());//删除最后一个元素并返回最后一个元素
//遍历元素并返回新数组
let newArr= arr.map((v,i,a)=>{
    v=v*2;
    return v;//返回操作后的元素
})


console.log(newArr);
console.log(arr.sort());
Object.keys(newArr).forEach((v,i)=>{
    console.log(v,newArr[v]);
});

// @ts-ignore
var sortArr = Array.from(newArr);
sortArr.sort((a,b)=>{
    return a[1]-b[1];
});
console.log('======',sortArr);

// @ts-ignore
let onePromise = new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成Promise');
        resolve('要返回的数据可以任何数据例如接口返回数据');
    }, 2000);
});

//处理Promise执行结果
onePromise.then(value => {
    console.log(value);
},error=>{

});


// @ts-ignore
let promise=new Promise((resolve,reject)=>{
    for (let i = 0; i < 1000; i++) {
        console.log(i,'异步任务执行中...');
        if(i===999){
            resolve({'index':i,data:'循环执行完成了'});
        }
    }
    reject();
});

promise.then((data)=>{
    console.log(data);
},(error)=>{

});

//函数返回Promise对象
function  runPromise(){
    // @ts-ignore
    return new Promise((resolve,reject)=>{
        //执行异步
        for (let i = 0; i < 10000; i++) {
            console.log(i);
        }
        resolve('Loop Finish');
    });
}
//Promise回调
runPromise().then((value => {
    console.log('异步执行完成:',value);
}));


// @ts-ignore
let p = new Promise((resolve,reject)=>{
    console.log('Promise Begin');
    resolve('Promise End');
});
p.then((data)=>{
    console.log(data);
});
console.log('hello======');


function loadImageAsync(url){
    // @ts-ignore
    return new Promise((resolve,reject)=>{
        let img = new Image();
        img.onload = ()=>{
            resolve(img);
        }
        img.onerror=()=>{
            reject(new Error('加载图片失败:' + url));
        }
        img.src=url;
    });
}

loadImageAsync('https://t7.baidu.com/it/u=1089850404,71401787&fm=193&f=GIF').then((img)=>{
    console.log(img);
},
    (err)=>{
       console.log(err);
    });



//var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//异步获取JSON
let getJsonAsync = (url)=>{
  // @ts-ignore
    let p=new Promise((resolve,reject)=>{
          let c= new XMLHttpRequest();
          c.open('GET',url);
          c.onreadystatechange = handler;
          c.responseType='json';
          c.setRequestHeader('Accept','application/json');
          c.send();
          //处理请求状态事件
          var handler = ()=>{
                if(this.readyState !== 4){
                    return;
                }
                // @ts-ignore
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    reject(new Error(this.statusText));
                }
          };
    });

    return p;
};

getJsonAsync('https://img-home.csdnimg.cn/data_json/toolbar/toolbar1105.json').then((json)=>{
    console.log(json);
},(err)=>{
    console.log('HTTP请求出错:',err);
});
