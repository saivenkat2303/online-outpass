function loginSecurity() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "security1" && pass === "security123") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadApproved();
    alert("Login successful");
  } else {
    alert("Invalid Credentials");
  }
}

function loadApproved() {
  const data = JSON.parse(localStorage.getItem("outpasses")) || [];

  let approved = data
    .map((item, index) => {
      if (item.status === "Approved") {
        return `
        <tr>
          <td>${item.name}</td>
          <td>${item.roll}</td>
          <td>${item.dateOut}</td>
          <td>${item.dateIn}</td>
          <td>${item.reason}</td>
          <td>${item.outMarked ? item.outMarked : `<button onclick="markOut(${index})">Mark OUT</button>`}</td>
          <td>${item.inMarked ? item.inMarked : `<button onclick="markIn(${index})">Mark IN</button>`}</td>
        </tr>`;
      }
    })
    .filter(Boolean)
    .join('');

  document.getElementById("approvedTable").innerHTML = `
    <table>
      <tr>
        <th>Name</th>
        <th>Roll</th>
        <th>Out Date</th>
        <th>In Date</th>
        <th>Reason</th>
        <th>OUT</th>
        <th>IN</th>
      </tr>
      ${approved || '<tr><td colspan="7">No approved outpasses</td></tr>'}
    </table>`;
}

function markOut(index) {
  const data = JSON.parse(localStorage.getItem("outpasses"));
  const time = new Date().toLocaleString();
  data[index].outMarked = `OUT at ${time}`;
  localStorage.setItem("outpasses", JSON.stringify(data));
  loadApproved();
}

function markIn(index) {
  const data = JSON.parse(localStorage.getItem("outpasses"));
  const time = new Date().toLocaleString();
  data[index].inMarked = `IN at ${time}`;
  localStorage.setItem("outpasses", JSON.stringify(data));
  loadApproved();
}

function logout() {
  location.reload();
}

function searchOutpasses() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("table tr:not(:first-child)");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(keyword) ? "" : "none";
  });
}
