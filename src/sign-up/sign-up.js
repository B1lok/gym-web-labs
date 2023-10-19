const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const fathersNameInput = document.getElementById('father')
const dateInput = document.getElementById('date')
const groupInput = document.getElementById('group')
const phoneNumberInput = document.getElementById('phone')
const signUpButton = document.getElementById('sign-up')
const deleteSelectedButton = document.getElementById('delete')
const duplicateSelectedButton = document.getElementById('duplicate')
const tableBody = document.getElementById('table-body')

let users = []
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
deleteSelectedButton.addEventListener('click', deleteAllSelected)
duplicateSelectedButton.addEventListener('click', duplicateAllSelected)

function addUser(event) {
    event.preventDefault()
    if (!isUserValid()) return
    resetTableBody()
    const genderInput = document.querySelector('input[name="gender"]:checked');

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
    createUsers()
    resetFormInputs()
}
function deleteAllSelected(){
    const checkboxes = document.querySelectorAll('input[name="user-checkbox"]:checked');

    const selectedUserIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

    users = users.filter(user => !selectedUserIds.includes(user.id));

    resetTableBody()
    createUsers()
}

function duplicateAllSelected(){
    const checkboxes = document.querySelectorAll('input[name="user-checkbox"]:checked');

    const selectedUserIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

    users.filter(user => selectedUserIds.includes(user.id))
        .map(user => {
            const newUser = {...user}
            newUser.id = usersId++
            users.push(newUser)
        })
    resetTableBody()
    createUsers()
}


function createUsers(){
    users.forEach(user => {
        const newRow = document.createElement('tr');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = user.id;
        checkbox.name = 'user-checkbox'
        const checkboxCell = document.createElement('td');
        checkboxCell.appendChild(checkbox);
        newRow.appendChild(checkboxCell);
        const cells = ['name', 'surname', 'fathersName', 'email', 'password', 'dateOfBirth', 'group', 'phoneNumber', 'gender'];
        cells.forEach(propertyName => {
            const cell = document.createElement('td');
            cell.textContent = user[propertyName];
            newRow.appendChild(cell);
        });
        tableBody.appendChild(newRow)
    })
}
function resetFormInputs() {
    emailInput.value = '';
    passwordInput.value = '';
    nameInput.value = '';
    surnameInput.value = '';
    fathersNameInput.value = '';
    dateInput.value = '';
    groupInput.value = '';
    phoneNumberInput.value = '';
}
function resetTableBody(){
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
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