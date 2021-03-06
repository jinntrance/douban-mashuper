var bk_displayed_selectors=['li.booklink', '#atfResults #result_0 .s-price']; // 改页面解析，判断是否有藏书的selector , json must start with `$` such as '$.0.name'
var search_prefixes = ["//www.gutenberg.org/ebooks/search/?query=","//www.amazon.cn/s/?url=search-alias%3Ddigital-text&field-keywords="]; // 搜索url，只需要加搜索书名
lib_prefixes= ["Project Gutenberg", "Kindle 电子书"] //藏书图书馆名字


$.ajaxSetup({
async: false
});

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

