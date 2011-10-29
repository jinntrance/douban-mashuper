var text = $("#info").text();
var title = $('h1').text();
var infos = $("#info").html().split('<br>');
var author = $("#info span:contains('作者') a").text();
var publisher_index = text.indexOf("出版社") + 4;
var publishe_time_index = text.indexOf("出版年") + 4;
var ISBN_index = text.indexOf("ISBN") + 5;//"ISBN：" contains 5 chars
var ISBN = text.substring(ISBN_index, text.length).trim();//the ISBN of the book that the current page displays
//alert(ISBN);
/**
 * fetch the book's information in the lib of UESTC
 */
var url = "http://webpac.uestc.edu.cn/search*chx/i?";
var para = {"SEARCH":ISBN ,
    "sortdropdown":'-',
    "searchscope":1};//查詢全部館藏
var fullUrl = url + "SEARCH=" + ISBN + "&sortdropdown=-&searchscope=1";
$.post(fullUrl, function(data) {
    var m = $(data).find('.bibDisplayContentMain');//
    $('div .infobox').after('<div id="resourse" class="gray_ad"></div>');
    $('#resourse').append("<h2>图书资源</h2>")
    $('#resourse').append("<ul id='r_list'></ul>")
    if (null != m&&0<m.length)
        $('#r_list').append(addResourse(fullUrl,'', '电子科大图书馆有藏'));
    else {
        $('#r_list').append(addResourse('#','recommend', '推荐到科大图书馆'));
        $('#recommend').click(function(){
            $.post(form_url(),book_to_recommend,function(data){
               var result=$(data).find(':contains("感谢您的建议") ');
               if(null!=result&&0<result.length)
                   alert("推荐成功");
                else{
                   alert("推荐失败，请先登陆图书馆");
               }
            })
        })
        }
});

function addResourse(url, id,resourse) {
    return '<li class="bs"><a target="_self" id="'+id+'" href="' + url + '">' + resourse + '</a></li>';
}


