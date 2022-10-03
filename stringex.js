console.log('\u0061', "\u{5409}");
console.log('\u{41}', '\u{42}');
console.log('\uD842\uDFB7', '中文');
let s = '吉𠮷A';
// @ts-ignore
console.log(s.length, s.charAt(0), s.charAt(1), s.charCodeAt(0), s.charCodeAt(1), s.codePointAt(0).toString(16).toUpperCase());
console.log(0xFFFF);
// @ts-ignore
console.log('中'.codePointAt(0), 0xFFFF);
// @ts-ignore
console.log('中'.codePointAt(0) > 0xFFFF);
console.log(String.fromCharCode(0x20BB7));
// @ts-ignore
console.log(String.fromCodePoint(0x20BB7));
console.log(s.at(0));
console.log('\u01D1' === '\u004F\u030C', '\u01D1'.length, '\u004F\u030C'.length);
// @ts-ignore
//NFC表示返回合成字符,默认参数, NFD返回分解多个字符
console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize("NFC"), '\u01D1'.length, '\u004F\u030C'.length);
let testStr = "ABCDEFG";
// @ts-ignore
console.log(testStr.startsWith('AB'));
// @ts-ignore
console.log(testStr.endsWith('FG'));
// @ts-ignore
console.log(testStr.includes('CD'));
// @ts-ignore
console.log(testStr.startsWith('AB', 0));
// @ts-ignore
console.log(testStr.endsWith('BC', 3)); //针对前面3个字符找BC
// @ts-ignore
console.log(testStr.includes('CD', 2));
// @ts-ignore
console.log('中国'.repeat(10));
// @ts-ignore
console.log('Hello'.repeat(0)); //清空""
// @ts-ignore
console.log('OK'.repeat(3.8)); //取整,重复3次
//注:repeat不接受负数 ,大于0,小于1的小数参数,默认取0 ,NaN也视为0  字符串 如果 是数字,转换为对应数值,其它非数字视为 0
// @ts-ignore
console.log('xxx'.padStart(16, '0'));
// @ts-ignore
console.log('xxx'.padEnd(16, '0'));
//模板字符串
let china = '中国';
console.log(`你好,${china}`);
function getString() {
    return '这个世界很坏';
}
console.log(`${getString()}`);
let str1 = '1,2,3,4,5,';
let str2 = '6,7,8,9,0';
let str3 = str1.concat(str2);
console.log(str3);
console.log(str3.split(','));
//# sourceMappingURL=stringex.js.map