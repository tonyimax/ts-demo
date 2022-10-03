//定义变量修饰函数
function hasFuncA(t){
    t.hasFuncA = true;
}

//为类A添加修饰器hasFuncA 编译器支持,但IDE不支持 修改器,编译成js后不影响执行
@hasFuncA
class A{
    constructor() {
        console.log('使用了修饰器的类');
    }
}

let a = new A();
console.log('调用修饰器变量:',A.hasFuncA);

