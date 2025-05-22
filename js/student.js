const loginPage = document.getElementById("login-page");
const dashboard = document.getElementById("dashboard");
const loginMsg = document.getElementById("login-msg");

function studentLogin() {
  const user = document.getElementById("student-username").value;
  const pass = document.getElementById("student-password").value;

  if (user === "student1" && pass === "student123") {
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadOutpasses();
  } else {
    loginMsg.textContent = "Invalid credentials!";
  }
}

function logoutStudent() {
  dashboard.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("student-username").value = "";
  document.getElementById("student-password").value = "";
}

document.getElementById("outpass-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    studentNo: document.getElementById("studentNo").value,
    branch: document.getElementById("branch").value,
    year: document.getElementById("year").value,
    college: document.getElementById("college").value,
    parent: document.getElementById("parent").value,
    dateOut: document.getElementById("dateOut").value,
    dateIn: document.getElementById("dateIn").value,
    region: document.getElementById("region").value,
    status: "Pending"
  };

  let list = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  list.push(data);
  localStorage.setItem("studentOutpasses", JSON.stringify(list));

  alert("Outpass request submitted!");
  this.reset();
  loadOutpasses();
});

function loadOutpasses() {
  const container = document.getElementById("outpass-list");
  container.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("studentOutpasses")) || [];

  list.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "outpass-row";

    row.innerHTML = `
      ${item.name} | ${item.roll} | ${item.parent} | ${item.dateIn} to ${item.dateOut} | ${item.status}
      <button onclick="downloadPDF(${index})">Download</button>
    `;

    container.appendChild(row);
  });
}

function downloadPDF(index) {
  const list = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  const item = list[index];
  const content = `
    Outpass PDF\n
    Name: ${item.name}\n
    Roll: ${item.roll}\n
    College: ${item.college}\n
    Branch: ${item.branch}\n
    Year: ${item.year}\n
    Parent No: ${item.parent}\n
    From: ${item.dateOut} To: ${item.dateIn}\n
    Region: ${item.region}\n
    Status: ${item.status}
  `;

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Outpass_${item.roll}.txt`;
  link.click();
}

function resetOutpasses() {
  localStorage.removeItem("studentOutpasses");
  alert("Outpasses reset.");
  loadOutpasses();
}
function renderPreviousOutpasses() {
  const list = document.getElementById("previous-requests");
  list.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("studentOutpasses")) || [];

  data.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "request-row";
    row.innerHTML = `
      <p>${entry.name}</p>
      <p>${entry.roll}</p>
      <p>${entry.parent}</p>
      <p>${entry.dateOut}</p>
      <p>${entry.dateIn}</p>
      <p>${entry.status}</p>
      <button onclick="generatePDF(${index})">Download PDF</button>
    `;
    list.appendChild(row);
  });
}

function generatePDF(index) {
  const data = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  const d = data[index];

  const content = `
    Name: ${d.name}
    Roll No: ${d.roll}
    Student No: ${d.number}
    Branch: ${d.branch}
    Year: ${d.year}
    College: ${d.college}
    Parent Phone: ${d.parent}
    Out Date: ${d.dateOut}
    In Date: ${d.dateIn}
    Reason: ${d.reason}
    Status: ${d.status}
  `;

  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Outpass_${d.roll}.pdf`;
  link.click();
}
