import { mix} from './mixins';//导入混合方法
//声明要混合入类的方法
let methodToMix = {
    MixFunc(){console.log('this method use for Mix');}
}

@mix(methodToMix)//在类声明中使用了修饰器@mix
class MyClass{}

let obj = new MyClass();//实例化类,类对象具有修饰器混入的方法MixFunc
obj.MixFunc();//调用混入的方法