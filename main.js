let contacts = [];

const savedData = localStorage.getItem("contacts");

if (savedData) {
  const contactArray = savedData.split("|");

  contactArray.forEach(item => {
    const [name, email, phone, dob] = item.split(",");
    contacts.push({ name, email, phone, dob });
  });
}

const contactTable = document
  .getElementById("contactTable")
  .getElementsByTagName("tbody")[0];

document.getElementById("addContact").addEventListener("click", addContact);

function saveToLocalStorage() {
  let dataString = contacts
    .map(contact => 
      `${contact.name},${contact.email},${contact.phone},${contact.dob}`
    )
    .join("|");

  localStorage.setItem("contacts", dataString);
}

function addContact() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;

  if (name && email && phone && dob) {
    contacts.push({ name, email, phone, dob });

    saveToLocalStorage();
    renderContacts();
    clearInputFields();
  } else {
    alert("Please fill in all fields");
  }
}

function renderContacts() {
  contactTable.innerHTML = "";

  contacts.forEach((contact, index) => {
    const row = contactTable.insertRow();
    row.insertCell(0).innerText = contact.name;
    row.insertCell(1).innerText = contact.email;
    row.insertCell(2).innerText = contact.phone;
    row.insertCell(3).innerText = contact.dob;

    const actionsCell = row.insertCell(4);
    actionsCell.innerHTML = `
      <button onclick="editContact(${index})">Edit</button>
      <button onclick="deleteContact(${index}))">Delete</button>
    `;
  });
}

function editContact(index) {
  const contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("dob").value = contact.dob;

  contacts.splice(index, 1);
  saveToLocalStorage();
  renderContacts();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveToLocalStorage();
  renderContacts();
}

function clearInputFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("dob").value = "";
}

window.onload = function () {
  renderContacts();
};