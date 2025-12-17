document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            validateForm();
        });
    }

    function validateForm() {
        let isValid = true;

        // Name validation
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Registration Number validation: <two numbers><3 capital characters><4 numbers>
        const regNoInput = document.getElementById('regNo');
        const regNoError = document.getElementById('regNoError');
        const regNoRegex = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regNoRegex.test(regNoInput.value.trim())) {
            regNoError.textContent = 'Invalid Registration Number format (e.g., 23ABC1234).';
            isValid = false;
        } else {
            regNoError.textContent = '';
        }

        // College Email validation
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Phone Number validation: 10 digits
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Invalid phone number (10 digits required).';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        if (isValid) {
            alert('Registration Successful!');
            // Here you would typically send the form data to a server
            form.reset(); // Clear the form
        } else {
            alert('Please correct the errors in the form.');
        }
    }
});