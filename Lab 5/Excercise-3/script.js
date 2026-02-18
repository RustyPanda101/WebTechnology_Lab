let students = [];

document.addEventListener("DOMContentLoaded", loadStudents);

function loadStudents() {
    fetch("students.json")
        .then(res => res.json())
        .then(data => {
            students = data;
            render();
        })
        .catch(() => alert("JSON error"));
}

function render() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((s, i) => {
        table.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td>${s.marks}</td>
                <td>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addStudent() {
    students.push({
        id: studId.value,
        name: studName.value,
        course: studCourse.value,
        marks: studMarks.value
    });
    render();
}

function deleteStudent(index) {
    students.splice(index, 1);
    render();
}
