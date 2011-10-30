if ('book.douban.com' == document.domain)
    handleIt();
else if ('webpac.uestc.edu.cn' == document.domain) {
    var d = $(bk_displayed_selector);
    if (null != d && 0 < d.length) {
        addListener();
        displayReview();
    }
}