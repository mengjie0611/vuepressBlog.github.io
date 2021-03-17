---
title: JavaScript中的异步编程解决方案
date: 2018-05-17 17:05:05
type: 技术
tags: JavaScript | ES6
note: ES6 诞生以前，异步编程的方法有四种：回调函数、事件监听、发布/订阅、Promise 对象。
---

## Generator 函数
学习指导：[阮一峰ES6 -- Generator函数](http://es6.ruanyifeng.com/#docs/generator)

### 基本概念
* 语法上：Generator 函数是一个状态机，封装了多个内部状态；执行 Generator 函数会返回一个遍历器对象。也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
* 形式上：Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号`*`；二是，函数体内部使用`yield`表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();

// 定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world）
// 即该函数有三个状态：hello，world 和 return 语句（结束执行）。
```

* 调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value和done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。

```javascript
// 上述函数下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
// 即每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，
// 直到遇到下一个yield表达式（或return语句）为止。
// 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }

/*
解释说明：
上面代码一共调用了四次next方法。
第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。
next方法返回一个对象，它的value属性就是当前yield表达式的值hello，
done属性的值false，表示遍历还没有结束。

第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。
next方法返回的对象的value属性就是当前yield表达式的值world，
done属性的值false，表示遍历还没有结束。

第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句
（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，
就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），
done属性的值true，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，
next方法返回对象的value属性为undefined，done属性为true。
以后再调用next方法，返回的都是这个值。
*/
```

### yield 表达式说明
* Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
* 遍历器对象的next方法的运行逻辑如下。
   * 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
   * 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
   * 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
   * 如果该函数没有return语句，则返回的对象的 value 属性值为 undefined。
* 需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```javascript
function* gen(){
  yield 123 + 456;
}

// yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值.
```

### yield 表达式语法
* yield表达式只能用在 Generator 函数里面，用在其他地方都会报错

```javascript
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

* yield表达式如果用在另一个表达式之中，必须放在圆括号里面

```javascript
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

* yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号

```javascript
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

### 用法实例讲解

```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};  // 错误用法
// forEach方法的参数是一个普通函数，但是在里面使用了yield表达式

// 一种修改方法是改用for循环。
var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```

### yield表达式与return语句
* yield 表达式与return 语句既有相似之处，也有区别。  
* 相似之处在于，都能返回紧跟在语句后面的那个表达式的值。  
* 区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。 
* 一个函数里面，**只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式**。  
* 正常函数只能返回一个值，因为只能执行一次return；  
* Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。  
* 从另一个角度看，也可以说 Generator 生成了一系列的值。  

### next 方法的参数
* `yield`表达式本身没有返回值，或者说总是返回`undefined`。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

```javascript
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}
var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }

/*
上面代码先定义了一个可以无限运行的 Generator 函数f，
如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。

当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，
下一轮循环就会从-1开始递增。
 */
```

* 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
* 通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。  

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

/*
上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），
除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。
第三次运行Next方法的时候不带参数，所以z等于undefined，
返回对象的value属性等于5 + NaN + undefined，即NaN。

如果向next方法提供参数，返回结果就完全不一样了。
上面代码第一次调用b的next方法时，返回x+1的值6；
第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，
这时x等于5，y等于24，所以return语句的值等于42。
*/
```


* 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。  

### for...of 循环
* 1) for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。  

```javascript

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

// 上面代码使用for...of循环，依次显示 5 个yield表达式的值。
// 这里需要注意，一旦next方法的返回对象的done属性为true，
// for...of循环就会中止，且不包含该返回对象，
// 所以上面代码的return语句返回的6，不包括在for...of循环之中。
```  

* 2)利用`for...of`循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

* 3)加上遍历器接口的另一种写法是，将 Generator 函数加到对象的`Symbol.iterator`属性上面

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

* 4)除了for...of循环以外，`扩展运算符（...）`、`解构赋值`和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。  

```js
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

### Generator函数的异步操作
```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```
函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。
也就是说，yield命令是异步两个阶段的分界线。
协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。  
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

### 异步任务的封装
```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

// Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。
// 就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。

// 执行上述代码
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

// 首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。
// 由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。
```
虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。


## async 函数
学习指导：[阮一峰ES6 -- async函数](http://es6.ruanyifeng.com/#docs/async)

### 含义
* async 函数是什么？一句话，它就是 Generator 函数的语法糖

```javascript
// generator 函数依次读取两个文件
const fs = require('fs');
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// async函数，就是下面这样
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
```

* async函数对 Generator 函数的改进，体现在以下四点：
   * **内置执行器** —— Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
   * **更好的语义** —— async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
   * **更广的适用性** —— co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
   * **返回值是 Promise** —— async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。**进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。**  

### 基本用法
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

* 引入demo

```javascript
/* async 表示异步调用 返回一个Promise对象 */
async function timeout(ms) {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  /* 与下边等价*/

// function timeout(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
// }

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 3000)  // 3000毫秒以后，输出hello world
```

* async的表达方式

```javascript

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

### async 的语法
* 返回Promise 对象
   * async函数返回一个 Promise 对象。
   * async函数内部return语句返回的值，会成为then方法回调函数的参数。

    ```javascript
    async function f() {
      return 'hello world';
    }

    f().then(v => console.log(v))
    // "hello world"
    // 函数 f 内部return命令返回的值，会被then方法回调函数接收到。
    ```

* async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

```javascript
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
```

* Promise 对象的状态变化
   * async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
   * 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

    ```javascript
    async function getTitle(url) {
      let response = await fetch(url);
      let html = await response.text();
      return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }
    getTitle('https://tc39.github.io/ecma262/').then(console.log)
    // "ECMAScript 2017 Language Specification"

    // 函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。
    // 只有这三个操作全部完成，才会执行then方法里面的 console.log。
    ```

* await 命令
   * 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。

    ```javascript
    async function f() {
      return await 123;
    }

    f().then(v => console.log(v))
    // 123

    // await命令的参数是数值123，它被转成 Promise 对象，并立即resolve
    ```

   * await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

    ```javascript
    async function f() {
      await Promise.reject('出错了');
    }

    f()
    .then(v => console.log(v))
    .catch(e => console.log(e))
    // 出错了

    // await 语句前面没有 return，但是 reject 方法的参数依然传入了 catch 方法的回调函数。
    // 这里如果在await前面加上return，效果是一样的。
    ```

   * 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行

    ```javascript
    async function f() {
      await Promise.reject('出错了');
      await Promise.resolve('hello world'); // 不会执行
    }
    ```

   * 可以将第一个await放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
    
    ```javascript
    async function f() {
      try {
        await Promise.reject('出错了');
      } catch(e) {
      }
      return await Promise.resolve('hello world');
    }

    f()
    .then(v => console.log(v))
    // hello world
    ```

   * 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误

    ```javascript
    async function f() {
      await Promise.reject('出错了')
        .catch(e => console.log(e));
      return await Promise.resolve('hello world');
    }

    f()
    .then(v => console.log(v))
    // 出错了
    // hello world
    ```

### 使用注意点
* 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在`try...catch`代码块中。
* 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
let foo = await getFoo();
let bar = await getBar();
// 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。
// 这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。


// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
// getFoo和getBar都是同时触发，这样就会缩短程序的执行时间
```
* 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
// 上面代码会报错，因为await用在普通函数之中了

// 采用for循环
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。
// 当三个请求都会resolved时，下面两种写法效果相同。
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

### async函数实现原理
* async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

```javascript
async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

// 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。
```

### 场景再现
* 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

```javascript
async function chainAnimationsAsync(elem, animations) {
  let ret = null;  // 变量ret用来保存上一个动画的返回值
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```

* 依次远程读取一组 URL，然后按照读取的顺序输出结果。

```javascript
// 远程操作继发.只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}

// 并发发出远程请求
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```