//尾调用 Tail Call
//函数的最后一步操作调用了其它函数,不一定是最后一句;
function a() {
    return b(); //调用了函数b,
}
function b() {
}
function c(x) {
    if (x > 100) {
        return a(); //尾调用
    }
    else {
        return b(); //尾调用
    }
}
function e(x) {
    console.log(x);
}
function d() {
    let a = 1;
    let b = 2;
    return e(a + b); //尾调用优化
}
d();
//下面的函数无法进行尾调用优化,因为内部函数用到外部函数的变量,存在引用
function f(num) {
    let x = 1;
    function g(y) {
        return y + x;
    }
    return g(num); //虽然是尾调用,但函数g使用了外部函数的变量x,所以无法释放f函数的帧
}
//尾递归及尾递归优化
//下面是没有尾递归的情况下出现栈溢出
function func1(x) {
    if (x === 1)
        return 1;
    return x * func1(x - 1); //递归调用
}
console.log(func1(10468));
//console.log( func1(10469));//数值过大 报: Maximum call stack size exceeded
//下面数值大一样会报 Maximum call stack size exceeded
function func2(x, t) {
    if (x === 1) {
        return t;
    }
    return func2(x - 1, x * t);
}
console.log(func2(5, 1));
//非尾递归优化
function func3(x) {
    if (x <= 1) {
        return 1;
    }
    return func3(x - 1) + func3(x - 2);
}
console.log(func3(20));
//尾递归优化
function func4(x, ax = 1, bx = 1) {
    if (x <= 1) {
        return bx;
    }
    return func4(x - 1, bx, ax + bx);
}
console.log(func4(100));
console.log(func4(1000));
console.log(func4(6000));
function f1(n, t = 1) {
    if (n === 1) {
        return t;
    }
    return f1(n - 1, n * t);
}
console.log(f1(6000));
//# sourceMappingURL=EndCall.js.map