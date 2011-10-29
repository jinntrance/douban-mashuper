//推薦圖書js

var re_url="http://webpac.uestc.edu.cn/acquire*chx";
var r=book_to_recommend;
alert(form_url())
window.open(form_url(),'_blank')
function form_url(){
    var full_url=re_url+"?"+
    "author="+r.author+
    "&title="+r.title+
    "&publish="+r.publish+
    "&mention="+r.mention+
    "&other="+r.other;
    return full_url;    
}
