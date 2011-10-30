function addListener() {
    $('body').append('<div id="pop_img" style="display:none;" ><a id="loc_link" target="_blank"><img id="loc_img" alt="3D定位" height="64" width="64"></a></div>')
    var img_url = chrome.extension.getURL("icon_3d.png");
    $('#loc_img').attr('src', img_url);
    $('tr.bibItemsEntry').mouseover(function(event) {
        $('#loc_link').attr('href', $(this).attr('id'));
        $('#pop_img').css('top', event.pageY - 32).css('left', event.pageX - 32).fadeIn(1800);
    })
/*    $('tr.bibItemsEntry').mouseout(function() {
        $('#pop_img').fadeOut(500);
    })*/
/*
    $('td[width="21%"]').mouseover(function() {
    });
    $('td[width="21%"]').mouseout(function() {
    });
*/

    $('tr.bibItemsEntry').each(function(index, element) {
        var loc_url = loc_3d + parseBarcode(element);
        $(this).attr('id', loc_url)
        //索書號上不加
    })
}