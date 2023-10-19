const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const fathersNameInput = document.getElementById('father')
const dateInput = document.getElementById('date')
const groupInput = document.getElementById('group')
const genderInput = document.querySelector('input[name="gender"]:checked')
const phoneNumberInput = document.getElementById('phone')
const signUpButton = document.getElementById('sign-up')
const tableBody = document.getElementById('table-body')

const users = []
let usersId = 1

const today = new Date();
const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];
document.getElementById('date').setAttribute("max", maxDate)


const element = document.getElementById('phone');
const maskOptions = {
    mask: '+{38}(\\000)000-00-00',
    lazy: false
};
const mask = IMask(element, maskOptions)

emailInput.addEventListener('input', isEmailCorrect)
passwordInput.addEventListener('input', isPasswordCorrect)
nameInput.addEventListener('input', function (){isInitialsCorrect(nameInput.value,document.getElementById('nameError'))})
surnameInput.addEventListener('input', function () {isInitialsCorrect(surnameInput.value,document.getElementById('surnameError'))})
fathersNameInput.addEventListener('input', function (){isInitialsCorrect(fathersNameInput.value, document.getElementById('fathersNameError'))})
groupInput.addEventListener('change', isGroupCorrect)
phoneNumberInput.addEventListener('input', isPhoneNumberCorrect)
signUpButton.addEventListener('click', addUser)
function addUser(event) {
    event.preventDefault()
    if (!isUserValid()) return
    const user = {
        id : usersId++,
        name : nameInput.value,
        surname: surnameInput.value,
        fathersName : fathersNameInput.value,
        email : emailInput.value,
        password : passwordInput.value,
        dateOfBirth: dateInput.value,
        group : groupInput.value,
        phoneNumber : phoneNumberInput.value,
        gender : genderInput.value
    }
    users.push(user)

}

function createUsers(){
    users.forEach(user => {

    })
}


function isUserValid(){
    const isEmailValid = isEmailCorrect();
    const isPasswordValid = isPasswordCorrect();
    const isPhoneValid = isPhoneNumberCorrect();
    const isGroupValid = isGroupCorrect();
    const isNameValid = isInitialsCorrect(nameInput.value, document.getElementById('nameError'));
    const isSurnameValid = isInitialsCorrect(surnameInput.value, document.getElementById('surnameError'));
    const isFathersNameValid = isInitialsCorrect(fathersNameInput.value, document.getElementById('fathersNameError'));

    return isEmailValid && isPasswordValid && isPhoneValid && isGroupValid && isNameValid && isSurnameValid && isFathersNameValid;
}



function isEmailCorrect() {
    if (/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(emailInput.value)) {
        document.getElementById('emailError').textContent = ""
        return true
    } else {
        document.getElementById('emailError').textContent = "Invalid email"
        return false
    }
}

function isPasswordCorrect(){
    const error = document.getElementById('passwordError')
    if (!/^[a-zA-Z0-9]{8,}$/.test(passwordInput.value)) {
        error.textContent = "Should contain at least 8 symbols"
        return false
    } else if (!/^(?=.*[A-Z])/.test(passwordInput.value)){
        error.textContent = "Should contain at least one upper case letter"
        return false
    } else if (!/^(?=.*[a-z])/.test(passwordInput.value)){
        error.textContent = "Should contain at least one lower case letter"
        return false
    } else if (!/^(?=.*\d)/.test(passwordInput.value)) {
        error.textContent = "Should contain at least one digit"
    } else {
        error.textContent = ""
        return true
    }
}

function isInitialsCorrect(initialValue, errorMessage){
    if (!/^[a-zA-Z]+$/.test(initialValue)){
        errorMessage.textContent = "Should contain only letters"
        return false
    }
    errorMessage.textContent = ""
    return true
}

function isGroupCorrect() {
    if (groupInput.value === "") {
        document.getElementById('groupError').textContent = "Choose your group"
        return false
    }
    document.getElementById('groupError').textContent = ""
    return true
}
function isPhoneNumberCorrect(){
    if (phoneNumberInput.value.charAt(phoneNumberInput.value.length-1) === '_') {
        document.getElementById('phoneError').textContent = "Phone number is invalid"
        return false
    }
    document.getElementById('phoneError').textContent = ""
    return true
}