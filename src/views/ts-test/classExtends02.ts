// /***
//  * 1、类中的getter 、 setter
//  * / 

// // class Persions {
// //     // private ： 私有属性
// //     constructor(private _name: string) { }
// //     get name() {
// //         return this._name
// //     }
// //     set name(name: string) {
// //         const realName = name.split(' ')[0];
// //         this._name = realName;
// //     }
// // }

// // const persions = new Persions('dell')
// // persions.name;
// // persions.name = "jreake"




// /***
//  *  2、设计模式：：：单例模式
//  * 
//  * /

// // class Demo {
// //     // 存储new()的Demo，用来判断实例化对象的个数
// //     private static instance: Demo;
// //     // 限制不可以通过new的方式实例化Demo()
// //     private constructor(public name: string) { }

// //     // 只允许有一个实例化对象创建 
// //     static getInstance() {
// //         if (!this.instance) {
// //             this.instance = new Demo('dell lee');
// //         }
// //         return this.instance
// //     }
// // }

// // // demo1 === demo2
// // const demo1 = Demo.getInstance()
// // const demo2 = Demo.getInstance()




// /***
//  * 3、修饰符 readonly:只读
//  * / 

// // class Person {
// //     private readonly name: string;
// //     constructor(name: string) {
// //         this.name = name
// //     }
// // }

// // const person = new Person('Dell');



// /**
//  *  4、抽象类
//  * ..多个类有相同的方法，可以将相同的抽象出来
//  * 将类通用的方法或者属性抽离出来
//  * 
// */

// // abstract class Geom {
// //     width?: number;
// //     getType() {
// //         return 'Gemo'
// //     }
// //     abstract getArea(): number
// // }

// // class Circle extends Geom {
// //     getArea() {
// //         return 123
// //     }
// // }

// // class Square {
// //     getArea() {
// //         return 12
// //     }
// // }

// // class Triangle {
// //     getArea() {
// //         return 333
// //     }
// // }


// /**
//  *  5、接口
//  *  
//  *
// */

// interface Person {
//     name: string,
//     age: number,
//     sex?: string
// }

// interface Teacher extends Person {
//     mySelf: string
// }
// interface Student extends Person {
//     language: Boolean
// }

// const teacher = {
//     name: 'Jreake',
//     age: 20,
//     language: "中文"
// }
// const student = {
//     age: 21,
//     name: 'Taylor'
// }

// const getUserInfo = (user: Person) => {
//     console.log(user.name)
// }

// getUserInfo(teacher)
// getUserInfo(student)
