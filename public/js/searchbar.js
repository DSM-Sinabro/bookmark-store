$(document).ready(function() {
  $('select').material_select();
  $('#searchtags').material_chip();
  $("#bookmark-tags").material_chip({
      secondaryPlaceholder: '엔터로 태그추가',
      placeholder: '태그 추가',
  });
  $('.modal').modal();

  $('#recommandButton').on('click', function(event){
    var target = $(event.target);

    var bookmarkId = target.parents('.card').find('input[type="hidden"]').val();

    $.ajax({
      url: 'bookmarks',
      type: 'PATCH',
      data: {bookmarkId: bookmarkId},
      success: function(result) {
        target.toggleClass('grey-text lignten-2');
        target.toggleClass('red-text');
        if(result == 'plus'){
          var nextCount = parseInt(target.siblings('#recommandCount').html()) + 1;
        }else{
          var nextCount = parseInt(target.siblings('#recommandCount').html()) - 1;
        }
        target.siblings('#recommandCount').html(nextCount);
      },
      error: function(xhr, status) {
        alert('error occurred!!');
      }
    });
  });

  $('#searchButton').click(function(){
    var data = $('#searchForm').serialize();
    data += '&tags=' + JSON.stringify($('#searchtags').material_chip('data'));
    console.log(data);

    $.ajax({
      url: './bookmarks',
      type: 'GET',
      data: data,
      success: function(result){
        // TODO 검색결과 삽입
        // TODO chips inital 호출하기..
      },
      error: function(xhr, status){
        alert('error occurred!!');
      }
    })
  })
});
