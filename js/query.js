var list_id='r_list'; //右面列表div's id
var fullUrl;

function handleIt() {
    var book = parse();
    var ISBN = book.isbn;
    for(var i = 0; i< search_prefixes.length; i++) {
      var search_prefix = search_prefixes[i];
      var fullUrl = search_prefix + book.title;
      var display_url = fullUrl;
      var bk_displayed_selector = bk_displayed_selectors[i];
      var lib_prefix = lib_prefixes[i];
      get_html(fullUrl, function(data) {
          var m = undefined;
          var hint = "有馆藏"
          if (bk_displayed_selector == '$') {
            var selectors = bk_displayed_selector.split('.')
            var json = $.parseJSON(data)
            for(var i = 1; i < selectors.length;i++) {
              json = json[selectors[i]]
            }
            m = json;
          } else {
            m = $(data).find(bk_displayed_selector);//有結果顯示 
            if(m.text().length < 10) {
          	  hint = m.text();
          	}
          }
          if (null != m && m != undefined && 0 < m.length) {
            insertSidebar(hint, display_url, lib_prefix); //添加顯示區域
          } else {
            hint = "无馆藏"
            insertSidebar(hint, display_url, lib_prefix);
          }
      });
  }
}

/*
 添加側欄
 */
function insertSidebar(hint, fullUrl, lib) {
    $('div#buyinfo').before('<div id="resourse" class="gray_ad"></div>');
    if (!lib) lib="图书资源";
    $('#resourse').append("<h2>"+lib+"&nbsp;<a target='_blank' href='"+fullUrl+"' >"+hint+"</a>")
}

/*
 轉換id
 */
function toId(id) {
    return '#' + id;
}

handleIt();
