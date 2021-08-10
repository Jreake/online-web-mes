// class Persion {
//     name = "Jreake";
//     getName() {
//         return this.name
//     }
// }

// //类的继承，拥有Persion的全部方法，并且有自己的方法
// // 子类可以重新父类的方法
// class Teacher extends Persion {
//     getTechaerName() {
//         return 'techer'
//     }
//     // 重写了父类的方法
//     // 重写了父类的方法之后还可以通过super.getName()获取父类的方法
//     getName() {
//         return super.getName() + 'lee'
//     }
// }

// const persion = new Persion();
// console.log(persion.getName())