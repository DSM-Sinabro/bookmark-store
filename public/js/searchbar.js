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
    target.toggleClass('grey-text lignten-2');
    target.toggleClass('red-text');
    if(target.hasClass('red-text')){
      var nextCount = parseInt(target.siblings('#recommandCount').html()) + 1;
      target.siblings('#recommandCount').html(nextCount);
    }else{
      var nextCount = parseInt(target.siblings('#recommandCount').html()) - 1;
      target.siblings('#recommandCount').html(nextCount);
    }
  })
});
