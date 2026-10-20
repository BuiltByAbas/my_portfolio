const names = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("number");
const message = document.getElementById("message");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const successMessage = document.getElementById("success-message");

form.addEventListener('submit', e => {
    e.preventDefault();


    validateInputs();

    successMessage.innerText = "";

    if (validateInputs()) {
        successMessage.innerText = "Message sent successfully!🎉 You have officially made my inbox a little more interesting.😉💌";
        form.reset();

        document.querySelectorAll('.success').forEach(element => {
            element.classList.remove('success');
        });
    }
});

const setError = (element, messages) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = messages
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
};

const isValidphone = phone => {
    const pn = /^\+?[0-9\s()-]{10,20}$/;

    if (!pn.test(phone)) return false;

    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
};

const validateInputs = () => {
    const usernameValue = names.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    if (usernameValue === ''){
        setError(names, 'Name is required');
        isValid = false;
    } else {
        setSuccess(names);
    }

    if (emailValue === ''){
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email address');
        isValid = false;
    }
    else {
        setSuccess(email);
    }

    if (phoneValue === ''){
        setError(phone, 'Phone number is required');
        isValid = false;
    } else if (!isValidphone(phoneValue)){
        setError(phone, 'Provide a valid phone number ');
        isValid = false;
    }
    else {
        setSuccess(phone);
    }

    if (messageValue === ''){
        setError(message, 'Message is required');
        isValid = false;
    } else {
        setSuccess(message);
    }
    return isValid;
};
