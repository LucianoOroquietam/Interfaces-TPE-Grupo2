document.querySelector('#btnLogin').addEventListener('click',realizarLogin);

function realizarLogin(e){
    e.preventDefault();
    const email = document.querySelector("#email");
    const pass = document.querySelector('#password');
    const errorEmail = document.querySelector("#email_error")
    const errorPass = document.querySelector("#password_error")
    const captchaCheckbox = document.querySelector('#captcha-checkbox');
    const errorCaptcha = document.querySelector("#captcha_error");
    if(!validarEmail(email.value) || pass.value === ""){
        if(validarEmail(email.value)){
           
            errorEmail.classList.add('ocultar');
        }else{
            errorEmail.classList.remove('ocultar');
        }
        if(pass.value === "" ){
            errorPass.classList.remove('ocultar')
        }else{
            errorPass.classList.add('ocultar')
        }
        if (!captchaCheckbox.checked) {
            errorCaptcha.classList.remove('ocultar');
        } else {
            errorCaptcha.classList.add('ocultar');
        }
    }else{
       
            window.location.href = "../index.html";
    }
}

function validarEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return regex.test(email);
}
