# 使用 html2canvas 对有百度地图的 Dom 元素处理成图片

**问题1**：百度地图应用的是瓦片式图片（地图是一张张图片拼出来的），html2canvas 处理时，遇到非同一域名下的图片，浏览器会显示跨域的报错，也无法用反向代理来解决，因为瓦片图片的域名不确定，无法指定 proxy_pass
**解决**：使用百度地图静态图处理（<http://lbsyun.baidu.com/index.php?title=static>），这时域名确定了（<http://api.map.baidu.com/>），可以用反向代理来解决跨域

```(js)
  <!--html-->
  <el-image
  :src="`/baidu-static/staticimage/v2?ak=yourak&width=1024&height=400&center=${center.lng},${center.lat}&zoom=16`"
>
  <div
    slot="placeholder"
    class="image-slot"
  >
    加载中<span class="dot">...</span>
  </div>
  </el-image>

  <!--nginx-->
  location ^~ /baidu-static/ {
  add_header 'Access-Control-Allow-Origin' "$http_origin" always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS' always;
  add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-
  Since,Keep-Alive,Origin,User-Agent,X-Requested-With' always;
  proxy_pass http://api.map.baidu.com/;
  }
  ```

  **问题2**：地图上的覆盖物怎么显示出来呢
  **解决**：看了下百度地图静态图的 api, 不能很好的支持覆盖物自定义样式，最多可以让你指定一张自定义的图片（不能是本地图片）。中间试过很多办法，觉得可行的是使用 openLayers.Map, 可是代码改动的工作量太大了，果断放弃了。再后来想到自己用 div 直接模拟好覆盖物，设置比静态图层级高一点就可以解决了。

  **问题3**：用 css 样式画了一个虚线圆，在 html2canvas 处理后的生成的图，发现虚线变成了实线
  **解决**：使用 canvas 来画圆

  **问题4**：一个 icon 采用绝对定位，在 html2canvas 处理后的生成的图，发现 icon 没有显示
  **解决**：给 icon 设置 z-index 大于百度静态图层级（PS: 静态图的样式也用了绝对定位的情况下）

  **问题5**：在 html2canvas 处理后生成的图片，有黑色背景色
  **解决**： image/png 改成 image/jpg

  ```(js)
  try {
    html2canvas(sharePage, {
      useCORS: true
    }).then((canvas) => {
      const imgBase64 = canvas.toDataURL('image/jpg')
      this.data64 = imgBase64
      })
    } catch (err) {
  }
  ```
