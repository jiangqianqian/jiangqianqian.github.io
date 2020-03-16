# Vue 与 Element-ui 使用的一些总结

**1.** 在组件上监听滚动事件时要使用 @scroll.**native**="", 直接使用 @scroll 无效

**2.** el-table 当看到宽度无限增加时，需要设置 el-table **外层**样式为 overflow: hidden, **el-table** 样式为 height: 100%

**3.** el-tab-pane 里的组件加 **keep-alive**, 避免页签切换时，每次都会重新请求组件里的接口

  ```(js)
  <el-tabs
    v-model="curTab"
    type="card"
  >
    <el-tab-pane
      label="跟进"
    >
      <keep-alive>
         <your-component v-if="curTab==='abc'"></your-component>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
  ```

**4.** 什么时候使用 this.$set

   当你在 data 里定义一个对象 myObject 或数组 myArr，对象或数组的**属性元素**刚开始未知，后面你要给对象或数组**定义属性元素**，而且这属性元素是响应式的（即视图要刷新），这时需要使用 this.$set，使得属性元素拥有 **getter/setter**， 如 this.$set(myObject, 'a', 1 ), this.$set(myArr, index, 2) ( index 是数组的索引)。

   **另外**：对数组使用 push,pop,shift,unshift,splice,sort,reverse 这 7 个方法，会触发视图更新，所以能用这 7 个方法，就别用 this.$set(myArr, index, 2)。

**5.** 什么情况使用 Object.freeze()

   当你有一个数据（比如说表格 tableData），页面上有一个查询按钮，每次点查询都会重新赋值 tableData， 那么这个 tableData 是需要放到 data 里的（作响应式数据用），而且你也不会改变 tableData 里的属性（如给 tableData 里的一个元素重新赋值），这时你可以这样做以提高性能。

  ```(js)
   data () {
    return {
      tableData: Object.freeze([]),
    }
   }
  ```

**6.** provide,inject 的使用

   我现在使用到的场景是，有一个组件关系是 **A->B->C** (A是B的父组件，B是C的父组件)，现在 C 要调用 A 里面的方法，可以这样写：

  **A组件：**

  ```(js)
    export default {
      provide () {
        return {
          methodName: this.methodName,
        }
      },
      methods: {
        methodName () {
          …
        }
      }
    }
  ```

  **C组件：**

  ```(js)
  export default {
    inject: ['methodName'],
    methods: {
      otherMethod() {
        this.methodName()
      }
    }
  }
  ```

  总结：就是不通过 B 组件，实现 C(后代组件) 调用 A 组件里面的方法。

  **需要注意的是**，provide,inject 是一种**单向非响应式**的数据或方法传递，比如说下面这样使用，当 A 组件的 someData 改变后，并不会导致 C 组件的视图更新。

  **A组件：**

  ```(js)
  export default {
    provide () {
      return {
        someData: this.someData,
      }
    },
    data() {
      return {
        someData: null
      }
    },
    methods: {
      methodName () {
        this.someData = '123'
      }
    }
  }
  ```

  **C组件：**

  ```(js)
    <template>
      <div>{{this.someData}}</div>
    </template>
    export default {
      inject: ['someData'],
    }
  ```

**7.** 子组件调用父组件的方法，并且子组件需要拿到父组件方法的执行结果，可以用 **callback** 实现。

  **父组件A：**

  ```(js)
    <B @change="handleChange"></B>
    ...

    handleChange(val, callback) {
     this.value= val;
     callback("hello");
    }
  ```

 **子组件B：**

  ```(js)
    handleChange(e) {
      this.$emit('change', e.target.value, val => {
        console.log(val); // hello
      });
    },
  ```
