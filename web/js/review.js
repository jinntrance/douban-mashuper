var isbn_class_selector='td:contains("标准号") + td.bibInfoData';
var book_url='http://api.douban.com/book/subject/isbn/'
var review_suffix='/reviews?orderby=score&start-index=1&max-results=2'
var sidebar='.bibResourceSidebar'
var review_id="book_review";
function displayReview(){
   sets=$(isbn_class_selector).text().trim().split(' ');
   var isbn=sets[0];
   review_url=book_url+isbn+review_suffix;
   appendSidebar();
   append('<h2>豆瓣评论</h2>')
   $.post(book_url+isbn,function(data){
       raing=$(data).find('gd\\:rating');
       append('<p>评分'+raing.attr('average')+'/10,共'+raing.attr('numRaters')+'评论</p>')
   })
   append('<ul id="review_list"></ul>')
   $.post(review_url,function(data){
    $(data).find('entry').each(function(index,element){
      $('#review_list').append(this.summary.text())
    })
   })
}
function appendSidebar(){
    $(sidebar).append('<div id="'+review_id+'"></div>');
}
function append(content){
    $(toId(review_id)).append(content);
}