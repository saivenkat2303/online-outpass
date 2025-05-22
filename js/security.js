const loginBox = document.getElementById("security-login");
const dashboard = document.getElementById("security-dashboard");
const recordList = document.getElementById("security-records");
const msg = document.getElementById("sec-msg");

function securityLogin() {
  const u = document.getElementById("sec-user").value;
  const p = document.getElementById("sec-pass").value;

  if (u === "security1" && p === "security123") {
    loginBox.classList.add("hidden");
    dashboard.classList.remove("hidden");
    showRecords();
  } else {
    msg.textContent = "Invalid credentials!";
  }
}

function logoutSecurity() {
  dashboard.classList.add("hidden");
  loginBox.classList.remove("hidden");
  document.getElementById("sec-user").value = "";
  document.getElementById("sec-pass").value = "";
}

function showRecords() {
  recordList.innerHTML = "";
  const outpasses = JSON.parse(localStorage.getItem("studentOutpasses")) || [];

  outpasses.forEach((item, i) => {
    if (item.status === "Approved") {
      const row = document.createElement("div");
      row.className = "record-row";
      row.innerHTML = `
        <p><strong>Name:</strong> ${item.name} | <strong>Roll:</strong> ${item.roll}</p>
        <p><strong>Out Time:</strong> ${item.outTime || "Not marked"} | <strong>In Time:</strong> ${item.inTime || "Not marked"}</p>
        <div class="action-buttons">
          <button onclick="markOut(${i})">Mark Out</button>
          <button onclick="markIn(${i})">Mark In</button>
        </div>
      `;
      recordList.appendChild(row);
    }
  });
}

function markOut(index) {
  const outpasses = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  outpasses[index].outTime = new Date().toLocaleTimeString();
  localStorage.setItem("studentOutpasses", JSON.stringify(outpasses));
  showRecords();
}

function markIn(index) {
  const outpasses = JSON.parse(localStorage.getItem("studentOutpasses")) || [];
  outpasses[index].inTime = new Date().toLocaleTimeString();
  localStorage.setItem("studentOutpasses", JSON.stringify(outpasses));
  showRecords();
}

function resetSecurity() {
  localStorage.removeItem("studentOutpasses");
  alert("Outpasses reset.");
  showRecords();
}
