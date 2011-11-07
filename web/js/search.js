var search_url='http://book.douban.com/subject_search?cat=1001&search_text='
var properties={
	'type':'normal',
	'title':'豆瓣一下下',
	'onclick':search,
	'contexts':['selection']
}
chrome.contextMenus.create(properties, function(){})

function search(data,tab){
	var newTab={
	'url':search_url+data.selectionText,/*选取文字加url完成*/
	'selected':false/*false为不切换至打开页面*/
	}
	chrome.tabs.create(newTabl);
}