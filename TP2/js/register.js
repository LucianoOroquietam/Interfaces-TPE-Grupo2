document.querySelector('#btnRegister').addEventListener('click',realizarLogin);

function realizarLogin(e){
    e.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector('#password');
    const name = document.querySelector('#name');
    const lastname = document.querySelector('#lastname');
    const age = document.querySelector('#age');
    const username = document.querySelector('#username');
    const passwordRepeat = document.querySelector('#password-repeat');
    const errorEmail = document.querySelector("#email_error")
    const errorPassword = document.querySelector("#password_error")
    const captchaCheckbox = document.querySelector('#captcha-checkbox');
    const errorCaptcha = document.querySelector("#captcha_error");
    const errorName = document.querySelector("#name_error");
    const errorLastname = document.querySelector("#lastname_error");
    const errorAge = document.querySelector("#age_error");
    const errorUserName = document.querySelector("#username_error");
    const errorPasswordRepeat = document.querySelector("#password-repeat_error")
    if(!validarEmail(email.value) || password.value === ""){
        if(validarEmail(email.value)){
           
            errorEmail.classList.add('ocultar');
        }else{
            errorEmail.classList.remove('ocultar');
        }
        if(password.value === "" ){
            errorPassword.classList.remove('ocultar')
        }else{
            errorPassword.classList.add('ocultar')
        }
        if(name.value === "" ){
            errorName.classList.remove('ocultar')
        }else{
            errorName.classList.add('ocultar')
        }
        if(lastname.value === "" ){
            errorLastname.classList.remove('ocultar')
        }else{
            errorLastname.classList.add('ocultar')
        }
        if(age.value === "" ){
            errorAge.classList.remove('ocultar')
        }else{
            errorAge.classList.add('ocultar')
        }
        if(username.value === "" ){
            errorUserName.classList.remove('ocultar')
        }else{
            errorUserName.classList.add('ocultar')
        }
        if(passwordRepeat.value === "" ){
            errorPasswordRepeat.classList.remove('ocultar')
        }else{
            errorPasswordRepeat.classList.add('ocultar')
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
