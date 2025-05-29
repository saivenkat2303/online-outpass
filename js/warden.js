function loginWarden() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "warden1" && pass === "warden123") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadOutpasses();
    alert("Login successful");
  } else {
    alert("Invalid Credentials");
  }
}

function loadOutpasses() {
  const data = JSON.parse(localStorage.getItem("outpasses")) || [];

  let pending = '', approved = '', rejected = '';

  data.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.roll}</td>
        <td>${item.dateOut}</td>
        <td>${item.dateIn}</td>
        <td>${item.reason}</td>
        ${item.status === "Pending" ? `
          <td>
            <button onclick="approveOutpass(${index})">Approve</button>
            <button onclick="rejectOutpass(${index})">Reject</button>
          </td>` : `<td>${item.status}</td>`}
      </tr>`;

    if (item.status === "Pending") {
      pending += row;
    } else if (item.status === "Approved") {
      approved += row;
    } else {
      rejected += row;
    }
  });

  document.getElementById("pendingTable").innerHTML = makeTable("Pending", pending);
  document.getElementById("approvedTable").innerHTML = makeTable("Approved", approved);
  document.getElementById("rejectedTable").innerHTML = makeTable("Rejected", rejected);
}

function makeTable(title, rows) {
  return `
    <table>
      <tr>
        <th>Name</th>
        <th>Roll</th>
        <th>Out</th>
        <th>In</th>
        <th>Reason</th>
        <th>Action</th>
      </tr>
      ${rows || '<tr><td colspan="6">No records</td></tr>'}
    </table>`;
}

function approveOutpass(index) {
  if (confirm("Had you called their parents?")) {
    let data = JSON.parse(localStorage.getItem("outpasses"));
    data[index].status = "Approved";
    localStorage.setItem("outpasses", JSON.stringify(data));
    loadOutpasses();
  }
}

function rejectOutpass(index) {
  let data = JSON.parse(localStorage.getItem("outpasses"));
  data[index].status = "Rejected";
  localStorage.setItem("outpasses", JSON.stringify(data));
  loadOutpasses();
}

function logout() {
  location.reload();
}

function resetOutpasses() {
  if (confirm("Delete all outpass data?")) {
    localStorage.removeItem("outpasses");
    loadOutpasses();
  }
}

function searchOutpasses() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const tables = document.querySelectorAll("table");
  tables.forEach(table => {
    const rows = table.querySelectorAll("tr:not(:first-child)");
    rows.forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(keyword) ? "" : "none";
    });
  });
}
