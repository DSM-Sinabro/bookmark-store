$(document).ready(function() {
    $("#bookmark-tags").material_chip({
        secondaryPlaceholder: '엔터로 태그추가',
        placeholder: '태그 추가',
    });

    $("#bookmark-link").on('blur', function() {
        // 서버로부터 해당 링크의 타이틀을 얻어옴
        // 그 타이틀은 타이틀 영역에 띄워줌
        console.log("타이틀 요청");
        console.log($("#bookmark-tags").material_chip('data'));
    });

    $("#bookmark-add").on('click', function() {
        let bookmarkData = {
            title: $("#bookmark-title").text,
            url: $("#bookmark-link").value,
            tags: $("#bookmark-link").material_chip('data')
        };
        $.ajax({
            url: '/bookmarks',
            type: 'POST',
            data: bookmarkData,
            success: (result) => {
                console.log("success")
            },
            error: function(e) {
                console.log(e);
            }
        })
    });
});
