const surveyConfig = [
    {
        id: "q1",
        label: "What is your full name?",
        type: "text",
        required: true,
        charLimit: 50
    },
    {
        id: "q2",
        label: "How did you hear about us?",
        type: "radio",
        options: ["Social Media", "Friend", "Advertisement", "Other"],
        required: true
    },
    {
        id: "q3",
        label: "Which features do you use? (Select at least 2)",
        type: "checkbox",
        options: ["Dashboard", "Analytics", "Cloud Storage", "API Access"],
        minSelection: 2
    }
];

const container = document.getElementById('survey-container');
const form = document.getElementById('dynamicSurvey');

function buildSurvey() {
    surveyConfig.forEach((q) => {
        const block = document.createElement('div');
        block.className = 'question-block';
        block.setAttribute('data-id', q.id);

        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = q.label + (q.required ? " *" : "");
        block.appendChild(label);

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `input-${q.id}`;
            input.placeholder = "Your answer here...";
            block.appendChild(input);
        } 
        else if (q.type === 'radio' || q.type === 'checkbox') {
            const group = document.createElement('div');
            group.className = 'options-group';
            
            q.options.forEach(opt => {
                const wrapper = document.createElement('label');
                const choice = document.createElement('input');
                choice.type = q.type;
                choice.name = q.id;
                choice.value = opt;
                
                wrapper.appendChild(choice);
                wrapper.append(` ${opt}`);
                group.appendChild(wrapper);
            });
            block.appendChild(group);
        }

        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-msg';
        errorSpan.id = `err-${q.id}`;
        block.appendChild(errorSpan);

        container.appendChild(block);
    });
}

function validateSurvey() {
    let isValid = true;

    surveyConfig.forEach(q => {
        const errorEl = document.getElementById(`err-${q.id}`);
        let errorMsg = "";

        if (q.type === 'text') {
            const val = document.getElementById(`input-${q.id}`).value.trim();
            if (q.required && val === "") {
                errorMsg = "This field is mandatory.";
            } else if (q.charLimit && val.length > q.charLimit) {
                errorMsg = `Cannot exceed ${q.charLimit} characters.`;
            }
        } 
        else if (q.type === 'radio') {
            const selected = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !selected) {
                errorMsg = "Please select an option.";
            }
        } 
        else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.minSelection && checkedCount < q.minSelection) {
                errorMsg = `Please select at least ${q.minSelection} options.`;
            }
        }

        if (errorMsg) {
            errorEl.textContent = errorMsg;
            isValid = false;
        } else {
            errorEl.textContent = "";
        }
    });

    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateSurvey()) {
        alert("Survey Submitted Successfully!");
        console.log("Data to send to server:", gatherData());
        form.reset();
    } else {
        console.log("Validation Failed");
    }
});

function gatherData() {
    const data = {};
    surveyConfig.forEach(q => {
        if (q.type === 'text') {
            data[q.id] = document.getElementById(`input-${q.id}`).value;
        } else if (q.type === 'radio') {
            const selected = document.querySelector(`input[name="${q.id}"]:checked`);
            data[q.id] = selected ? selected.value : null;
        } else if (q.type === 'checkbox') {
            const selected = Array.from(document.querySelectorAll(`input[name="${q.id}"]:checked`))
                                 .map(el => el.value);
            data[q.id] = selected;
        }
    });
    return data;
}

buildSurvey();