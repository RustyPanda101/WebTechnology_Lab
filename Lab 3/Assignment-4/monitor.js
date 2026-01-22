/**
 * Requirement 2: Array of activity objects
 */
let activityLog = [];
let clickCounter = 0;
let lastClickTime = Date.now();

const logDisplay = document.getElementById('logDisplay');
const captureZone = document.getElementById('captureZone');
const warningZone = document.getElementById('suspiciousMsg');

/**
 * Requirement 1 & 3: Tracking events using Bubbling
 * We attach listeners to the parent (captureZone) to catch events from children
 */

// Tracking Clicks
captureZone.addEventListener('click', (e) => {
    logActivity('CLICK', `Element: ${e.target.tagName} (ID: ${e.target.id || 'none'})`);
    checkSuspiciousClicks();
}, false); // 'false' indicates bubbling phase

// Tracking Key Presses
captureZone.addEventListener('keyup', (e) => {
    logActivity('KEYPRESS', `Key: ${e.key}`);
});

// Tracking Focus (Requirement 1: Focus events)
// Focus doesn't bubble by default, so we use 'true' for Capturing phase
captureZone.addEventListener('focus', (e) => {
    logActivity('FOCUS', `Target: ${e.target.tagName}`);
}, true); 

/**
 * Logic to Log and Display
 */
function logActivity(type, detail) {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        detail: detail
    };

    activityLog.push(entry);
    updateDisplay(entry);
}

function updateDisplay(entry) {
    const div = document.createElement('div');
    div.className = 'event-entry';
    div.innerHTML = `[${entry.timestamp}] <strong>${entry.type}</strong>: ${entry.detail}`;
    
    // Add to top of log
    logDisplay.prepend(div);
}

/**
 * Requirement 5: Thresholds for suspicious activity
 * Detects "Rapid Clicking" (More than 5 clicks in 2 seconds)
 */
function checkSuspiciousClicks() {
    const now = Date.now();
    if (now - lastClickTime < 2000) {
        clickCounter++;
    } else {
        clickCounter = 1; // Reset if gap is long enough
    }
    lastClickTime = now;

    if (clickCounter > 5) {
        warningZone.textContent = "⚠️ WARNING: SUSPICIOUS ACTIVITY DETECTED (Rapid Clicking)";
        logActivity('ALERT', 'Threshold exceeded: Rapid Clicking');
    }
}

/**
 * Requirement 6: Reset and Export
 */
function resetLogs() {
    activityLog = [];
    logDisplay.innerHTML = "";
    warningZone.textContent = "";
    clickCounter = 0;
    console.clear();
}

function exportLogs() {
    if (activityLog.length === 0) {
        alert("Log is empty!");
        return;
    }

    let textContent = "USER ACTIVITY REPORT\n====================\n";
    activityLog.forEach(log => {
        textContent += `[${log.timestamp}] ${log.type}: ${log.detail}\n`;
    });

    // Create a temporary download link
    const element = document.createElement('a');
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "activity_log.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}