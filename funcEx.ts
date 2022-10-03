console.log('function ext');
function myfunc(x,y='nice'){
    console.log(x,y);
}
myfunc();
myfunc('ok');
myfunc('ok','yes');

let myfunc2=(x,y=10)=>{
    console.log(x,y);
}

myfunc2();
myfunc2(90);
myfunc2(100,200);

let myfunc3=({x,y=9})=>{
    console.log(x,y);
}

myfunc3({x:0});
myfunc3({x:90});
myfunc3({x:100,y:299});

function getData(url,{b='',m='GET',h={}}){
    console.log(url,m);
}
getData('www.baidu.com',{m:'POST'})

let myfunc4=({x=0,y=0}={})=>{
    console.log(x,y);
};

myfunc4({y:100});
//函数length属性使用,计算没有默认值的参数个数
console.log((function x(){}).length);
console.log((function x(a){}).length);
console.log((function x(a,b){}).length);
console.log((function x(a,b,c=0){}).length);
console.log((function x(a,b=0,c){}).length);//1  有默认值参数后的所有参数都不参与统计

//函数作用域
function x(y=0,k=y){
    console.log(k);
}

x(9);

let q=9999;
// @ts-ignore
function y(z=q){//引用外部变量q
    let q = 8888;//内部变量
    console.log(z)//9999
}
y();

// @ts-ignore
function z(q=q){ //q处理于暂时性死区
    console.log(q);
}

//z();调用会报错,q未初始化

function callNotParam(){
    throw new Error('必须要传入参数');
}
//必须传参数,没有就抛出异常
function mustbeParam(param=callNotParam()){
    console.log(param);
}

mustbeParam('传入的参数 ');

//rest参数...使用,...参数只能是最后一个参数
function a(...p){
    console.log(p);
    p.forEach((v,i)=>{
        console.log(v);
    });
}

a(1,2,3,4,5,6,7,8,9);

//没有使用默认值参数可以在函数内部显式启动严格模式
function b(a){
    'use strict'; //使用严格模式
    console.log(a,'hello');
}
b(1);

function c(a=99){ //使用了默认值参数 ,不能显式启用严格模式
    //'use strict'; //使用严格模式   //报 Illegal 'use strict' directive in function with non-simple parameter list
    console.log(a,'hello');
}
c();


console.log('函数名:',c.name);
console.log(new Function().name);
console.log(b.bind(1).name);//bind函数名会加上 bound

//箭头函数
//1.没有参数箭头函数
let f1=()=>999; //没有参数直接返回999
let f2=x=>x*999;//只有一个参数 返回 x * 999
//两个或者以上参数
let f3=(a,b)=>{
    console.log(a,b);
}
//调用
console.log(f1());
console.log(f2(10));
f3(5,6);

let arr=[1,2,3].map(x=> {return x * 99});
console.log(arr);

console.log( [1,2,3,4,5,6].sort((a,b)=> a-b));
//注:箭头函数中的this是定义箭头函数时所在的对象,不是当前使用的所在对象
//箭头函数不能做构造函数,也不可使用new来创建
//箭头函数不可使用arguments对象
//不可使用yield,箭头函数不能用作Generator函数

let handler = {
    id:123,
    init:function (){
        console.log(this);
    },
    myfuncx:function (){
        console.log(this);
    }
};
handler.init();
handler.myfuncx();

let insert= (v)=>({
    into:(arr)=>(
        {
            after:(vv)=>{
                arr.splice(arr.indexOf(vv)+1,0,v);
            }
        }
    )
});

//数组中间插入值
let testarr=[4,6];
insert(5).into(testarr).after(4);
console.log(testarr);


let xobj ={
    id:0,
    hello:(x)=>{return x*9;}
}

let mytestfunc = ()=>{
    console.log('test func');
}

//ES7
//let bindfunc = ::xobj.hello;
//let log = ::console.log;



