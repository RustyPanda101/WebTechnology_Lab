let xmlDoc;

document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    fetch("employees.xml")
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, "text/xml");
            renderTable();
        })
        .catch(() => alert("Error loading XML"));
}

function renderTable() {
    const table = document.getElementById("empTable");
    table.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        const id = emp.getElementsByTagName("id")[0].textContent;
        const name = emp.getElementsByTagName("name")[0].textContent;
        const dept = emp.getElementsByTagName("department")[0].textContent;
        const salary = emp.getElementsByTagName("salary")[0].textContent;

        table.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td><button onclick="deleteEmployee('${id}')">Delete</button></td>
            </tr>
        `;
    }
}

function addEmployee() {
    const id = empId.value;
    if (!id) return alert("ID required");

    const emp = xmlDoc.createElement("employee");

    emp.innerHTML = `
        <id>${id}</id>
        <name>${empName.value}</name>
        <department>${empDept.value}</department>
        <salary>${empSalary.value}</salary>
    `;

    xmlDoc.getElementsByTagName("employees")[0].appendChild(emp);
    renderTable();
}

function updateEmployee() {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === empId.value) {
            emp.getElementsByTagName("department")[0].textContent = empDept.value;
            emp.getElementsByTagName("salary")[0].textContent = empSalary.value;
        }
    }
    renderTable();
}

function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            emp.remove();
        }
    }
    renderTable();
}
