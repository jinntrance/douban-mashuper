var isbn_class_selector1 = 'td:contains("标准号") + td.bibInfoData';
var isbn_class_selector2 = 'td:contains("国际标准书号") + td.bibInfoData';
var book_url = 'http://api.douban.com/book/subject/isbn/'
var review_suffix = '/reviews?orderby=score&start-index=1&max-results=3';//score按照评分排序，返回3个结果
var sidebar = '.bibResourceSidebar'//侧栏
var review_id = "book_review";
function displayReview() {
    var sets,isbn;
    sets = 0 < $(isbn_class_selector1).length ? $(isbn_class_selector1) : $(isbn_class_selector2)
    if (null != sets && 0 < sets.length) {
        isbn = sets.text().trim().split(' ')[0];
        if (10 != isbn.length || 13 != isbn.length)//isbn 不正确，则不查询
            return null;
    } else return null;
    var review_url = book_url + isbn + review_suffix;
    addReview(isbn);
    appendComments(review_url);
}
function appendSidebar() {
    $(sidebar).append('<div id="' + review_id + '"></div>');
}
/*
 添加右面内容
 */
function append(content) {
    $(toId(review_id)).append(content);
}
/*
 评分显示
 */
function displayStars(score) {
    unrated_star = '<img src="/screens/rate_pad.gif" border="0" width="13" height="13">';
    rated_star = '<img src="/screens/rate_group.gif" border="0" width="13" height="13">';
    $(document.createElement('div')).insertBefore('#comments').attr('id', 'stars');
    for (i = 1; i <= 10; i++) {
        if (i <= Math.round(score))
            $('#stars').append(rated_star)
        else
            $('#stars').append(unrated_star);
    }
    $('#stars').append(score);
}
/**
 * 添加单个书评
 * @param review_url
 */
function appendComments(review_url) {
    append('<dl id="review_list"></dl>')
    $.get(review_url, function(data) {
        $(data).find('entry').each(function(index, element) {
            links = $(this).find('link[rel="alternate"]')
            link = $(links[links.length - 1]).attr('href');
            tt = document.createElement('dt');
            $(tt).append('<a target="_blank" href="' + link + '">' + $(this).find('title').text() + '</a>')
                    .attr('class', 'review').appendTo('#review_list');
            $('#review_list').append('<dd class="review">' + $(this).find('summary').text() + '</dd>');
        })
    })
}
/*
 添加评论、评分
 */
function addReview(isbn) {
    appendSidebar();
    append('<div class="space"></div>')
    append('<h2>豆瓣评论</h2>')
    append('<p id=comments ></p>')
    $.get(book_url + isbn, function(data) {
        rating = $(data).find('rating');
        l = $(data).find('link[rel="alternate"]').attr('href') + '/reviews';
        $('#comments').append('<a target="_blank" href="' + l + '">' + rating.attr('numRaters') + '</a>人评价').wrap('<div class=comments ></div>');
        displayStars(rating.attr('average'));
    })
}
