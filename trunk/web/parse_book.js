var title,author,publisher,time_published,ISBN_string;
parse();

function parse(){
title=$('h1').text();
var infos=$("#info").html().split('<br>');
if(0<infos.length)
    for(var i=0;i<infos.length;i=i+1){
        var t=$(infos[i]);
        if(contains(t,'作者')) {author=t.text();continue ;}
        if(contains(t,'出版社')) {publisher=t.text();continue ;}
        if(contains(t,'出版年')) {time_published=t.text();continue ;}
        if(contains(t,'ISBN')) {ISBN_string=t.text();continue ;}           
    }
}
function contains(element,s){
    var exp=":contains('"+s+"')";
    return element.is(exp);
}
