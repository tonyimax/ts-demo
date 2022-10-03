console.log(...[5,7,9]);
console.log([1,3,5,7,9],...[2,4,6,8,10],1,4,5);

function myPush(arr, ...items){
    console.log(arr,...items);
    arr.push(...items);
    console.log(arr);
}
myPush([6,7,8,9],...[1,2,3,4,5]);

//求最大值
console.log(Math.max.apply(null,[100,90,2000]));//ES5 要调用apply展开数组
console.log(Math.max(...[100,90,2000]));//ES6 ...运算符直接展开
console.log(Math.max(100,90,2000));
//日期构造
console.log('ES5->',new (Date.bind.apply(Date,[null,2022,7,21])));
// @ts-ignore
console.log('ES6->',new Date(...[2022,7,21]));
//数组合并
let a1=[1,2,3];
let a2=[4,5,6];
let a3=[7,8,9];
//es5合并
console.log(a1.concat(a2,a3));
//es6合并
console.log([...a1,...a2,...a3]);
//数组解构
const [x1,...xn]=[1,2,3,4,5,6,7,8,9];
console.log(x1,xn);
// @ts-ignore
const [x2,...x2n]=[];
console.log(x2,x2n);
//字符串按字符转换成数组
// @ts-ignore
console.log([...'RemoteDev']);
// @ts-ignore
console.log([...'RemoteDev'].reverse());
//注:任何实现了Iterator接口的对象都可使用...转换为数组

//类数组,非真正数组
let noarray = {
    '0':'x',
    '1':'y',
    '2':'z',
    length:3
}
console.log(noarray);
console.log('by es5: ',[].slice.call(noarray));//es5方式转换类数组为数组
console.log('ES6 -> ',Array.from(noarray));//通过Array.from转换为数组

//Map
let mymap = new Map([
    [0,'x'],[1,'y'],[2,'z']
]);
// @ts-ignore
console.log([...mymap.keys()]);
// @ts-ignore
console.log([...mymap.values()]);

//生成器
let makeNum=function* (){
    yield 1;
    yield 2;
    yield 3;
};

// @ts-ignore
console.log([...makeNum()]);

console.log(Array.from('RemoteDev'));

console.log(Array.from( new Set([1,2,3,4,5,6])));

console.log(Array.from({length:10},()=>'Item'));//生成10个Item

console.log(Array.of(1,5,7,9));//将一组值转换成数组


//数组元素复制并替换
//第一个参数为要替换的位置,正数为从左到右 0 开始 ,负数为从右到左 -1开始
//第二个参数为要复制的元素开始位置,第三个参数为要复制的元素的结束位置
//函数执行后会返回替换后的新数组
let newArray = [9,8,7,6,5,4,3,2,1].copyWithin(-1,0,1);//复制9到1的位置
console.log(newArray);
let newArray1 = [9,8,7,6,5,4,3,2,1].copyWithin(0,8);//复制1到9的位置
console.log(newArray1);
let newArray2 = [9,8,7,6,5,4,3,2,1].copyWithin(0,-1);//复制1到9的位置
console.log(newArray2);
let newArray3 = [9,8,7,6,5,4,3,2,1].copyWithin(8,0,1);//复制9到1的位置
console.log(newArray3);
let newArray4 = [9,8,7,6,5,4,3,2,1].copyWithin(0,-3);//复制3,2,1到替换9,8,7的位置
console.log(newArray4);
let newArray5 = [9,8,7,6,5,4,3,2,1].copyWithin(0,-3,-1);//复制3,2到替换9,8的位置
console.log(newArray5);
let newArray6 = [9,8,7,6,5,4,3,2,1].copyWithin(3,-2);//复制2,1到替换6,5的位置
console.log(newArray6);
let newArray7 = [9,8,7,6,5,4,3,2,1].copyWithin(-3,1,4);//复制8,7,6到替换3,2,1的位置
console.log(newArray7);
console.log([].copyWithin.call([1,2,3,4,5,6,7,8,9],0,-3,-1));//es5写法7,8替换1,2
console.log([1,2,3,4,5,6,7,8,9].find((x)=>x>5));//找出第一个匹配条件的元素并返回该
[1,2,3,4,5,6,7,8,9].find((x,i,a)=>{
    if(x>3){
        console.log('当前值:',x,'索引:',i,'原始数组:',a);
        return x;
    }
})//找出第一个匹配条件的元素并返回该
console.log([1,2,3,4,5,6,7,8,9,0].findIndex((v,i,a)=>v<1));//找出数组中第一个小于1的元素的索引
console.log([9,8,7,6,5,4,3,2,1,0].fill(0));//用0填充数组中所有元素
console.log([9,8,7,6,5,4,3,2,1,0].fill(0,1,4));//用0按位置填充数组中的元素
console.log([9,8,7,6,5,4,3,2,1,0].fill(8,-4,-1));//用8按位置填充数组中的元素
console.log([9,8,7,6,5,4,3,2,1,0].fill(8,-3));//用8按位置填充数组中的元素
console.log([9,8,7,6,5,4,3,2,1,0].fill(5,0,3));//用8按位置填充数组中的元素
//数组遍历
let tmpArr = [1,2,3,4,5,6,7,8,9,0];
Object.keys(tmpArr).forEach((v,i,a)=>{ console.log(v)});//遍历键
Object.values(tmpArr).forEach((v,i,a)=>{ console.log(v)});//遍历值
Object.entries(tmpArr).forEach((v,i,a)=>{ console.log(v)});//遍历键值对
//查找数组中是否包含某个值
console.log([1,2,3,4,5,6,7,8,9,0].includes(6,3));
console.log([1,2,3,4,5,6,7,8,9,0].includes(2,3));
console.log(['jack','luck','luzi','make'].includes('luck',1));

let tmpMap =  new Map(
    [
        [0,'A'],
        [1,'B'],
        [2,'C'],
        [3,'D']
    ]
);

console.log(tmpMap.has(2));//Map检测键

let tmpSet = new Set(
    [
        'a','b','c','d','e','f','g'
    ]
);
console.log(tmpSet,tmpSet.has('g'));//Set检测值

let emptyArray = new Array(10);//空值元素
console.log(emptyArray,emptyArray.length);
emptyArray.forEach((v,i,a)=>{
    console.log(i,v);
});

//Array不会过滤数组空位
let newTmpArray = Array.from(emptyArray);
newTmpArray.forEach((v,i,a)=>{
    console.log(i,v);
});

//下面的几处情况会过滤数组空位
emptyArray.forEach((v,i)=>{
    console.log(v);
});

emptyArray.filter((x)=>{
    console.log(x);
});

emptyArray.every((x)=>{
    console.log(x);
});

emptyArray.some((x)=>{
    console.log(x);
});

emptyArray.map((x)=>{
    console.log(x);
});

console.log(emptyArray.toString());//toString会打印空位
console.log(emptyArray.join());//join会打印空位
//扩展运算符...会视空位为undefined
console.log(...emptyArray);
//for..of循环中视空位为undefined
for (const ele of emptyArray) {
    console.log('空位在for..of中使用,',ele);
}


console.log( 'keys->',emptyArray.keys()) ;
console.log( 'values->',emptyArray.values()) ;
console.log( 'entries->',emptyArray.entries()) ;
console.log( emptyArray.find((x)=>x>0)) ;
console.log( emptyArray.findIndex((x)=>x>0)) ;
//fill函数也会认空位为正常位
console.log(emptyArray.fill('x'));
console.log([,0,,2].copyWithin(1,3));//copyWithin会复制空位

