var count=100
var url="https://api.douban.com/v2/book/user/jinntrance/collections?status=wish&count="+count+"&start="
titles=[]
books=[]
limit = 1
books_in_lib = []
for(var i = 0; i<limit;i++){
  full_url = url + i*count
  $.getJSON(full_url, function(json){
    limit = Math.ceil(1.0 * json.total / count)
    limit = 1
    books.concat(json.collections);
    bk = json.collections.map(function(b){
      title = b.book.title;
      fullUrl = search_prefix + title
      get_html(fullUrl, function(data) {
        var m = $(data).find(bk_displayed_selector);//有結果顯示 
          if (null != m && 0 < m.length) {
            books_in_lib.push(title)
          } 
      });
      return title
    })    
    titles = titles.concat(bk)
    console.info(books_in_lib.join(" "))
  })
}

