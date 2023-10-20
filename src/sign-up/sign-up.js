const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const fathersNameInput = document.getElementById('father');
const genderInputs = document.getElementsByName('gender');
const dateInput = document.getElementById('date');
const groupInput = document.getElementById('group');
const phoneNumberInput = document.getElementById('phone');
const deleteSelectedButton = document.getElementById('delete')
const duplicateSelectedButton = document.getElementById('duplicate')

const signUpButton = document.getElementById('sign-up');
const tableBody = document.getElementById('table-body');


const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0];
dateInput.setAttribute('max', maxDate);


const maskOptions = {
    mask: '+{38}(\\000)000-00-00', lazy: false
};
const mask = applyPhoneMask();

function applyPhoneMask() {
    return IMask(phoneNumberInput, maskOptions);
}


const tableColumns = ['email', 'password', 'name', 'surname', 'fathersName', 'gender', 'dateOfBirth', 'group', 'phoneNumber'];
let users = [];
let usersId = 1;


nameInput.addEventListener('input', function () {
    isInitialsValid(nameInput.value, document.getElementById('nameError'));
});
surnameInput.addEventListener('input', function () {
    isInitialsValid(surnameInput.value, document.getElementById('surnameError'));
});
fathersNameInput.addEventListener('input', function () {
    isInitialsValid(fathersNameInput.value, document.getElementById('fathersNameError'));
});
genderInputs.forEach(input => {
    input.addEventListener('change', isGenderValid);
});
emailInput.addEventListener('input', isEmailValid);
passwordInput.addEventListener('input', isPasswordValid);
groupInput.addEventListener('change', isGroupValid);
phoneNumberInput.addEventListener('input', isPhoneNumberValid);
signUpButton.addEventListener('click', addUser);
deleteSelectedButton.addEventListener('click', deleteSelected)
duplicateSelectedButton.addEventListener('click', duplicateSelected)


function addUser(event) {
    event.preventDefault();
    if (!isUserValid()) return;
    resetTableBody();
    const genderInput = document.querySelector('input[name="gender"]:checked');

    const user = {
        id: usersId++,
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value,
        surname: surnameInput.value,
        fathersName: fathersNameInput.value,
        gender: genderInput.value,
        dateOfBirth: dateInput.value,
        group: groupInput.value,
        phoneNumber: phoneNumberInput.value
    };
    users.push(user);
    createUsers();
    resetFormInputs();
}

function deleteSelected() {
    const checkboxes = document.querySelectorAll('input[name="user-checkbox"]:checked');
    const selectedUserIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

    users = users.filter(user => !selectedUserIds.includes(user.id));

    resetTableBody();
    createUsers();
}

function duplicateSelected() {
    const checkboxes = document.querySelectorAll('input[name="user-checkbox"]:checked');
    const selectedUserIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

    users.filter(user => selectedUserIds.includes(user.id))
        .map(user => {
            users.push({...user, id: usersId++});
        });
    resetTableBody();
    createUsers();
}

function deleteOne(user) {
    users = users.filter(user1 => user1.id !== user.id);
    resetTableBody();
    createUsers();
}

function duplicateOne(user) {
    users.push({...user, id: usersId++});
    resetTableBody();
    createUsers();
}

function createUsers() {
    users.forEach(user => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = user.id;
        checkbox.name = 'user-checkbox';
        checkbox.classList.add('me-auto');

        const deleteButton = document.createElement('button');
        deleteButton.name = 'delete';
        deleteButton.value = user.id;
        deleteButton.classList.add('btn');
        deleteButton.innerHTML = '<svg height="1em" style="fill: #ff0000" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
        deleteButton.addEventListener('click', function () {
            deleteOne(user);
        });
        deleteButton.addEventListener('click', deleteSelected);

        const duplicateButton = document.createElement('button');
        duplicateButton.name = 'duplicate';
        duplicateButton.value = user.id;
        duplicateButton.classList.add('btn');
        duplicateButton.innerHTML = '<svg height="1em" style="fill: #005eff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"/></svg>';
        duplicateButton.addEventListener('click', function () {
            duplicateOne(user);
        });
        duplicateButton.addEventListener('click', duplicateSelected);

        const checkboxButtons = document.createElement('span');
        checkboxButtons.appendChild(deleteButton);
        checkboxButtons.appendChild(duplicateButton);

        const checkboxCell = document.createElement('td');
        checkboxCell.classList.add('d-flex', 'align-items-center', 'justify-content-start');
        checkboxCell.appendChild(checkbox);
        checkboxCell.appendChild(checkboxButtons);

        const row = document.createElement('tr');
        row.appendChild(checkboxCell);

        tableColumns.forEach(propertyName => {
            const cell = document.createElement('td');
            cell.textContent = user[propertyName];
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

function resetTableBody() {
    tableBody.innerHTML = '';
}

function resetFormInputs() {
    emailInput.value = '';
    passwordInput.value = '';
    nameInput.value = '';
    surnameInput.value = '';
    fathersNameInput.value = '';
    genderInputs.forEach(input => {
        input['checked'] = false;
    });
    dateInput.value = '';
    groupInput.value = '';
    phoneNumberInput.value = '';
    applyPhoneMask();
}

function isUserValid() {
    return isEmailValid() && isPasswordValid() &&
        isInitialsValid(nameInput.value, document.getElementById('nameError')) &&
        isInitialsValid(surnameInput.value, document.getElementById('surnameError')) &&
        isInitialsValid(fathersNameInput.value, document.getElementById('fathersNameError')) &&
        isGenderValid() && isGroupValid() && isPhoneNumberValid();
}

function isEmailValid() {
    if (/^[a-zA-Z0-9_.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(emailInput.value)) {
        document.getElementById('emailError').textContent = '';
        return true;
    } else {
        document.getElementById('emailError').textContent = 'Invalid email';
        return false;
    }
}

function isPasswordValid() {
    const error = document.getElementById('passwordError');
    if (!/^.{8,}$/.test(passwordInput.value)) {
        error.textContent = 'Must contain at least 8 symbols';
        return false;
    } else if (!/^(?=.*[a-z])/.test(passwordInput.value)) {
        error.textContent = 'Must contain at least one lower case letter';
        return false;
    } else if (!/^(?=.*[A-Z])/.test(passwordInput.value)) {
        error.textContent = 'Must contain at least one upper case letter';
        return false;
    } else if (!/^(?=.*\d)/.test(passwordInput.value)) {
        error.textContent = 'Must contain at least one digit';
    } else {
        error.textContent = '';
        return true;
    }
}

function isInitialsValid(initialValue, errorMessage) {
    if (!/^[a-zA-Z]+$/.test(initialValue)) {
        errorMessage.textContent = 'Must contain only letters';
        return false;
    }
    errorMessage.textContent = '';
    return true;
}

function isGenderValid() {
    if (!Array.from(genderInputs).some(input => input.checked)) {
        document.getElementById('genderError').textContent = 'Choose your gender';
        return false;
    }
    document.getElementById('genderError').textContent = '';
    return true;
}

function isGroupValid() {
    if (groupInput.value === '') {
        document.getElementById('groupError').textContent = 'Choose your group';
        return false;
    }
    document.getElementById('groupError').textContent = '';
    return true;
}

function isPhoneNumberValid() {
    if (phoneNumberInput.value.includes('_')) {
        document.getElementById('phoneError').textContent = 'Phone number is invalid';
        return false;
    }
    document.getElementById('phoneError').textContent = '';
    return true;
}