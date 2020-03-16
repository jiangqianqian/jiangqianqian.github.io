# 你需要了解的前后端传参

**前后端传参一般有两种形式：**

 **key=value** 形式传参（即 parameter 形式）
 **body** 形式传参（传 json 数据给后端）

 > **key=value 形式传参**

 **1.** 如果使用的是 GET 请求，浏览器展示的 Request URL 会自动在路径后面加上 ?a=1&b=2这样的参数，这就是 key=value 形式传参, 在控制台看到的参数形式是 “Query String Parameters”，后端解析时是用 querystring.parse 进行处理。

axios 请求示例

```(js)
import request from 'axios'

...

someInterface (params) {
  return request({
    url: '请求路径',
    method: 'GET',
    params
  })
},
```

浏览器关于 GET 请求的呈现：

![图片描述](/p1.jpeg)

 **2.** 如果发送 POST 请求，对传参进行如下处理，则在控制台看到的参数形式是 “Form Data”，而且浏览器会自动将 Request Headers 的 Content-Type 设置为 application/x-www-form-urlencoded, 这种也是  key=value 形式传参， 后端解析时是用 querystring.parse 进行处理。

处理方式1：

```(js)
import request from 'axios'
import qs from 'qs'

...

someInterface (params) {
  return request({
    url: '请求路径',
    method: 'POST',
    data: qs.stringify(params)
  })
},

```

处理方式2：

```(js)
import request from 'axios'
import qs from 'qs'

...

someInterface (params) {
    return request({
      url: '请求路径',
      method: 'POST',
      data: params,
      transformRequest: [(data) => {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
  },

```

浏览器呈现：

![clipboard.png](/p2.jpeg)

> **body 形式传参**

如果发送 POST、PUT、PATCH 等请求，若 content-type 为 application/json（使用 axios 发送这些请求时，浏览器 Request Headers 的 Content-Type 没显示出，则默认为 application/json），在控制台中看到的参数形式叫做 "Request payload"，后端解析用 body-parser 来处理

axios 请求示例

```(js)
import request from 'axios'

    ...

    someInterface (params) {
      return request({
        url: '请求路径',
        method: 'POST',
        data: params
      })
    },
```

浏览器呈现：

![clipboard.png](/p3.jpeg)

**另外**，jquery 的 ajax 请求中当 type 为 POST 时，会将 contentType统一处理成:
 "application/x-www-form-urlencoded; charset=UTF-8", 所以使用的是 Form Data 这种传参形式，我测试时目前没看到过有 Request payload 这种形式的。

**总之**，method 用 GET 还是 POST 是后端定义好的，前端写死就好，至于是 key=value 还是 body 形式，要看后端是什么方式来解析，并非 method  为 POST, 就一定要用 body 形式，也可以是 key=value 形式。qs.stringify 可以转化成 key=value 形式（即将参数对象序列化成 URL 的形式，以&进行拼接）。
