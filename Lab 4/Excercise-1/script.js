const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let isAvailable = false;

usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    if (!username) return;

    feedback.textContent = "Checking...";
    
    fetch("users.json")
        .then(res => res.json())
        .then(data => {
            if (data.usernames.includes(username)) {
                feedback.textContent = "Username already taken";
                feedback.style.color = "red";
                isAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.style.color = "green";
                isAvailable = true;
            }
        })
        .catch(() => {
            feedback.textContent = "Error checking username";
        });
});

form.addEventListener("submit", (e) => {
    if (!isAvailable) {
        e.preventDefault();
        alert("Username unavailable!");
    }
});
