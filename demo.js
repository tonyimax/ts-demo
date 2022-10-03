function f(){
    return Math.random() * 100;
};
//提案阶段,没支持
let x = do {
    let t = f();
    t = t * t + 1;
};