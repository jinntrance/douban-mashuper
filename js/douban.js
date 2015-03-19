var count=100
var url="https://api.douban.com/v2/book/user/jinntrance/collections?status=wish&count="+count+"&start="
titles=[]
books=[]
for(var i = 0; i<8;i++){
  full_url = url + i*count
  $.getJSON(full_url, funciton(json){
    books.concat(json.collections)
    titles.concat(json.collections.map(function(b){
      return b.book.title
    }))
  })
}
