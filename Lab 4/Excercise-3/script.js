const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

const idInput = document.getElementById("id");
const nameInput = document.getElementById("name");
const deptInput = document.getElementById("dept");
const marksInput = document.getElementById("marks");

let students = [];

function renderTable() {
    table.innerHTML = "";

    students.forEach((s, index) => {
        table.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.dept}</td>
                <td>${s.marks}</td>
                <td>
                    <button onclick="deleteStudent(${index})">Delete</button>
                    <button onclick="editStudent(${index})">Edit</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        id: idInput.value,
        name: nameInput.value,
        dept: deptInput.value,
        marks: marksInput.value
    };

    students.push(student);
    renderTable();
    form.reset();
});

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
}

function editStudent(index) {
    const s = students[index];

    idInput.value = s.id;
    nameInput.value = s.name;
    deptInput.value = s.dept;
    marksInput.value = s.marks;

    deleteStudent(index);
}
