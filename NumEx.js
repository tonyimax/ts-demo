//二,八,十六进制声明
let b = 0b11110000;
let o = 0o777;
let x = 0xffff;
console.log(b, o, x);
//进制转换
console.log(Number(0b11111111), Number(0xffffffff), Number(0o77777777));
//数值有限判断,除了数值,其它全部返回false
console.log(Number.isFinite(1.5));
console.log(Number.isFinite(0.4));
console.log(Number.isFinite(NaN));
console.log(Number.isFinite(undefined));
console.log(Number.isFinite(Infinity)); //正无穷大
console.log(Number.isFinite(-Infinity)); //负无穷大
console.log(Number.isFinite('hello'));
console.log(Number.isFinite('98'));
console.log(Number.isFinite(false));
//数值NaN判断
console.log(Number.isNaN(NaN));
console.log(Number.isNaN(80));
console.log(Number.isNaN('97'));
console.log(Number.isNaN(true));
console.log(Number.isNaN(999 / NaN));
console.log(Number.isNaN('false' / 0));
console.log(Number.isNaN('hello' / 8));
console.log(Number.isNaN('OK' / 'NO'));
//数值转换
console.log(Number.parseInt('89.65'));
console.log(Number.parseFloat('35.79@'));
console.log(Number.isInteger(98));
console.log(Number.isInteger(86.0));
console.log(Number.isInteger(98));
console.log(Number.isInteger('8888'));
console.log(Number.isInteger(false));
//最小常量,用于误差计算
console.log('可接受的误差范围:', Number.EPSILON);
//安全整数
console.log('js的最小与最大整数范围:', Math.pow(-2, 53), Math.pow(2, 53));
console.log(Math.pow(2, 53) === (Math.pow(2, 53) + 1)); //true 计算结果不正确,后者比前者大1 ,因为超出2的53次方,计算不正确
console.log(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); //false 非安全整数范围内
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)); //false 非安全整数范围内
//取浮点数整数部分
console.log(Math.trunc(8.9), Math.trunc(-9.78), Math.trunc(-0.59), Math.trunc(0.9999));
console.log(Math.trunc(NaN), Math.trunc('hello'), Math.trunc()); //不传参数或者非数值都返回NaN
//正负值判断
console.log(Math.sign(9), Math.sign(-3), Math.sign(0), Math.sign(-0)); //0返回正负0,其它正数返回1,负数返回-1
//求立方根
console.log(Math.cbrt(27), Math.cbrt(8), Math.cbrt(-27), Math.cbrt(0), Math.cbrt(1), Math.cbrt('hello')); //非数值返回NaN
//求一个整数的二进制形式的32位无符号整数形式的前导0的个数
console.log(Math.clz32(0));
let zero = 0;
let clz32Count = Math.clz32(zero);
console.log('0的二进制是:', `0b${'0'.repeat(32)}`);
//浮点数,只计算整数部分
console.log(Math.clz32(1.111)); //31
//数值外的其它类型全部返回32个前导0
console.log(Math.clz32(true));
console.log(Math.clz32());
console.log(Math.clz32(NaN));
console.log(Math.clz32(undefined));
console.log(Math.clz32(null));
console.log(Math.clz32('ok'));
console.log(Math.clz32([]));
console.log(Math.clz32({}));
//求积
console.log(Math.imul(2, 8), Math.imul(-2, -8), Math.imul(-4, 16));
console.log(0x7fffffff, Math.imul(0x7fffffff, 0x7fffffff)); //Math.imul在计算超出2的53次方的数值时,可正确返回低位
//求数值的浮点表示形式
console.log(Math.fround(3.1415), Math.fround(1.20), Math.fround(1.1));
//求参数平方和的平方根
console.log(Math.hypot(3, 6, 9), Math.sqrt(3 * 3 + 6 * 6 + 9 * 9)); //等同于 Math.sqrt(3*3+6*6+9*9)
console.log(Math.sqrt(9));
console.log('100的对数是:', Math.exp(100));
console.log('100的对数-1是:', Math.expm1(100));
console.log('100的对数是:', Math.log(100));
console.log('100的对数是:', Math.log(1 + 100));
console.log('100的对数-1是:', Math.log1p(100)); //log1p(x) = log(1+x)  x小-1返回NaN
console.log('100的对数-1是:', Math.log10(100)); //返回以10为底数的x的对数  这里x为100 x小0返回NaN
console.log('100的对数-1是:', Math.log2(100)); //返回以2为底数的x的对数  这里x为100 x小0返回NaN
//三角函数
let num = 180;
console.log(Math.sinh(num)); //双曲正弦
console.log(Math.cosh(num)); //双曲余弦
console.log(Math.tanh(num)); //双曲正切
console.log(Math.asinh(num)); //反双曲正弦
console.log(Math.acosh(num)); //反双曲余弦
console.log(Math.atanh(num)); //反双曲正切
//值正负判断
//console.log(Math.signbit(-99)); //未支持
console.log('计算2的6次方', Math.pow(2, 6)); //**为指数运算符
//BigInt数据类型使用,计算超过2的53次方的数据,后缀加上n
const max = BigInt(Number.MAX_SAFE_INTEGER);
const two = 2n;
const result = max + two;
console.log(result);
//# sourceMappingURL=NumEx.js.map