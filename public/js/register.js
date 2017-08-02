function submit_chk(myForm){
    var reg1=/^([A-Za-z]{1,10}[0-9]{1,10}|[0-9]{1,10}[A-Za-z]{1,10})$/;
    var reg2=/^[A-Za-z|A-Za-z0-9]{1,16}@[A-Za-z|A-Za-z0-9]{1,16}\.(com|net)$/;
    var reg3=/^[A-Za-z|A-Za-z0-9]{1,16}$/;

    var id=myForm.user_id;
    var mail=myForm.user_mail;
    var pw=myForm.user_pw;
    var pw_confirm=myForm.user_pw_confirm;

    var result1=reg1.test(id.value);
    var result2=reg2.test(mail.value);
    var result3=reg3.test(pw.value);

    if(!result1){
        alert("아이디 형식이 잘못되었습니다.");
        id.value="";
        id.focus();
        return false;
    }else if(!result3){
        alert("비밀번호 형식이 잘못되었습니다.");
        pw.value="";
        pw.focus();
        return false;
    }else if(pw.value!=pw_confirm.value){
        alert("비밀번호 재확인이 잘못되었습니다.")
        pw_confirm.value="";
        pw_confirm.focus();
        return false;
    }else if(!result2){
        alert("이메일 형식이 잘못되었습니다.");
        mail.value="";
        mail.focus();
        return false;
    }
}