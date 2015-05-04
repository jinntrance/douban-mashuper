var list_id='r_list'; //右面列表div's id
var fullUrl;

function get_html(url,callback){
  $.ajax({
    type:"GET",
    dataType : 'html',
    beforeSend: function (request)
    {
        request.setRequestHeader("Cache-Control", "max-age=0");
        request.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    },
    xhr: function() {
        var xhr = jQuery.ajaxSettings.xhr();
        var setRequestHeader = xhr.setRequestHeader;
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            setRequestHeader.call(this, name, value);
        }
        return xhr;
    },
    url: url,
    processData: false,
    success: function(html) {
        callback(html)
    }
   });
}

function handleIt() {
    var book = parse();
    var ISBN = book.isbn;
    fullUrl = search_prefix + book.title;
    get_html(fullUrl, function(data) {
        var m = $(data).find(bk_displayed_selector);//有結果顯示 
        if (null != m && 0 < m.length) {
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
    $('#resourse').append("<h2>"+lib+"&nbsp;<a target='_blank' href='"+fullUrl+"' >"+hint+"</a>")
}

/*
 轉換id
 */
function toId(id) {
    return '#' + id;
}

handleIt();
