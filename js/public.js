var bk_displayed_selector='li.booklink'; // 改页面解析，判断是否有藏书的selector 
var search_prefix = "https://www.gutenberg.org/ebooks/search/?query=" // 搜索url，只需要加搜索书名
lib_prefix="Project Gutenberg" //藏书图书馆名字


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

