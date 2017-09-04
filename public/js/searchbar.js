$(document).ready(function() {
  $('select').material_select();
  $('#searchtags').material_chip();
  $("#bookmark-tags").material_chip({
      secondaryPlaceholder: '엔터로 태그추가',
      placeholder: '태그 추가',
  });
  $('.modal').modal(
    {
    // ready: function(modal, trigger) {
    //   if($('#userid').val() != ''){
    //     alert('로그인 해주세요..');
    //     location.href = 'login.html';
    //   }
    // }
  }
);

  // TODO 작업완료 후 주석풀기
  //Search();

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
    Search();
  });
});

function Search() {
  var data = $('#searchForm').serialize();
  data += '&tags=' + JSON.stringify($('#searchtags').material_chip('data'));
  console.log(data);

  var block = $('#bookmarkElement');

  $.ajax({
    url: './bookmarks',
    type: 'GET',
    data: data,
    success: function(result){
      // TODO 검색결과 삽입
      for (var bookmark in result) {
        if (object.hasOwnProperty(bookmark)) {
          var element = block.clone();
          element.find('#bookmarkTitle').html(bookmark.title);
          element.find('bookmarkWriter').html('(' + bookmark.userId + ')');
          element.find('#bookmarkUrl').attr('href', bookmark.url);
          element.find('#bookmarkUrl').html(bookmark.url);
          element.find('#bookmarkId').val(bookmark.id);

          var tags = bookmark.tags;
          var tagString = '';
          for (var tag in tags) {
            if (object.hasOwnProperty(tag)) {
              var appendString = '<div class="chip" tagid="' + tag.id + '">' + tag.content;
              if(tag.userId == $('userid').val()){
                appendString += '<i class="close material-icons">close</i>';
              }
              appendString += '</div>';

              tagString += appendString;
            }
          }
          element.find('#searchtags').html(tagString);

          element.find('#recommandCount').html(bookmark.recCount);
          if(bookmark.recBool){
            target.toggleClass('grey-text lignten-2');
            target.toggleClass('red-text');
          }
        }
      }

      // TODO chips inital 호출하기..
    },
    error: function(xhr, status){
      alert('error occurred!!');
    }
  });
}
