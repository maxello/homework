'use strict';

var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

var emailCorrectness = false;
var passwordCorrectness = false;
var phoneNumberCorrectness = true;
var checkboxCorrectness = false;

(function checkEmail(){
    var regExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
    var emailInput = document.querySelector('#email');
    var errorMessage = createErrorNode(emailInput);
    var timeout;
    emailInput.addEventListener('keyup', function(){
        clearTimeout(timeout);
        errorMessage.style.display = 'none';
        timeout = setTimeout(function(){
            if(usedEmails.some(function(element){
                    return element === emailInput.value;
                })) {
                errorMessage.style.display = 'block';
                errorMessage.innerText = "Такой e-mail уже существует";
                emailCorrectness = false;
            }
            else if(!(regExp.test(emailInput.value)) && emailInput.value !== ""){
                errorMessage.style.display = 'block';
                errorMessage.innerText = "Неверный ввод";
                emailCorrectness = false;
            }
            else if (emailInput.value === "") {
                errorMessage.style.display = 'block';
                errorMessage.innerText = "Поле не заполнено";
                emailCorrectness = false;
            }
            else {
                emailCorrectness = true;
            }
            enableOrDesableSubmit(emailCorrectness);
        }, 1500);
    }, false);
})();

(function checkPassword(){
    var passwordInput = document.querySelector('#password');
    var regExp = /^[-0-9a-zA-Z_]{5,}$/;
    var errorMessage = createErrorNode(passwordInput);
    var timeout;
    passwordInput.addEventListener('keyup', function(){
        clearTimeout(timeout);
        errorMessage.style.display = 'none';
        timeout = setTimeout(function(){
            if(!(regExp.test(passwordInput.value)) && passwordInput.value !== ""){
                errorMessage.style.display = 'block';
                passwordCorrectness = false;
                if(passwordInput.value.length < 5){
                    errorMessage.innerText = "Пароль меньше 5 символов";
                }
                else {
                    errorMessage.innerText = "В пароле присутствуют недопустимые символы";
                }
            }
            else if(passwordInput.value === ""){
                errorMessage.style.display = 'block';
                errorMessage.innerText = "Поле не заполнено";
                passwordCorrectness = false;
            }
            else {
                passwordCorrectness = true;
            }
            enableOrDesableSubmit(passwordCorrectness);
        }, 1500);
    }, false);
})();

(function checkPhoneNumber(){
    var phoneNumberInput = document.querySelector('#phone');
    var regExp =/^\+?\d\(?[0-9]{3}\)?\-?\d{3}\-?\d{2}\-?\d{2}$/;
    var errorMessage = createErrorNode(phoneNumberInput);
    var timeout;
    phoneNumberInput.addEventListener('keyup', function(){
        clearTimeout(timeout);
        errorMessage.style.display = 'none';
        timeout = setTimeout(function(){
            if(!(regExp.test(phoneNumberInput.value)) && phoneNumberInput.value !== ""){
                errorMessage.style.display = 'block';
                errorMessage.innerText = "Международный формат записи телефона не выдержан";
                phoneNumberCorrectness = false;
            }
            else {
                phoneNumberCorrectness = true;
            }
            enableOrDesableSubmit(phoneNumberCorrectness);
        }, 1500);
    }, false);
}());

function createErrorNode(previousNode){
    var errorMessageNode = document.createElement('div');
    errorMessageNode.className = 'alert alert-danger';
    insertAfter(errorMessageNode, previousNode);
    errorMessageNode.style.display = 'none';
    return errorMessageNode;
}

function insertAfter(elem, refElem) {
    var parent = refElem.parentNode;
    var next = refElem.nextSibling;
    if (next) {
        return parent.insertBefore(elem, next);
    } else {
        return parent.appendChild(elem);
    }
}

(function checkCheckbox(){
    var checkboxInput = document.querySelector('#checkbox');
    checkboxInput.addEventListener('change', function() {
        if (checkboxInput.checked) {
            checkboxCorrectness = true;
            enableOrDesableSubmit(checkboxCorrectness);
        }
        else {
            checkboxCorrectness = false;
            enableOrDesableSubmit(checkboxCorrectness);
        }
    }, false);
}());

function enableOrDesableSubmit() {
    var button = document.querySelector('.btn');
    if (emailCorrectness && passwordCorrectness && phoneNumberCorrectness && checkboxCorrectness) {
        button.classList.remove('disabled');
    }
    else {
        button.classList.add("disabled");
    }
}
