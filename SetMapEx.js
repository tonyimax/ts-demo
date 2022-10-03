//Set,成员唯一,没有重复
let myset = new Set();
[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(x => myset.add(x));
console.log(myset, myset.keys(), myset.values(), myset.entries(), myset.size);
let s = new Set([1, 2, 3, 4, 4, 5, 5, 6, 6, 6]); //重复的数据只取一个
console.log(s);
let s1 = new Set();
s1.add('a');
s1.add('b');
s1.add(1);
s1.add(2);
s1.add(3);
console.log(s1);
console.log(s1.has('b'), s1.has(2));
s1.delete(2);
s1.delete('b');
console.log(s1, s1.has('b'), s1.has('2'));
s1.clear();
console.log(s1);
//Set转换数组
let s2 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
console.log('Set:', s2);
let arr = Array.from(s2);
console.log('Array:', arr);
//数组去重实现
let s3 = [1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 9, 9, 9, 0, 0, 0];
console.log(s3);
let tmpSet = new Set(s3);
console.log(tmpSet);
s3 = Array.from(tmpSet);
console.log(s3);
//...运算符与Set简化去重
let newSet = new Set([1, 2, 3, 3, 4, 4, 4, 5, 5]);
// @ts-ignore
console.log([...newSet]);
let s4 = new Set([1, 2, 3]);
// @ts-ignore
console.log([...s4].map(x => x * 3));
// @ts-ignore
console.log([...s4].map(x => x * 3).filter(x => x > 3));
let s5 = new Set([1, 2, 3]);
let s6 = new Set([4, 5, 6]);
// @ts-ignore
console.log(new Set([...s5, ...s6]));
let s7 = new Set([1, 2, 3]);
let s8 = new Set([1, 3, 6]);
// @ts-ignore
console.log(new Set([...s7].filter(x => s8.has(x)))); //查找两个Set重复出现的元素
// @ts-ignore
console.log(new Set([...s7].filter(x => !s8.has(x)))); //查找两个Set没重复出现的元素
// @ts-ignore
console.log(new Set([...s8].filter(x => !s7.has(x)))); //查找两个Set没重复出现的元素
//WeakSet使用,操作对象
let ws = new WeakSet(); //WeakSet成员只能是对象
let o1 = { x: 'hello' };
let o2 = [[1, 2, 3], [4, 5, 6]];
ws.add(o1);
console.log(ws);
ws.add(o2);
console.log(ws);
console.log(ws.has(o1), ws.has(o2));
ws.delete(o2);
console.log(ws.has(o1), ws.has(o2));
console.log(ws.size, ws.forEach); //WeakSet没有这两个属性,不支持遍历
//Map使用对象来作为键
let m1 = new Map();
let oKey = { x: 'hello' };
m1.set(oKey, 'Object Value');
console.log(m1);
console.log(m1.get(oKey));
console.log(m1.has(oKey));
m1.delete(oKey);
console.log(m1.has(oKey));
let m2 = new Map();
m2.set(1, 'hello');
m2.set(1, 'world');
console.log(m2.get(1)); //键值相同最后一次值覆盖前一次值
console.log(m2.get(2)); //键值不存在,返回undefined
let m3 = new Map();
m3.set(['a'], 555); //这里的['a']与下面的['a']为两个不同地址
console.log(m3);
console.log(m3.get(['a'])); //undefined
let m4 = new Map();
let key = ['a'];
m3.set(key, 555);
console.log(m3.get(key)); //这样可取到值,因为key是同一地址
//下面虽然['a']看起来是相同,实际是不同,分别在不同的地址上
let k1 = ['a'];
let k2 = ['a'];
let m5 = new Map();
m5.set(k1, 123);
m5.set(k2, 456);
console.log(m5);
console.log(m5.get(k1), m5.get(k2), m5.size);
m5.delete(k2);
console.log(m5);
m5.clear();
console.log(m5);
//Map与对象之间转换,前提 Map的所有键都是字符串
let strMap = new Map();
strMap.set('name', 'hello');
strMap.set('work', 'IT');
console.log(strMap);
let obj = Object.create(null);
// @ts-ignore
for (let [i, v] of strMap) {
    console.log(i, v);
    obj[i] = v;
}
console.log(obj);
let newObj = obj;
let newMap = new Map();
for (let i of Object.keys(newObj)) {
    newMap.set(i, newObj[i]);
}
console.log('NewMap:', newMap);
//Map与JSON之间转换 ,前提是所有Map键都是字符串
let jsonstr = JSON.stringify(obj);
console.log(jsonstr);
let jsonObj = JSON.parse(jsonstr);
for (let i of Object.keys(jsonObj)) {
    newMap.set(i, jsonObj[i]);
}
console.log('Json to Map :', newMap);
//WeakMap的键名只能是对象,WeakMap不支持遍历
let wm = new WeakMap();
let objKey = { x: 'kkk' };
wm.set(objKey, 'ok');
console.log(wm.get(objKey));
console.log(wm.has(objKey));
wm.delete(objKey);
console.log(wm.get(objKey));
//# sourceMappingURL=SetMapEx.js.map