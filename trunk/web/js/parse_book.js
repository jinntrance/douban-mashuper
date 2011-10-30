var book_to_recommend,info_id="#info";

function parse() {
    title = $('h1').text();
    var infos = $(info_id).html().split('<br>');
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
}
function contains(element, s) {
    var exp = ":contains('" + s + "')";
    return element.is(exp);
}