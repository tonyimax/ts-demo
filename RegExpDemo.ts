console.log('ts debug');
let regex = new RegExp('ttt','i');  //i修饰符 不区分大小
console.log(regex.test('test/ttt/a'));
console.log(new RegExp(/abc/ig,'i').flags);
//正则u修饰符使用
//处理大于\uFFFF的Unicode字符
console.log(/^\uD83D/u.test('\uD83D\uDC2A'));//false //正确识别
console.log(/^\uD83D/.test('\uD83D\uDC2A'));//true 没加u修改符 错误识别,只识别前一个字符
//.修饰符
console.log(/^.$/.test('𠮷'));//false   没加u修改被认为2个字符  .匹配所有单个字符 特殊字符除外  \n \r 行分隔  段分隔   (U+000A   U+000D U+2028 U+2029)
console.log(/^.$/u.test('𠮷'));//true   加u修饰符  正确识别
//Unicode字符测试
console.log(/\u{61}/.test('a'));
console.log(/\u{61}/u.test('a'));//加u正确识别unicode字符  \u{61}
console.log(/\u{20BB7}/u.test('𠮷'));//加u正确识别unicode字符  \u{20BB7}

console.log('量词识别', /K{5}/.test('KKKKK')); //量词识别
console.log( '量词识别',/K{5}/u.test('KKKKK')); //量词识别

console.log('量词识别', /𠮷{5}/.test('𠮷𠮷𠮷𠮷𠮷')); //量词识别
console.log( '量词识别',/𠮷{5}/u.test('𠮷𠮷𠮷𠮷𠮷')); //量词识别

console.log(/^\S$/.test('𠮷'));//\S 匹配所有非空格字符 /^匹配行首   $/匹配行尾
console.log(/^\S$/u.test('𠮷'));//\S 匹配所有非空格字符

//使用.和s匹配所有字符包含特殊字符
console.log(/aaa.bbb/s.test('aaa\nbbb'));//true 正确匹配到\n回车特殊字符
let tmpReg = new RegExp('OOO.KKK','s');
console.log('识别回车字符:',tmpReg.test('OOO\nKKK'),'dotAll模式:',tmpReg.dotAll,'使用修饰符:',tmpReg.flags);

let getCodePointLength=(text)=>{
    let r = text.match(/[\s\S]/gu); //\S 过滤掉空格  \s 匹配任意的空白符 /g 全局匹配 /u 匹配Unicode字符
    return r ? r.length : 0 ;
}

console.log( '𠮷𠮷𠮷'.length,getCodePointLength('𠮷𠮷𠮷'));

console.log(/[a-z]/i.test('\u212A'));
console.log(/[a-z]/iu.test('\u212A'));//加u修饰符才能匹配Unicode字符

console.log('匹配0-9数字:',/^\d/.test('123456'));

//粘连正则测试(sticky)
let str = 'kkk_kk_k';
let p1 = /k+/g;//全局匹配 多次出现的ok字符 没有位置要求
let p2 = /k+/y;//全局匹配 y修饰符要求必须从开始位置匹配
console.log(p1.exec(str),p2.exec(str));
console.log(p1.exec(str),p2.exec(str));

let str2 = 'kkk_kk_k';
let p3 = /k+/g;//全局匹配 多次出现的ok字符 没有位置要求
let p4 = /k+_/y;//全局匹配 y修饰符要求必须从开始位置匹配
console.log(p3.exec(str2),p4.exec(str2));
console.log(p3.exec(str2),p4.exec(str2));

let _REGEX = /a/g;//全局匹配a字符
_REGEX.lastIndex = 2;//从字符串的第2个字符开始匹配
const m = _REGEX.exec('baba');
console.log('找到匹配位置:',m.index);
console.log(_REGEX.exec('baba'));//null ,因为上次搜索位置是3,这次从位置4开始搜索,位置4没有字符

let _REGEX2 = /a/y;//全局匹配a字符,从开始位置匹配
_REGEX2.lastIndex = 2;//从字符串的第2个字符开始匹配
const m1 = _REGEX2.exec('baba');//null ba非连粘  如果是 'baaa' 连粘 就OK
if(m1){
    console.log('找到匹配位置:',m1.index,m1);
}else{
    console.log('没有找到匹配位置:',m1);
}


let _REGEX3 = /a/y;//全局匹配a字符,从开始位置匹配
_REGEX3.lastIndex = 3;//从字符串的第2个字符开始匹配
const m2 = _REGEX3.exec('baba');//null
if(m2){
    console.log('找到匹配位置:',m2.index);
    console.log(m2);
}

let xa = '@@@abc'.split(/@/y);//会替换@为空字符串到数组中 ,因为y修饰签符指定开头匹配
console.log(xa);//['','','','abc'];

