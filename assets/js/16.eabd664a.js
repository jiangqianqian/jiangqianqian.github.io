(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{216:function(e,t,a){"use strict";a.r(t);var n=a(28),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"vue-与-element-ui-使用的一些总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-与-element-ui-使用的一些总结"}},[e._v("#")]),e._v(" Vue 与 Element-ui 使用的一些总结")]),e._v(" "),a("p",[a("strong",[e._v("1.")]),e._v(" 在组件上监听滚动事件时要使用 @scroll."),a("strong",[e._v("native")]),e._v('="", 直接使用 @scroll 无效')]),e._v(" "),a("p",[a("strong",[e._v("2.")]),e._v(" el-table 当看到宽度无限增加时，需要设置 el-table "),a("strong",[e._v("外层")]),e._v("样式为 overflow: hidden, "),a("strong",[e._v("el-table")]),e._v(" 样式为 height: 100%")]),e._v(" "),a("p",[a("strong",[e._v("3.")]),e._v(" el-tab-pane 里的组件加 "),a("strong",[e._v("keep-alive")]),e._v(", 避免页签切换时，每次都会重新请求组件里的接口")]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<el-tabs\n  v-model="curTab"\n  type="card"\n>\n  <el-tab-pane\n    label="跟进"\n  >\n    <keep-alive>\n       <your-component v-if="curTab===\'abc\'"></your-component>\n    </keep-alive>\n  </el-tab-pane>\n</el-tabs>\n')])])]),a("p",[a("strong",[e._v("4.")]),e._v(" 什么时候使用 this.$set")]),e._v(" "),a("p",[e._v("当你在 data 里定义一个对象 myObject 或数组 myArr，对象或数组的"),a("strong",[e._v("属性元素")]),e._v("刚开始未知，后面你要给对象或数组"),a("strong",[e._v("定义属性元素")]),e._v("，而且这属性元素是响应式的（即视图要刷新），这时需要使用 this.$set，使得属性元素拥有 "),a("strong",[e._v("getter/setter")]),e._v("， 如 this.$set(myObject, 'a', 1 ), this.$set(myArr, index, 2) ( index 是数组的索引)。")]),e._v(" "),a("p",[a("strong",[e._v("另外")]),e._v("：对数组使用 push,pop,shift,unshift,splice,sort,reverse 这 7 个方法，会触发视图更新，所以能用这 7 个方法，就别用 this.$set(myArr, index, 2)。")]),e._v(" "),a("p",[a("strong",[e._v("5.")]),e._v(" 什么情况使用 Object.freeze()")]),e._v(" "),a("p",[e._v("当你有一个数据（比如说表格 tableData），页面上有一个查询按钮，每次点查询都会重新赋值 tableData， 那么这个 tableData 是需要放到 data 里的（作响应式数据用），而且你也不会改变 tableData 里的属性（如给 tableData 里的一个元素重新赋值），这时你可以这样做以提高性能\v。")]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" data () {\n    return {\n      tableData: Object.freeze([]),\n    }\n }\n")])])]),a("p",[a("strong",[e._v("6.")]),e._v(" provide,inject 的使用")]),e._v(" "),a("p",[e._v("我现在使用到的场景是，有一个组件关系是 "),a("strong",[e._v("A->B->C")]),e._v(" (A是B的父组件，B是C的父组件)，现在 C 要调用 A 里面的方法，可以这样写：")]),e._v(" "),a("p",[a("strong",[e._v("A组件：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  export default {\n    provide () {\n      return {\n        methodName: this.methodName,\n      }\n    },\n    methods: {\n      methodName () {\n        …\n      }\n    }\n  }\n")])])]),a("p",[a("strong",[e._v("C组件：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export default {\n  inject: ['methodName'],\n  methods: {\n    otherMethod() {\n      this.methodName()\n    }\n  }\n}\n")])])]),a("p",[e._v("总结：就是不通过 B 组件，实现 C(后代组件) 调用 A 组件里面的方法。")]),e._v(" "),a("p",[a("strong",[e._v("需要注意的是")]),e._v("，provide,inject 是一种"),a("strong",[e._v("单向非响应式")]),e._v("的数据或方法传递，比如说下面这样使用，当 A 组件的 someData 改变后，并不会导致 C 组件的视图更新。")]),e._v(" "),a("p",[a("strong",[e._v("A组件：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export default {\n  provide () {\n    return {\n      someData: this.someData,\n    }\n  },\n  data() {\n    return {\n      someData: null\n    }\n  },\n  methods: {\n    methodName () {\n      this.someData = '123'\n    }\n  \v}\n}\n")])])]),a("p",[a("strong",[e._v("C组件：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  <template>\n    <div>{{this.someData}}</div>\n  </template>\n  export default {\n    inject: ['someData'],\n  }\n")])])]),a("p",[a("strong",[e._v("7.")]),e._v(" 子组件调用父组件的方法，并且子组件需要拿到父组件方法的执行结果，可以用 "),a("strong",[e._v("callback")]),e._v(" 实现。")]),e._v(" "),a("p",[a("strong",[e._v("父组件A：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('  <B @change="handleChange"></B>\v\n  ...\n\n  handleChange(val, callback) {\n   this.value= val;\n   callback("hello");\n  }\n')])])]),a("p",[a("strong",[e._v("子组件B：")])]),e._v(" "),a("div",{staticClass:"language-(js) extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  handleChange(e) {\n    this.$emit('change', e.target.value, val => {\n      console.log(val); // hello\n    });\n  },\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);