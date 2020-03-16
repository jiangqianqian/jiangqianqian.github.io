# async...await 的一些使用总结

## 关于 async

它会隐式返回一个 Promise 对象

```(js)
async func () {
  return 'a'
}

// 等价于
func () {
  return new Promise((resolve, reject) => {
    resolve ('a')
  })
}
```

```(js)
async func () {
  return new Promise(resolve, reject) => {
    resolve ('a')
  })
}

// 等价于
func () {
  let promise = return new Promise((resolve, reject) => {
    resolve('a')
  })
  return new Promise((resolve) => resolve(promise))
}
```

async func 中有 return 'a', 等价于 func 中 new Promise 的 resolve('a')

async func 中有 throw Error('a'), 等价于 func 中 new Promise 的 reject('a')

## 关于 **await**

await 后面跟的是 Promise 对象，如果不是，也会转换成 Promise 对象。

如 const res = await 'hello', 等价于 const res = await **Promise.resolve**('hello')

try … catch() 中的 catch() 会捕获到 Promise 的异常，下面的代码是我经常使用的

```(js)
async function func() {
  try {
    const res = await Promise.reject(30);
  } catch (err) {
    console.log(err); // 30
  }
}

func();
```

依次顺序执行异步操作

```(js)
// 先执行 task1，等 res1 有结果后，再执行 task2
async func () {
  const res1 = await task1()
  const res2 = await task2()
}
```

并行执行异步操作

```(js)
func () {
  task1()
  task2()
  task3()
}
```

或者，

```(js)
async func () {
  const promise1 = task1()
  const promise2 = task2()
  const res1 = await promise1
  const res2 = await promise2
}
```

或者，

```(js)
async function func () {
  await Promise.all([task1(), task2(),task3()])
  console.log('三个任务执行完毕')
  // 全部执行完毕后，接着后面的代码
}
```
