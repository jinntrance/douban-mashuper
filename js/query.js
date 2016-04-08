var list_id='r_list'; //右面列表div's id
var fullUrl;
var display_url;

function handleIt() {
    var book = parse();
    var ISBN = book.isbn;
    fullUrl = search_prefix + book.title;
    display_url= display_prefix + book.title;
    get_html(fullUrl, function(data) {
        var m = undefined;
        if (bk_displayed_selector[0] == '$') {
          var selectors = bk_displayed_selector.split('.')
          var json = $.parseJSON(data)
          for(var i = 1; i < selectors.length;i++) {
            json = json[selectors[i]]
          }
          m = json;
        } else {
          m = $(data).find(bk_displayed_selector);//有結果顯示 
        }
        if (null != m && m != undefined && 0 < m.length) {
	        insertSidebar("有馆藏"); //添加顯示區域
        } else {
        	insertSidebar("无馆藏");
        }
    });
}

/*
 添加側欄
 */
function insertSidebar(hint) {
    $('div#buyinfo').before('<div id="resourse" class="gray_ad"></div>');
    var lib="图书资源"
    if (window.lib_prefix && lib_prefix.length>1) lib = lib_prefix;
    $('#resourse').append("<h2>"+lib+"&nbsp;<a target='_blank' href='"+display_url+"' >"+hint+"</a>")
}

/*
 轉換id
 */
function toId(id) {
    return '#' + id;
}

handleIt();
