/**
 * Requirement 1 & 6: Data Storage and State Management
 */
let currentStage = 1;
const formData = {}; // Temporary storage for user input

const stages = document.querySelectorAll('.stage');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');

/**
 * Requirement 2 & 5: Navigation & Strict Validation
 */
nextBtn.addEventListener('click', () => {
    if (validateCurrentStage()) {
        saveData(); // Requirement 6
        currentStage++;
        updateUI();
    }
});

prevBtn.addEventListener('click', () => {
    currentStage--;
    updateUI();
});

function validateCurrentStage() {
    let isValid = false;
    const err = document.getElementById(`err${currentStage}`);
    
    // Requirement 1: Different validation rules per stage
    switch(currentStage) {
        case 1:
            const user = document.getElementById('username').value;
            isValid = user.length >= 5;
            err.textContent = isValid ? "" : "Username must be at least 5 chars.";
            break;
        case 2:
            const phone = document.getElementById('phone').value;
            isValid = /^\d{10}$/.test(phone);
            err.textContent = isValid ? "" : "Enter a valid 10-digit phone number.";
            break;
        case 3:
            const role = document.getElementById('jobRole').value;
            isValid = role.trim() !== "";
            err.textContent = isValid ? "" : "Role cannot be empty.";
            break;
        case 4:
            const agree = document.getElementById('agreement').value;
            isValid = agree === "I AGREE";
            err.textContent = isValid ? "" : "You must type I AGREE.";
            break;
    }
    return isValid;
}

/**
 * Requirement 4: DOM Manipulation to show/hide stages
 */
function updateUI() {
    // Toggle Active Class
    stages.forEach((s, index) => {
        s.classList.toggle('active', index === (currentStage - 1));
    });

    // Update Progress Bar (Requirement 3)
    const progressPercent = (currentStage / 4) * 100;
    progressBar.style.width = `${progressPercent}%`;
    document.getElementById('stageIndicator').textContent = `Stage ${currentStage} of 4`;

    // Handle Button Visibility
    prevBtn.style.visibility = (currentStage === 1) ? 'hidden' : 'visible';
    
    if (currentStage === 4) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

/**
 * Requirement 6: Temporary Storage logic
 */
function saveData() {
    if (currentStage === 1) formData.username = document.getElementById('username').value;
    if (currentStage === 2) formData.phone = document.getElementById('phone').value;
    if (currentStage === 3) formData.jobRole = document.getElementById('jobRole').value;
}

document.getElementById('workflowForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateCurrentStage()) {
        formData.agreement = document.getElementById('agreement').value;
        alert("Final Data Stored: " + JSON.stringify(formData));
        console.log("Process Complete", formData);
    }
});