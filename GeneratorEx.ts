function* GenHelloWorld(){
    yield 'hello';
    yield 'world';
    return 'done';
}
let g = GenHelloWorld();
console.log(g.next());//{ value: 'hello', done: false }   执行到 yield 'hello';暂停
console.log(g.next());//{ value: 'world', done: false }   执行到 yield 'world';暂停
console.log(g.next());//{ value: 'done', done: true }     执行到 return 'done'; done为真代表遍历结束
console.log(g.next());//{ value: 'undefined', done: true } 因为遍历已结束,所以value值为undefined
//注: yield 暂停 一个状态  next遍历下一个状态  yield关键字只能在generator函数中使用

function* genx(){
    yield 123 * 456;//调用next方法后才会计算这个值
}
let gx = genx();
console.log(gx.next());

function* gfunc(){
    console.log('Generator函数');
}

// let f = gfunc();
// setTimeout(()=>{
//     f.next()
// },2000);

console.log('即使在Generator函数中,在其内部的forEach函数中也不能使用yield关键字');

let nums = [1,[2,3],[4,5,6],[7,8,9],0];
let flatNum = function* (arr){
    //forEach函数为普通函数,不能使用yield关键字
    // arr.forEach(x=>{
    //     if (typeof x !== 'number'){
    //         flatNum(x);
    //     }else{
    //         yield x; //报Unexpected identifier错误
    //     }
    // });

    //改用 for ... i 遍历
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let num = arr[i];
        if (typeof num !== 'number'){
            yield* flatNum(num);
        }else{
            yield num;
        }
    }
};

//Generator实现了Iterator接口,支持for...of遍历
// @ts-ignore
for (let n of flatNum(nums)) {
    console.log(n);
}

//在Generator函数的表达式中使用yield
function* yieldExp(){
    console.log('Exp===>' + (yield ));//要用()将yield包含起来
    console.log('Exp===>' + (yield 890));
    let k = yield ;
}
let ye=yieldExp();
console.log( ye.next());
console.log( ye.next());
console.log( ye.next());
console.log( ye.next());

//给对象部署Iterator接口,把生成器函数赋值给对象,使用对象可遍历
let objIterator={};
objIterator[Symbol.iterator] = function* (){
    for (let i = 0; i < 10; i++) {
        yield i+1;
    }
}

// @ts-ignore
console.log([...objIterator]);//...扩展运算符展开并遍历元素
// @ts-ignore
for (let o of objIterator) {
    console.log('out by Iterator:',o);
}

//生成器函数返回一个遍历器对象,该对象也具有Symbol.iterator属性
function* gen(){
    yield 1;
}
let objGen=gen();
console.log(objGen===objGen[Symbol.iterator]());

//无限循环生成器
function* unLimitGen(){
    for (let i = 0; true; i++) {
        let flag = yield i;
        if (flag) {i=-1;}//flag为next函数的参数,用于注入一个新的开始值
    }
}
let lg = unLimitGen();
console.log('无限循环生成:',lg.next());
console.log('无限循环生成:',lg.next());
console.log('无限循环生成:',lg.next());
console.log('无限循环生成:',lg.next());
console.log('无限循环生成:',lg.next());
console.log('无限循环生成:',lg.next(true));


function wrapper(gfunc){
    return function (...args){
        let genObj = gfunc(...args);
        genObj.next();
        return genObj;
    }
}
let wrap = wrapper(function* (){
    console.log(`首次输入: ${yield }`);
    return 'Done';
});
wrap().next('hello');

function* dataConsumer(){
    console.log('开始...');
    console.log(`1. ${yield }`);//外部注入
    console.log(`2. ${yield }`);//外部注入
    return '结束';
}
let outGen = dataConsumer();
outGen.next();
outGen.next('x');
outGen.next('y');
outGen.next();

function* getNumbers(){
    for (let i = 0; i < 6; i++) {
        yield i+1;
    }
    return 6;
}

// @ts-ignore
for (let number of getNumbers()) {
    console.log(number);
}

