//推薦圖書js

var re_url="http://webpac.uestc.edu.cn/acquire*chx";
alert(form_url())
var recommendations={
"author":author,
"title":title,
"publish":publisher+'，'+time_published,
"mention":"",
"other":ISBN
}
function form_url(){
    var full_url=re_url+"?"
    "author="+author+
    "&title="+title+
    "&publish="+publisher+'，'+time_published,
    "&mention="+
    "&other="+ISBN_string;
    alert(full_url);
    return full_url;
    
}
