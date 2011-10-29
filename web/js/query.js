var text = $("#info").text();
var title=$('h1').text();
var infos=$("#info").html().split('<br>');
var author=$("#info span:contains('作者') a").text();
var publisher_index=text.indexOf("出版社") + 4;
var publishe_time_index=text.indexOf("出版年") + 4;
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
var fullUrl=url+"SEARCH="+ISBN+"&sortdropdown=-&searchscope=1";
window.open(fullUrl,'_blank')
var childFrame=$('<iframe></iframe>').attr('src',fullUrl);
$('.aside').append(childFrame);
//document.domain = 'webpac.uestc.edu.cn';
function insertInfo(book) {
    var bookDiv = document.createAttribute('div');
    bookDiv.append(book) ;
    $('.aside').insertChildBefore($('gray_ad'), bookDiv);
}
 function pickInfo(data) {
    var book = data.responseXML.getElementsByClassName("bibItems");
    insertInfo(book);
}
function crossDomain(){
    var iframe=document.getElementById('iframe').contentWindow;
    iframe.get("http://work.2fool.cn/crossdomain/helloworld.txt",function(data){
        document.getElementById("ajax").innerHTML=data;
    });
}
