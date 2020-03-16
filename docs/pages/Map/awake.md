# H5 如何唤起百度地图 App

最近接手了一个需求，要求混合式开发，前端做好 h5 后将页面嵌入到 ios 和 android 中，需要用到百度地图的地图导航。

::: tip 具体功能点如下：

1. 如果手机端（ios, android）安装了百度地图，点击导航按钮，唤起百度地图 app
2. 否则，打开 web 端百度地图导航
:::

需要用到的百度地图的 api 文档链接如下：
[http://lbsyun.baidu.com/index.php?title=uri/api/ios](http://lbsyun.baidu.com/index.php?title=uri/api/ios)

**最开始的代码：**

```(js)
  // 尝试唤起百度地图 app
  window.location.href = scheme;
  var timeout = 600;
  var startTime = Date.now();
  var t = setTimeout(function () {
    var endTime = Date.now();
    // 当成功唤起百度地图 app 后，再返回到 h5 页面，这时 endTime - startTime 一定大于 timeout + 200； 如果唤起失败, 打开 web 端百度地图导航
    if (!startTime || (endTime - startTime) < (timeout + 200)) {
       window.location.href = 'http://api.map.baidu.com/direction' + queryStr + '&output=html';
    }
  }, timeout);

```

**问题：**
上面这段代码在 android 机器上运行是没有问题的，可是在 ios 上却始终执行了 setTimeout 这个计时器，所以如果**在 ios 端，即使 app 处于后台，它的 h5 代码还是会执行**。

所以需要换一种方式，总的思路是：

 1. 采用轮询的方式
 2. 在 600 ms 内尝试唤起百度地图 app, 唤起失败后， 判断 h5 是处于前台还是后台，如果是前台，则打开 web 端百度地图 app。不管唤起成功还是失败，过 200 ms 后都清除定时器。

**修改后的代码：**

```(js)
  var startTime = Date.now();
  var count = 0;
  var endTime = 0;
  var t = setInterval(function () {
    count += 1;
    endTime = Date.now() - startTime;
    if (endTime > 800) {
      clearInterval(t);
    }
    if (count < 30) return;
    if (!(document.hidden || document.webkitHidden)) {
      window.location.href = 'http://api.map.baidu.com/direction' + queryStr + '&output=html';
    }
  }, 20);

```

**完整的代码：**

```(js)
  function wakeBaidu() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (result) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var latCurrent = result.point.lat; //获取到的纬度
        var lngCurrent = result.point.lng; //获取到的经度
        if (latCurrent && lngCurrent) {
          var scheme = '';

          // urlObject 是我这边地址栏查询参数对象
          var queryStr = '?origin=name:我的位置|latlng:' + latCurrent + ',' + lngCurrent + '&destination=' + urlObject.lat + ',' + urlObject.lng + '&region=' + urlObject.city + '&coord_type=bd09ll&mode=driving';

          if (isIOS()) {
            // ios 端
            scheme = 'baidumap://map/direction' + queryStr;
          } else {
            // android 端
            scheme = 'bdapp://map/direction' + queryStr;
          }

          // 主要实现代码
          window.location.href = scheme;

          var startTime = Date.now();
          var count = 0;
          var endTime = 0;

          var t = setInterval(function () {
            count += 1;
            endTime = Date.now() - startTime;
            if (endTime > 800) {
              clearInterval(t);
            }
            if (count < 30) return;
            if (!(document.hidden || document.webkitHidden)) {
              window.location.href = 'http://api.map.baidu.com/direction' + queryStr + '&output=html';
            }
          }, 20);

          window.onblur = function () {
            clearInterval(t);
          };
        } else {
          alert('获取不到定位，请检查手机定位设置');
        }
      }
    });
  }

```
