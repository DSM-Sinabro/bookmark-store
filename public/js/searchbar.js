$(document).ready(function() {
  $('select').material_select();
  $('.chips').material_chip();
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
