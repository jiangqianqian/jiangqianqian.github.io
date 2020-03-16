# 移动端 H5 中百度地图的点击事件

根据百度地图官方解释，在移动端 H5 页面中可监听下面这 4 个事件:

**touchstart, touchmove, touchend, longpress**

![图片描述](/event.jpeg)

而如果地图上监听了 **click** 事件，在移动端是**不会执行**这个事件里面的代码的。

我之前做一个需求时，给地图监听了 touchend 事件，不曾想当我拖动地图时，也执行了 touchend 里的代码。所以需要模拟一个像 zepto 中的 tap 事件，就能解决这个问题了。

我的代码是：

```(js)
function initMap(baseData) {
    var mp = new BMap.Map('map');
    var point = new BMap.Point(
      baseData.data.gardenLongitude,
      baseData.data.gardenLatitude
    );

    mp.centerAndZoom(point, 15);

    // 保存 touch 对象信息
    var obj = {};

    mp.addEventListener('touchstart', function (e) {
      obj.e = e.changedTouches ? e.changedTouches[0] : e;
      obj.target = e.target;
      obj.time = Date.now();
      obj.X = obj.e.pageX;
      obj.Y = obj.e.pageY;
    });

    mp.addEventListener('touchend', function (e) {
      obj.e = e.changedTouches ? e.changedTouches[0] : e;
      if (
        obj.target === e.target &&

        // 大于 750 可看成长按了
        ((Date.now() - obj.time) < 750) &&

        // 应用勾股定理判断，如果 touchstart 的点到 touchend 的点小于 15，就可当成地图被点击了
        (Math.sqrt(Math.pow(obj.X - obj.e.pageX, 2) + Math.pow(obj.Y - obj.e.pageY, 2)) < 15)
      ) {
        // 地图被点击了，执行一些操作
        doSomething();
      }
    });
  }
```