console.log('a#b#c'.split(/#/y));//['a','b','c']

console.log('a@b@c'.split(/@/y));//['a','b','c']

console.log('a@b@@c'.split(/@/y));//['a','b','c'] //y识别有连粘,生成空元素''

console.log('a##b#c'.split(/#/y));//['a','b','c']

console.log(new RegExp(/[0-9]*/,'s').test(''));//加*可以最少是0个数字或者无限数字,不加*至少一个数字
console.log(new RegExp(/[0-9]/,'s').test('1'));//加*可以最少是0个数字或者无限数字,不加*至少一个数字
console.log(new RegExp(/[0-9]{8,16}/,'s').test('12345678'));//{8,16} 最少8个数字,最多16个数字
console.log("======",new RegExp(/[0-9]{8,16}/,'s').test('1234a5678'));//{8,16} 最少8个数字,最多16个数字
console.log(new RegExp(/[0-9]{8,16}/,'s').test('1234567887654321'));//{8,16} 最少8个数字,最多16个数字
console.log(new RegExp(/[a-z]*/,'s').test(''));//加*可以最少是0个小写字母或者无限个字母,不加*至少一个字母
console.log(new RegExp(/[a-z]/,'s').test('a'));//加*可以最少是0个小写字母或者无限个字母,不加*至少一个字母
console.log(new RegExp(/[A-Z]*/,'s').test(''));//加*可以最少是0个小写字母或者无限个字母,不加*至少一个字母
console.log(new RegExp(/[A-Z]/,'s').test('A'));//加*可以最少是0个小写字母或者无限个字母,不加*至少一个字母
console.log(new RegExp(/[a-z]{8,16}/,'s').test('abcdefgh'));//{8,16} 最少8个小写字母,最多16个小写字母
console.log(">>>>>>",new RegExp(/[a-z]{8,16}/,'s').test('abcdef123ghijop'));//{8,16} 最少8个小写字母,最多16个小写字母
console.log(new RegExp(/[A-Z]{8,16}/,'s').test('AABBCCDD'));//{8,16} 最少8个大写字母,最多16个大写字母
console.log(new RegExp(/[A-Z]{8,16}/,'s').test('AABBCCDDAABBCCDDDD'));//{8,16} 最少8个大写字母,最多16个大写字母
console.log('ID REGEX:',new RegExp(/[0-9]{6}-\d{8}-\d{4}/,'s').test('000000-00000000-0000'));
console.log('ID REGEX:',new RegExp(/199528-\d{8}-\d{4}/,'s').test('199528-00000000-0000'));
console.log(new  RegExp(/[\da-zA-Z]/,'y').test('*$%'));//至少包含字母数字
console.log(new  RegExp(/[\da-zA-Z][^*$%#@]/,'y').test('Za'));//至少包含字母数字的一种,不能包含*$%#@这些特殊字符 至少两个字符
console.log('>>>>>>>',new  RegExp(/[0-9][a-z][A-Z]/).test('1qS'));//到少有数字,大小写字符各一个
console.log('特殊字符测试:',new RegExp(/[^@#$%^&*~!<>=?]/).test('$%^')); //不能含有^@#$%^&*~!<>=?这些字符

//正则全局规则
let testreg = 'aaabbbcccdddeeefffgggg';
let rep = testreg.replace(/d/ig,'*');//从任意位置替换
console.log(rep);
console.log(new RegExp(/d/y,'i').exec(testreg));

console.log(testreg.replace(/a/gy,'%'));//从开始位置开始替换

console.log('n1n2n3n4n5n6'.match(/n\d/y));//只匹配第一个 //n1  匹配字母+数字组合 n后面是数字  : nx  x->数字
console.log('n1n2n3n4n5n6'.match(/n\d/gy));//加上g匹配所有 //n1 n2 n3 n4 n5 n6  匹配字母+数字组合 n后面是数字  : nx  x->数字

const _reg_ex_num = /\d(\+)\d/y;
console.log(_reg_ex_num.test('1+2'));
//前后行断言正则测试
//前行断言
console.log(/\d+(?=%)/.exec('他100%认为你是个SX')); //匹配%前面数字 \d 匹配数字 (?=%) 匹配%号前
console.log(/\d+(?!%)/.exec('他认为你有9999个100%的SX')); //匹配不在%前面数字 \d 匹配数字 (?!%) 匹配不在%号前
//后行断言
console.log(/(?<=\@)\d+/.exec('后面有个@888号的测试'));
console.log(/(?<!\@)\d+/.exec('后面有个&&999号的测试'));
//查找指定符号并替换
console.log('hello,$RemoteDev,test a bug,%RemoteDev &RemoteDev @RemoteDev '.replace(/(?<=\$)RemoteDev/g,'*********'));

const number_reg =/^\p{Decimal_Number}+$/u;
console.log('匹配十进制字符:',number_reg.exec('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼'))

console.log('匹配所有数字:',new RegExp(/^\p{Number}+$/u).exec('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ㉛㉜㉝²³¹¼½¾'));

let reg_w = /[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Number}\p{Connector_Punctuation}\p{Join_Control}]/; //相当于 \w

let reg_W = /[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Number}\p{Connector_Punctuation}\p{Join_Control}]/; //相当于 \W

//let reg_arrows=/^\p{Block=Arrows}+$/u;  //mac下报错 ,win未验证
//console.log(reg_arrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩'));

// 匹配 表情行号
let emoji_reg = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;

//日期正则测试
const date_reg = /(\d{4})\/(\d{2})\/(\d{2})/;
console.log(date_reg.exec('2022/07/19'));
const date_reg1 = /(\d{4})-(\d{2})-(\d{2})/;
console.log(date_reg1.exec('2022-07-19'));
const date_reg2 = /(\d{4})年(\d{2})月(\d{2})日/;
console.log(date_reg2.exec('2022年07月19日'));
//为正则添加组名
const date_reg3 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
console.log(date_reg3.exec('2022-07-19'));
let dr = date_reg3.exec('2022-07-19');
console.log(dr.groups.year,dr.groups.month,dr.groups.day);//按匹配组名来取值

let reg_name = /^(?<gname>ok+)?$/;
console.log(reg_name.exec('ok'));

//指定组名匹配的情况下,即使没有匹配成功,组名依然会存在
let reg_name1 = /^(?<gname>ok+)?$/;
let result = reg_name1.exec('');
console.log(result);
console.log('组名gname是否存在:','gname' in result.groups);

//在正则中使用解构
let x = /^(?<first>.*):(?<second>.*)$/u.exec('firstEle:secondEle');
console.log(x);
console.log(x.groups.first,x.groups.second);

