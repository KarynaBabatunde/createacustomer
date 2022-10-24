const customerInput = document.querySelector(".customer-input");
const customerButton = document.querySelector("#customer-button");
const customerList = document.querySelector(".customer-list");

document.addEventListener("DOMContentLoaded", getLocalCustomers);
customerButton.addEventListener("click", addCustomer);

function addCustomer(event) {
  event.preventDefault();
  const addDiv = document.createElement("div");
  addDiv.classList.add("customer");
  const newCustomer = document.createElement("li");
  newCustomer.innerText = customerInput.value;
  newCustomer.classList.add("customer-item");
  addDiv.appendChild(newCustomer);
  saveLocalCustomers(customerInput.value);

  customerList.appendChild(addDiv);
  customerInput.value = "";
}

function saveLocalCustomers(customer) {
  let customers;
  if (localStorage.getItem("customers") === null) {
    customers = [];
  } else {
    customers = JSON.parse(localStorage.getItem("customers"));
  }
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));
}

function getLocalCustomers() {
  let customers;
  if (localStorage.getItem("customers") === null) {
    customers = [];
  } else {
    customers = JSON.parse(localStorage.getItem("customers"));
  }
  customers.forEach(function (customer) {
    const addDiv = document.createElement("div");
    addDiv.classList.add("customer");
    const newCustomer = document.createElement("li");
    newCustomer.innerText = customer;
    newCustomer.classList.add("customer-item");
    addDiv.appendChild(newCustomer);

    customerList.appendChild(addDiv);
    addDiv.addEventListener("click", function () {
      customerList.removeChild(addDiv);
    });
    removeLocalCustomers(customer);
    customer.addEventListener("delete", function () {
      customer.remove();
    });
  });
}

function removeLocalCustomers(customer) {
  let customers;
  if (localStorage.getItem("customers") === null) {
    customers = [];
  } else {
    customers = JSON.parse(localStorage.getItem("customers"));
  }

  const customerIndex = customer.children[0].innerText;
  customers.splice(customers.indexOf(customerIndex), 1);
  localStorage.setItem("customers", JSON.stringify(customers));
}
