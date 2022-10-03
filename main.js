"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLevelParam = exports.randomRangeInt = exports.getSameSelectNum = exports.getRawData = exports.getSameData = void 0;
const LevelData_1 = require("./LevelData");
// LevelData.forEach((v,i)=>{
//     console.log(`
//     关卡编号: ${v["level#number"]},
//     容器数量: ${v["rail_full_num#number"]},
//     空容器数量:${v["rail_empty_num#number"]},
//     重复动物数量:${v["repeat_num#number"]},
//     相连动物数量:${v["same_link_num#number"]},
//     关卡数据: ${v["fixed_level#number"]}`);
// });
function getSameData(num) {
    for (let i = num; i < num + 1; i++) {
        if (i < 5) {
            let s = i % 5 > 3 ? [2, 2] : i;
            //console.log(i,'-->',Math.floor(i/5),s);
            return s;
        }
        else {
            let c = Math.floor(i / 5);
            let a = [];
            for (let j = 0; j < c; j++) {
                a.push(3);
                a.push(2);
            }
            let s = i % 5 > 3 ? [2, 2] : i % 5;
            if (typeof (s) == "object") {
                a.push(2);
                a.push(2);
            }
            else {
                if (s > 1) {
                    a.push(s);
                }
                else {
                    if (s % 5 > 0) {
                        a[a.length - 1] += 1;
                    }
                }
            }
            //console.log(i,'-->',Math.floor(i/5),a);
            return a;
        }
    }
}
exports.getSameData = getSameData;
// for (let i = 2; i < 30; i++) {
//     let d = getSameData(i);
//     console.log(i,'->',d);
// }
/*
for (let i = 2; i < 6; i++) {
    if(i<5){
       let  s=i%5>3 ? [2,2] : i;
       console.log(i,'-->',Math.floor(i/5),s);
    }else{
        let c=Math.floor(i/5);
        let a:number[]=[];
        for (let j = 0; j < c; j++) {
            a.push(3);
            a.push(2);
        }
        let s=i%5>3 ? [2,2] : i%5;
        if(typeof(s)=="object"){
            a.push(2);
            a.push(2);
        }else{
            if(s>1){
                a.push(s);
            }else{
                if(s%5>0){
                    a[a.length-1] += 1;
                }
            }
        }
        console.log(i,'-->',Math.floor(i/5),a);
    }
}
*/
//console.log(getSameData(7));
function getRawData(num) {
    num = num - 1;
    let s = [];
    for (let i = num; i < num + 1; i++) {
        //console.log(GetLevelParam(i+1));
        let [a, b, c, d, e] = GetLevelParam(i + 1);
        //console.log(getSameData(e));
        for (let j = 0; j < b; j++) {
            if (d > 0 && j >= (b - d)) {
                let x = Math.floor(Math.random() * 10 % (b - d) + 1); //使用重复动物
                //console.log(i+1,x,'-->',x,x,x,x);
                s.push([x, x, x, x]);
            }
            else {
                //console.log(i+1,j+1,'-->',j+1,j+1,j+1,j+1);
                s.push([j + 1, j + 1, j + 1, j + 1]);
            }
        }
        for (let k = 0; k < c; k++) {
            //console.log(i+1,0,'-->',0,0,0,0);
            s.push([0, 0, 0, 0]);
        }
    }
    return [GetLevelParam(num + 1), getSameData(GetLevelParam(num + 1)[4]), s];
}
exports.getRawData = getRawData;
// for (let i = 11; i < 200; i++) {
//     getRawData(i);
// }
// getRawData(12).forEach((v,i)=>{
//     console.log(v);
// });
function getSameSelectNum(num) {
    let [p, s, a] = getRawData(num);
    //console.log(p,s,a);
    console.log(p);
    let lp = p.toString().split(',');
    let numArray = [];
    let numArraySpec = [];
    for (let i = 0; i < parseInt(lp[1]); i++) {
        numArray.push(i + 1);
        numArraySpec.push(i + 1);
    }
    //console.log(numArray);
    let newRaw = [];
    let useNum = [];
    s.toString().split(',').forEach((v, i) => {
        let x = randomRangeInt(0, numArray.length);
        let item = numArray[x];
        let numIndex = numArraySpec.indexOf(item);
        useNum.push(item);
        if (parseInt(v) == 2) {
            let rx = randomRangeInt(0, 2);
            if (rx == 0) {
                newRaw.push([item, item, 0, 0]);
            }
            if (rx == 1) {
                newRaw.push([0, item, item, 0]);
            }
            if (rx == 2) {
                newRaw.push([0, 0, item, item]);
            }
            a[numIndex].splice(0, 2);
            //console.log(a);
        }
        if (parseInt(v) == 3) {
            let rx = randomRangeInt(0, 3);
            if (rx % 2 == 0) {
                newRaw.push([item, item, item, 0]);
            }
            else {
                newRaw.push([0, item, item, item]);
            }
            a[numIndex].splice(0, 3);
            //console.log(a);
        }
        numArray.splice(x, 1);
    });
    //console.log(useNum);
    //console.log(newRaw);
    //console.log(a);
    //console.log(a.toString());
    //console.log(a.toString().split(',').filter(x=>parseInt(x) > 0));
    //console.log(a.toString().split(',').filter(x=>parseInt(x) == 0));
    //console.log(newRaw);
    let lessRaw = a.toString().split(',').filter(x => parseInt(x) > 0);
    newRaw.forEach((v, i) => {
        //填充3相连一个空白
        if (s[i] == 3) {
            //防止随机重复
            let trx = randomRangeInt(0, lessRaw.length);
            let tmpItem = parseInt(lessRaw[trx]);
            if (tmpItem == v[1]) {
                trx = randomRangeInt(0, lessRaw.length);
                tmpItem = parseInt(lessRaw[trx]);
                if (tmpItem == v[1]) {
                    trx = randomRangeInt(0, lessRaw.length);
                    tmpItem = parseInt(lessRaw[trx]);
                }
            }
            for (let j = 0; j < 4; j++) {
                if (0 == v[j]) {
                    v[j] = tmpItem;
                }
            }
            lessRaw.splice(trx, 1);
            //console.log(lessRaw);
        }
        //填充2相连两个空白
        if (s[i] == 2) {
            let orginNum = parseInt(v.toString().split(',').filter(x => parseInt(x) > 0)[1]);
            //防止随机重复
            let trx = randomRangeInt(0, lessRaw.length);
            let tmpItem = parseInt(lessRaw[trx]);
            if (tmpItem == orginNum) {
                trx = randomRangeInt(0, lessRaw.length);
                tmpItem = parseInt(lessRaw[trx]);
                if (tmpItem == orginNum) {
                    trx = randomRangeInt(0, lessRaw.length);
                    tmpItem = parseInt(lessRaw[trx]);
                }
            }
            lessRaw.splice(trx, 1);
            let trx1 = randomRangeInt(0, lessRaw.length);
            let tmpItemNew = parseInt(lessRaw[trx1]);
            //防止2相连或者3相连
            if (tmpItem == tmpItemNew || tmpItem == orginNum) {
                trx1 = randomRangeInt(0, lessRaw.length);
                tmpItemNew = parseInt(lessRaw[trx1]);
                if (tmpItem == tmpItemNew || tmpItem == orginNum) {
                    trx1 = randomRangeInt(0, lessRaw.length);
                    tmpItemNew = parseInt(lessRaw[trx1]);
                }
            }
            //console.log(tmpItem,tmpItemNew);
            lessRaw.splice(trx1, 1);
            for (let j = 0; j < 4; j++) {
                if (0 == v[j]) {
                    v[j] = tmpItem;
                    break;
                }
            }
            for (let j = 0; j < 4; j++) {
                if (0 == v[j]) {
                    v[j] = tmpItemNew;
                    break;
                }
            }
        }
    });
    //console.log(newRaw);
    //console.log(lessRaw);
    let newLessRaw = [];
    while (lessRaw.length > 0) {
        let x = randomRangeInt(0, lessRaw.length);
        newLessRaw.push(lessRaw[x]);
        lessRaw.splice(x, 1);
    }
    // //检测2相连
    // newLessRaw.forEach((r,i)=>{
    //     let [a,b,c,d]=[r[0],r[1],r[2],r[3]];
    //     if(a==b||b==c||c==d){
    //         console.log('出现2相连');
    //         if(a==b){
    //             newLessRaw[i][1] = d;
    //             newLessRaw[i][3] = a;
    //         }
    //         if(b==c){
    //             newLessRaw[i][2] = d;
    //             newLessRaw[i][3] = c;
    //         }
    //         if(c==d){
    //             newLessRaw[i][2] = b;
    //             newLessRaw[i][1] = c;
    //         }
    //     }
    //     if(a==b&&a==c||b==c&&b==d){
    //         console.log('出现3相连');
    //     }
    //     //2相连检测后,如果还出现一行有3个相同的数字,重新生成
    //
    //
    // });
    //
    // //2相连检测一次后,还出现2相连,将相连的一个与下列互换
    // newLessRaw.forEach((v,i)=>{
    //     let [a,b,c,d]=[v[0],v[1],v[2],v[3]];
    //     if(a==b||b==c||c==d){
    //         console.log('互换一次后,再出现2相连');
    //         if(a==b){
    //             let x1 = newLessRaw[(i+1)%newLessRaw.length][0];
    //             newLessRaw[i][0] = x1;
    //             newLessRaw[(i+1)%newLessRaw.length][0] = a;
    //         }
    //         if(b==c){
    //             let x1 = newLessRaw[(i+1)%newLessRaw.length][2];
    //             newLessRaw[i][2] = x1;
    //             newLessRaw[(i+1)%newLessRaw.length][2] = c;
    //         }
    //         if(c==d){
    //             let x1 = newLessRaw[(i+1)%newLessRaw.length][3];
    //             newLessRaw[i][3] = x1;
    //             newLessRaw[(i+1)%newLessRaw.length][3] = d;
    //         }
    //     }
    // });
    console.log(newRaw);
    console.log(newLessRaw);
}
exports.getSameSelectNum = getSameSelectNum;
for (let i = 12; i < 201; i++) {
    console.log(`===第${i}关===`);
    getSameSelectNum(i);
}
/*
for (let i = 11; i < 12; i++) {
    console.log(GetLevelParam(i+1));
    let [a,b,c,d,e]=GetLevelParam(i+1);
    for (let j = 0; j < b; j++) {
        if(d>0 && j >= (b-d) ){
            let x = Math.floor( Math.random() * 10 %(b-d) + 1);//使用重复动物
            console.log(i+1,x,'-->',x,x,x,x);
        }else {
            console.log(i+1,j+1,'-->',j+1,j+1,j+1,j+1);
        }
    }
    for (let k = 0; k < c; k++) {
        console.log(i+1,0,'-->',0,0,0,0);
    }
}
*/
function randomRangeInt(start, num) {
    return Math.floor((Math.random() * num));
}
exports.randomRangeInt = randomRangeInt;
function GetLevelParam(level) {
    return [parseInt(LevelData_1.LevelData[level - 1]['level#number']),
        parseInt(LevelData_1.LevelData[level - 1]['rail_full_num#number']),
        parseInt(LevelData_1.LevelData[level - 1]['rail_empty_num#number']),
        parseInt(LevelData_1.LevelData[level - 1]['repeat_num#number']),
        parseInt(LevelData_1.LevelData[level - 1]['same_link_num#number'])];
}
exports.GetLevelParam = GetLevelParam;
//# sourceMappingURL=main.js.map