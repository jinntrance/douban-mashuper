var book_url='http://book.douban.com/subject_search?cat=1001&search_text='
var movie_url='http://movie.douban.com/subject_search?cat=1002&search_text='
var music_url='http://music.douban.com/subject_search?cat=1003&search_text='
var parent =chrome.contextMenus.create(
    {'type':'normal','title':'豆瓣一下下(搜书)','onclick':search,'contexts':['selection']}, function(){});
// Create a parent item and two children.
var book = chrome.contextMenus.create(
    {"title": "搜图书", "parentId": parent, "onclick": searchBook,'contexts':['selection']}, function(){});
var movie = chrome.contextMenus.create(
    {"title": "搜电影", "parentId": parent, "onclick": searchMovie,'contexts':['selection']}, function(){});
var music = chrome.contextMenus.create(
    {"title": "搜音乐", "parentId": parent, "onclick": searchMusic,'contexts':['selection']}, function(){});


function search(data,tab){
	var newTab={
	'url':search_url+data.selectionText,/*选取文字加url完成*/
	'selected':false/*false为不切换至打开页面*/
	};
	chrome.tabs.create(newTab);
}
function searchBook(data,tab){
    chrome.tabs.create(formURL("book",data.selectionText));
}
function searchMovie(data,tab){
    chrome.tabs.create(formURL("movie",data.selectionText));
}
function searchMusic(data,tab){
    chrome.tabs.create(formURL("music",data.selectionText));
}
function formURL(type,selectedText){
    var newURL='http://book.douban.com/subject_search?search_text='+selectedText;/*选取文字加url完成*/
    switch (type){
       case "book":
            newURL=book_url+selectedText;break;
       case "movie":
            newURL=movie_url+selectedText;break;
       case "music":
             newURL=music_url+selectedText;break;
    }
    return {
        'url':newURL,
        'selected':false/*false为不切换至打开页面*/
    };
}
