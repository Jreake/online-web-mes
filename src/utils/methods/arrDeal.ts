/**
 * 数组处理
 * 方法：
 *    1、Array.isArray() : 监测该对象是否为数组，返回boolean值
 *    2、filter()：返回新数组，不会改变原数组，不会对空数组进行检测，只能筛选会遍历完数组
 *    3、find()：返回新数组，不改变原数组，满足条件立即跳出
 *    4、reduce(),reduceRight()：对数组中每个元素（从左到右，或者从右向左）执行callback函数不改变原数组
 *    5、concat()：两个数组合并，改变原数组
 *    6、map()：返回新数组，不改变原数组，可以在原有基础上面运算
 *    7、enery()：检测数组中的每一个元素是否都通过，都通过返回true，否则返回false
 *    8、some()：在数组中寻找是否满足条件
 */

/**
 * 1、数组扁平化
 *
 * */

const arr = [1,[2,[3,4,[5],7],6],8];

// flat(num)方法，num:要拉平的层级，Infinity：全部拉平变成一维数组
const res1 = arr.flat(Infinity)

// 利用正则表达式(数据类型会变成字符串)
const res2 = JSON.stringify(arr).replace(/\[|\]/g,'').split(',')

// 正则表达式改良
const res3 = JSON.parse('['+JSON.stringify(arr).replace(/\[|\]/g,'')+']');

// 使用reduce
const flatten = arr=>{
  return arr.reduce((pre,cur)=>{
    return pre.concat(Array.isArray(cur)?flatten(cur):cur);
  },[])
}
const res4 = flatten(arr)

//递归
const res5:any = [];
const fn = arr=>{
  for(let i = 0; i< arr.length; i++){
    if(Array.isArray(arr[i])){
      fn(arr[i])
    }else{
      res5.push(arr[i])
    }
  }
}


/**
 * 2、数组去重
 */

const repeatArr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

// 1、利用Set
// Array.form() 将两类对象转为真正的数组
// Array.of()  方法用于将一组值，转换为数组。Array.of(3) //[3]
const repeat1 = Array.from(new Set(arr));


// 2、利用for循环+splice
const unique1 = (repeatArr)=>{
  let len = repeatArr.length;
  for(let i =0;i<len;i++){
    for(let j = i+1;j<len;j++){
      if(repeatArr[i]===repeatArr[j]){
        repeatArr.splice(j,1);
        len--;
        j--;
      }
    }
  }
  return repeatArr
}


// 3、利用indexOf()
const unique2 = repeatArr =>{
  const res:any = [];
  for(let i=0;i<repeatArr.length;i++){
    if(res.indexOf(repeatArr[i])===-1){
      res.push(repeatArr[i])
    }
  }
  return res
}

// 4、利用include
const unique3 = repeatArr=>{
  const res:any = [];
  for(let i = 0; i<repeatArr.length; i++){
    if(!res.includes(repeatArr[i])){
      res.push(repeatArr[i])
    }
  }
}

// 5、利用filter()
const unique4 = repeatArr =>{
  return repeatArr.filter((item,index)=>{
    return repeatArr.indexOf(item) === index
  })
}

// 6、利用map()
const unique5 = repeatArr =>{
  const map = new Map();
  const res:any = [];
  for(let i = 0; i<repeatArr.length; i++){
    if(!map.has(repeatArr[i])){
      map.set(repeatArr[i],true)
      res.push(repeatArr[i])
    }
  }
  return res;
}



