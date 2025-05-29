function loginStudent() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "student1" && pass === "student123") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadOutpasses();
    alert("Login successful");
  } else {
    alert("Invalid Credentials");
  }
}

function submitRequest() {
  const request = {
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    studentNo: document.getElementById("studentNo").value,
    branch: document.getElementById("branch").value,
    year: document.getElementById("year").value,
    college: document.getElementById("college").value,
    parentPhone: document.getElementById("parentPhone").value,
    dateOut: document.getElementById("dateOut").value,
    dateIn: document.getElementById("dateIn").value,
    reason: document.getElementById("reason").value,
    status: "Pending"
  };

  let data = JSON.parse(localStorage.getItem("outpasses")) || [];
  data.push(request);
  localStorage.setItem("outpasses", JSON.stringify(data));
  alert("Request created successfully");
  loadOutpasses();
}

function loadOutpasses() {
  const container = document.getElementById("previousOutpasses");
  container.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("outpasses")) || [];
  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "outpass-row";
    row.innerHTML = `
      <span><b>Name:</b> ${item.name}</span>
      <span><b>Roll:</b> ${item.roll}</span>
      <span><b>Phone:</b> ${item.parentPhone}</span>
      <span><b>Out:</b> ${item.dateOut}</span>
      <span><b>In:</b> ${item.dateIn}</span>
      <span><b>Status:</b> ${item.status}</span>
      <button onclick="downloadPDF(${index})">Download PDF</button>
    `;
    container.appendChild(row);
  });
}

function downloadPDF(index) {
  const item = JSON.parse(localStorage.getItem("outpasses"))[index];
  const content = `
    Outpass
    ----------------------
    Name: ${item.name}
    Roll: ${item.roll}
    Branch: ${item.branch}
    Year: ${item.year}
    College: ${item.college}
    Parent Phone: ${item.parentPhone}
    Out Date: ${item.dateOut}
    In Date: ${item.dateIn}
    Reason: ${item.reason}
    Status: ${item.status}
  `;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Outpass_${item.name}_${item.roll}.txt`;
  a.click();
}

function resetOutpasses() {
  if (confirm("Clear all your outpasses?")) {
    localStorage.removeItem("outpasses");
    loadOutpasses();
    alert("Reset done");
  }
}

function logout() {
  location.reload();
}

function searchOutpasses() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const all = document.querySelectorAll(".outpass-row");
  all.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(keyword) ? "flex" : "none";
  });
}