//斐波那契数列
function* gennext(){
    let [p,r]=[0,1];
    for (;;){
        [p,r]=[r,p+r];
        yield r;
    }
}

// @ts-ignore
for (let x of gennext()) {
    if (x>100)break;
    console.log(x);
}

//遍历原生对象
function* objEntries(obj){
    let p = Reflect.ownKeys(obj);
    for (let k of p) {
        yield [k,obj[k]];
    }
}
// @ts-ignore
let test = {x:1,y:2,z:3,hello(){}};
// @ts-ignore
for (let [k, v] of objEntries(test)) {
    console.log(`${k}:${v}`);
}

function* objEnt(){
    let p = Object.keys(this);
    for (let k of p) {
        yield [k,this[k]];
    }
}
let tt1 = {name:'RemoteDev',age:38,job:'it'};
tt1[Symbol.iterator] = objEnt;//附加Generator函数到Symbol.iterator属性,使对象支持遍历
// @ts-ignore
for (let [k,v] of tt1) {
    console.log(`${k}:${v}`);
}


function * makeNums(){
    for (let i = 0; i < 10; i++) {
        yield i+1;
    }
}
// @ts-ignore
console.log([...makeNums()]);//遍历生器

let tmpArray = Array.from(makeNums());
console.log(tmpArray);

// @ts-ignore
let [x,y,...z]= makeNums();
console.log(x,y,z);
// @ts-ignore
for (let x1 of makeNums()) {
    console.log(x1);
}

//生成器函数异步捕获
let g1 = function* (){
    try {
        yield ;
    }catch (e){
        console.log('catch in generator func: ',e);
    }
};
let test_g = g1();
test_g.next();
try {
    test_g.throw('x');
    test_g.throw('y');
}catch (e){
    console.log('catch out in try ... catch : ',e);
}

let g3 = function* (){
    while (true){
        yield ;
        console.log('generator func not catch');
    }
};
let tg3= g3();
tg3.next();
try {
    tg3.throw('x');
    tg3.throw('y');
}catch (e){
    console.log('catch out in try ... catch : ',e);
}


//Generator函数内部部署了try...catch的,throw抛出的异常不会影响下次遍历
let g4 = function*(){
    //部署try ... catch
    try {
        yield console.log('x');
    }catch (e){
        console.log(e);
    }
    yield console.log('y');
    yield console.log('z');
}
let tg4=g4();
tg4.next();
// @ts-ignore
tg4.throw();//不会影响下次遍历
tg4.next();

//Generator函数中一旦抛出异常会马上结束函数运行
function* testThrow(){
    let x=yield 3;
    let y=x.toUpperCase();//传入的是数字会报错
    yield y;
}
let tt = testThrow();
tt.next();
try {
    tt.next('abc');
}catch (e){
    console.log(e);// x.toUpperCase is not a function
}
tt.next();//因为上面抛出异常,Generator已结束

//在Generator函数中调用Generator函数
function* GenA(){
    yield 1;
    yield 2;
}

function* GenB(){
    yield 3;
    yield* GenA();
    yield 5;
}

for (let n  of GenB()) {
    console.log(n);
}

let xStr=(function* (){
    yield 'hello';
    yield* 'hello'; //字符串会被遍历
})();
console.log(xStr.next(),xStr.next());

let ObjHasGen={
    x:1,
    *hello(){//对象中的Generator函数
        yield 1;
        yield 2;
    }
};

function Action() {}
async function AsyncFunc1(){
    let ac1 = await Action();//异步操作1
    let ac2 = await Action();//异步操作2
}
let AsyncFunc2 = async function (){

}
let AsyncFunc3 = async ()=>{

}

async function TimeOut(ms){
    await new Promise(resolve => {
        setTimeout(resolve,ms);
    });
}
async function asyncPrint(ms,val){
    await TimeOut(ms);
    console.log(val);
}
asyncPrint(3000,'3秒后输出').then(value => {});


