if('book.douban.com'==document.domain)
    handleIt();
else {
    var d=$(bk_displayed_selector) ;
    if (null!=d &&0<d.length)
        displayReview();
}