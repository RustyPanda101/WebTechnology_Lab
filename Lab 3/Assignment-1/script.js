// 1. Dynamic Validation Rules Configuration
const validationRules = {
    Student: { minAge: 16, minPassLength: 6, requireSpecialChar: false },
    Teacher: { minAge: 21, minPassLength: 8, requireSpecialChar: true },
    Admin: { minAge: 18, minPassLength: 12, requireSpecialChar: true }
};

const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');

// 2. DOM Manipulation: Show/Hide fields based on Role
roleSelect.addEventListener('change', () => {
    const skillsContainer = document.getElementById('skillsContainer');
    // Hide skills for Admin, show for others
    if (roleSelect.value === 'Admin') {
        skillsContainer.classList.add('hidden');
    } else {
        skillsContainer.classList.remove('hidden');
    }
    // Re-validate everything when role changes
    validateForm();
});

// 3. Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['gmail.com', 'outlook.com', 'edu.in'];
    const domain = email.split('@')[1];
    return re.test(email) && allowedDomains.includes(domain);
}

function validatePassword(pass, rules) {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (pass.length < rules.minPassLength) return false;
    if (rules.requireSpecialChar && !hasSpecialChar) return false;
    return true;
}

// 4. Feedback Management
function setFeedback(inputId, errorId, isValid, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);

    if (isValid) {
        input.classList.remove('invalid');
        errorSpan.textContent = '';
    } else {
        input.classList.add('invalid');
        errorSpan.textContent = message;
    }
}

// 5. Main Validation Runner
function validateForm() {
    const role = roleSelect.value;
    const rules = validationRules[role];
    let isFormValid = true;

    // Name Validation
    const name = document.getElementById('name').value;
    setFeedback('name', 'nameError', name.length > 2, "Name too short");
    if (name.length <= 2) isFormValid = false;

    // Email Validation
    const email = document.getElementById('email').value;
    const emailValid = validateEmail(email);
    setFeedback('email', 'emailError', emailValid, "Enter a valid email (e.g., @gmail.com)");
    if (!emailValid) isFormValid = false;

    // Age Validation
    const age = document.getElementById('age').value;
    const ageValid = age >= rules.minAge;
    setFeedback('age', 'ageError', ageValid, `Min age for ${role} is ${rules.minAge}`);
    if (!ageValid) isFormValid = false;

    // Password Strength
    const pass = document.getElementById('password').value;
    const passValid = validatePassword(pass, rules);
    setFeedback('password', 'passwordError', passValid, `Password must be ${rules.minPassLength} chars ${rules.requireSpecialChar ? 'with special char' : ''}`);
    if (!passValid) isFormValid = false;

    // Confirm Password
    const confirmPass = document.getElementById('confirmPassword').value;
    const match = pass === confirmPass && confirmPass !== '';
    setFeedback('confirmPassword', 'confirmError', match, "Passwords do not match");
    if (!match) isFormValid = false;

    return isFormValid;
}

// 6. Real-time validation on input
form.addEventListener('input', validateForm);

// 7. Prevent Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Registration Successful for ' + roleSelect.value + '!');
        form.reset();
    } else {
        alert('Please fix errors before submitting.');
    }
});