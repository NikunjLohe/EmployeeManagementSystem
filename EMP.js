let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = null;

const form = document.getElementById("Employee-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const tableBody = document.querySelector("#Employee-table tbody");


function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderTable() {
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td class="action-btns">
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editEmployee(index) {
  const emp = employees[index];
  nameInput.value = emp.name;
  emailInput.value = emp.email;
  roleInput.value = emp.role;
  editIndex = index;
  form.querySelector("button").innerHTML = "Update Employee";
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleInput.value.trim();

  if (!name || !email || !role) return;

  const employeeData = { name, email, role };

  if (editIndex === null) {
    employees.push(employeeData);
  } else {
    employees[editIndex] = employeeData;
    editIndex = null;
    form.querySelector("button").innerHTML = "Add Employee";
  }

  saveToLocalStorage();   
  form.reset();
  location.reload();      
});

window.onload = function () {
  renderTable();
  getName();
};
