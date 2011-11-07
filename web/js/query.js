var url = "http://webpac.uestc.edu.cn/search*chx/i?";//圖書館ISBN查詢
var re_url="http://webpac.uestc.edu.cn/acquire*chx";//推薦圖書URL
var list_id='r_list'; //右面列表div's id
var fullUrl;
function handleIt() {
    var text = $(info_id).text();
    var ISBN_index = text.indexOf("ISBN") + 5;//"ISBN：" contains 5 chars
    var ISBN = text.substring(ISBN_index, text.length).trim();//the ISBN of the book that the current page displays
    fullUrl = url + "SEARCH=" + ISBN + "&sortdropdown=-&searchscope=1";//1代表查詢全部館藏
    $.post(fullUrl, function(data) {
        var m = $(data).find(bk_displayed_selector);//有結果顯示
        insertSidebar(); //添加顯示區域
        if (null != m && 0 < m.length) {
            displayRecord(data);//顯示館藏信息
        } else {
            recommendToLib(); //推薦到圖書館
        }
    });
}

function parseBarcode(element) {
    return $(element).find('td[width="18%"]').text().trim();
}
/*
 * 添加可借圖書信息
 * */
function addRecordList(l) {
    $(l).each(function (index, element) {
        var lib_loc = $(element).find('td[width="29%"]').text().trim().substring(0, 3); //館藏地點
        var barcode = parseBarcode(element); //條碼
        var i = index + 1;
        var loc = '3d_loc' + i;
        $(toId(list_id)).append(addResourse(loc_3d + barcode, loc, '（第' + i + '本）'));
        $('#' + loc).before(lib_loc);
    });
}
/*
 添加側欄
 */
function insertSidebar() {
    $('div .infobox').after('<div id="resourse" class="gray_ad"></div>');
    $('#resourse').append("<h2>图书资源</h2>")
    $('#resourse').append("<ul id='"+list_id+"'></ul>")
}
/*
 推薦到圖書館
 */
function recommendToLib() {
    parse();
    $(toId(list_id)).append(addResourse('#', 'recommend', '推荐到科大图书馆'))
            .find('a#recommend').attr('target','_parent');//防止推荐后还跳转到新页面
    $('#recommend').click(function() {
        $.post(form_url(), book_to_recommend, function(data) {
            var result = $(data).find(':contains("感谢您的建议") ');
            if (null != result && 0 < result.length)
                alert("推荐成功");
            else {
                alert("推荐失败，请先登陆图书馆");
            }
        })
    })
}
/*
 顯示館藏信息
 */
function displayRecord(data) {
    var book_sn = $(data).find('td[width="21%"]')[0];//解析索書號
    book_sn = $(book_sn).text().trim();
    var book_id = 'lib_book';//館藏信息這一行
    $(toId(list_id)).append(addResourse(fullUrl, book_id, '（' + book_sn + '）'));
    $(toId(book_id)).before('电子科大有馆藏');
    var l = $(data).find('tr:contains("可借").bibItemsEntry') //列表中有可借記錄
    if (null != l && 0 < l.length) {
        $(toId(book_id)).after('（可借）');
        addRecordList(l);
    }
    else
        $(toId(book_id)).after('（不可借）');
}
/*
 添加單獨一行，
 */
function addResourse(url, id, resourse) {
    return '<li class="bs">' + addLink(url, id, resourse) + '</li>';
}
/*
 添加A鏈接
 */
function addLink(url, id, resourse) {
    return '<a target="_blank" id="' + id + '" href="' + url + '">' + resourse + '</a>'
}
/*
 轉換id
 */
function toId(id) {
    return '#' + id;
}
/**
 * 推薦圖書URL拼接
 */
function form_url(){
    var r=book_to_recommend;
    var full_url=re_url+"?"+
    "author="+r.author+
    "&title="+r.title+
    "&publish="+r.publish+
    "&mention="+r.mention+
    "&other="+r.other;
    return full_url;
}



