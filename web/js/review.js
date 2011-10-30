var isbn_class_selector = 'td:contains("标准号") + td.bibInfoData';
var book_url = 'http://api.douban.com/book/subject/isbn/'
var review_suffix = '/reviews?orderby=score&start-index=1&max-results=2'
var sidebar = '.bibResourceSidebar'
var review_id = "book_review";
function displayReview() {
    sets = $(isbn_class_selector).text().trim().split(' ');
    var isbn = sets[0];
    review_url = book_url + isbn + review_suffix;
    appendSidebar();
    append('<div class="space"></div>')
    append('<h2>豆瓣评论</h2>')
    append('<p id=comments ></p>')
    $.get(book_url + isbn, function(data) {
        rating = $(data).find('rating');
        l = $(data).find('link[rel="alternate"]').attr('href') + '/reviews';
        $('#comments').append('评分' + rating.attr('average') + '/10,共<a target="_blank" href="' + l + '">' + rating.attr('numRaters') + '</a>条评论').wrap('<div class=comments ></div>');
    })
    append('<dl id="review_list"></dl>')
    $.get(review_url, function(data) {
        $(data).find('entry').each(function(index, element) {
            links = $(this).find('link[rel="alternate"]')
            link=$(links[links.length-1]).attr('href');
            tt = document.createElement('dt');
            $(tt).append('<a target="_blank" href="' + link + '">' + $(this).find('title').text() + '</a>')
                    .attr('class', 'review').appendTo('#review_list');
            $('#review_list').append('<dd class="review">' + $(this).find('summary').text() + '</dd>');
        })
    })
}
function appendSidebar() {
    $(sidebar).append('<div id="' + review_id + '"></div>');
}
function append(content) {
    $(toId(review_id)).append(content);
}