var book_to_recommend,info_id="#info";
/**
  * parse the book info on html page
  */
function parse() {
    var title,author,publisher,time_published,ISBN_string;
    title = $('h1').text().trim();
    var infos = $(info_id).html().split('<br>');
    if (0 < infos.length)
        for (var i = 0; i < infos.length; i = i + 1) {
            var d='<div>'+infos[i]+'</div>'
            var t = $(d);
            if (contains(t, '作者')) {
                author = t.text().replace(/\s/g,'');
                continue;
            }
            if (contains(t, '出版社')) {
                publisher = t.text().trim();
                continue;
            }
            if (contains(t, '出版年')) {
                time_published = t.text().trim();
                continue;
            }
            if (contains(t, 'ISBN')) {
                ISBN_string = t.text().replace(/[^\d]/g,'');
                continue;
            }
        }
    book_to_recommend = {
        "author":author,
        "title":title,
        "publish":publisher + '，' + time_published,
        "mention":"",
        "isbn":ISBN_string
    }
    return book_to_recommend
}
function contains(element, s) {
    var exp = ":contains('" + s + "')";
    return element.is(exp);
}
