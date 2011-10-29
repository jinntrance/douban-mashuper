var book_detail,title,author,publisher,time_published,ISBN_string;

parse();

function parse() {
    title = $('h1').text();
    var infos = $("#info").html().split('<br>');
    if (0 < infos.length)
        for (var i = 0; i < infos.length; i = i + 1) {
            var d='<div>'+infos[i]+'</div>'
            var t = $(d);
            if (contains(t, '作者')) {
                author = t.text();
                continue;
            }
            if (contains(t, '出版社')) {
                publisher = t.text();
                continue;
            }
            if (contains(t, '出版年')) {
                time_published = t.text();
                continue;
            }
            if (contains(t, 'ISBN')) {
                ISBN_string = t.text();
                continue;
            }
        }
    book_to_recommend = {
        "author":author,
        "title":title,
        "publish":publisher + '，' + time_published,
        "mention":"",
        "other":ISBN_string
    }
    alert(ISBN_string);
    //alert(book_detail.other);
}
function contains(element, s) {
    var exp = ":contains('" + s + "')";
    return element.is(exp);
}
