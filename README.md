#暂只为电子科大图书馆使用
# 使用指南 #

## 使用场景 ##
1.你使用Google Chrome浏览器
2.最好Chrome版本在13及以上

## 插件功能 ##
# 于豆瓣某书信息页面
  * 可查科大图书馆馆藏（含索书号和3D定位功能）
  * 将某书推荐至图书馆
  
# 于图书馆某书信息页面
  * 可查看该书豆瓣评分和3则评论
  * 使用该书3D定位


## 使用Chrome插件方法 ##
  * 点击插件下载  [插件](https://github.com/jinntrance/douban-mashuper/archive/master.zip)
  * 解压zip，在Chrome 中访问 [chrome://extensions/](chrome://extensions/)
  * 选中并启用"Developer Mode"，而后"Load unpacked extension"，选中上一步中解压到的目录。
  * 安装成功后可于此两页[豆瓣](http://book.douban.com/subject/5401989/) [图书馆](http://webpac.uestc.edu.cn/search*chx/i?SEARCH=9787542629586&sortdropdown=-&searchscope=1)整合电子科大图书馆与豆瓣读书资源，为Chrome插件


豆瓣API
-----

(使用7-108-01707-5作测试ISBN)

**1.图书 GET http://api.douban.com/book/subject/isbn/{isbnID}**

**2.评论 GET http://api.douban.com/book/subject/isbn/{isbnID}/reviews**

例子GET http://api.douban.com/movie/subject/isbn/7-108-01707-5/reviews?start-index=1&max-results=2

'参数	意义	备注
start-index	起始元素
max-results	返回结果的数量
orderby	排序方式	书影音的所有评论支持该参数
score，按投票排序（默认）
time，按发布时间排序'

**3.搜索
GET http://api.douban.com/book/subjects?tag=cowboy&start-index=1&max-results=2**

```
参数	意义	备注
q	全文检索的关键词
tag	搜索特定tag
start-index	起始元素
max-results	返回结果的数量'
```

