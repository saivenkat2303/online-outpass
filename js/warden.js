const loginPage = document.getElementById("login-page");
const dashboard = document.getElementById("dashboard");
const loginMsg = document.getElementById("login-msg");

function wardenLogin() {
  const user = document.getElementById("warden-username").value;
  const pass = document.getElementById("warden-password").value;

  if (user === "warden1" && pass === "warden123") {
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadOutpasses();
  } else {
    loginMsg.textContent = "Invalid credentials!";
  }
}

function logoutWarden() {
  dashboard.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("warden-username").value = "";
  document.getElementById("warden-password").value = "";
}

function loadOutpasses() {
  const container = document.getElementById("outpass-list");
  container.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("studentOutpasses")) || [];

  list.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "outpass-item";

    div.innerHTML = `
      <p><strong>Name:</strong> ${item.name} | <strong>Roll:</strong> ${item.roll}</p>
      <p><strong>Dates:</strong> ${item.dateOut} to ${item.dateIn}</p>
      <p><strong>Parent:</strong> ${item.parent} | <strong>Status:</strong> ${item.status}</p>
      <div class="action-buttons">
        <button onclick="updateStatus(${index}, 'Approved')">Approve</button>
        <button onclick="updateStatus(${index}, 'Rejected')">Reject</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function updateStatus(index, status) {
  let list = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  list[index].status = status;
  localStorage.setItem("studentOutpasses", JSON.stringify(list));
  loadOutpasses();
}

function resetOutpasses() {
  localStorage.removeItem("studentOutpasses");
  alert("Outpasses reset.");
  loadOutpasses();
}
