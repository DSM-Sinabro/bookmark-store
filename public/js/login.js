$(document).ready(function(){
    $('#btn-login').click(function(){
      $.ajax({
          url: '/users/login',
          type: 'post',
          data: $('form').serialize(),
          success: function (result) {
              Response.sendRedirect("main.html");
          }
      });
    });
})
