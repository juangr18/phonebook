const URL_API = "http://localhost:4000/api/book/";
const URL_API_LIST = "http://localhost:4000/api/book/list";
const URL_API_LIMIT = "http://localhost:4000/api/book/limit";
const URL_API_AVAILABLE = "http://localhost:4000/api/book/available";

const URL_API_REGISTER = "http://localhost:4000/api/book/register";
const URL_API_UPDATE = "http://localhost:4000/api/book/update";
const URL_API_DELETE = "http://localhost:4000/api/book/delete";

const getLimit = (api) => {
  return fetch(api)
    .then((res) => res.json())
    .then((json) => {
      alert(json.message);
    })
    .catch((e) => console.log("Error in the api: \n", e));
};

const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      printData(json.books);
    })
    .catch((e) => {
      console.log("Error consume api: \n", e);
    });
};

const printData = (api) => {
  let html = "";
  html += `<table class="table table-dark table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Phone number</th>
      <th scope="col">cell number</th>
      <th scope="col">Options</th>
    </tr>
  </thead>
  <tbody>
  `;
  let c = 0;
  api.map((book) => {
    c++;
    html += `
      <tr>
        <th scope="row">${c}</th>
        <td>${book.name}</td>
        <td>${book.phoneNumber}</td>
        <td>${book.cellNumber}</td>
        <td>${book.dateRegister}</td>
      </tr>
    `;
  });

  html += `</tbody>
  </table>`;
  document.getElementById("content").innerHTML = html;
};

getData(URL_API_LIST);

let availableButton = document.getElementById("availableButton");
let limitButton = document.getElementById("limitButton");
let registerButton = document.getElementById("registerButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let search = document.getElementById("search");
let btnSearch = document.getElementById("btnSearch");

limitButton.onclick = () => {
  getLimit(URL_API_LIMIT);
};
availableButton.onclick = () => {
  getLimit(URL_API_AVAILABLE);
};

registerButton.onclick = async () => {
  let name = prompt("Ingrese el nombre del contacto");
  let phoneNum = prompt("Ingrese el telefóno del contacto");
  let cellNum = prompt("Ingrese el celular del contacto");
  let jsonData = { name: name, phoneNumber: phoneNum, cellNumber: cellNum };
  return await fetch(URL_API_REGISTER, {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((response) => alert(response.message))
    .catch((error) => console.error("Error: ", error.message));
};

updateButton.onclick = async () => {
  let name = prompt("Ingrese el nombre del contacto");
  let phoneNum = prompt("Ingrese el telefóno del contacto");
  let cellNum = prompt("Ingrese el celular del contacto");
  let jsonData = { name: name, phoneNumber: phoneNum, cellNumber: cellNum };
  return await fetch(URL_API_UPDATE, {
    method: "PUT",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((response) => alert(response.message))
    .catch((error) => console.error("Error: ", error.message));
};

deleteButton.onclick = async () => {
  let name = prompt("Ingrese el nombre del contacto");
  let jsonData = { name: name };
  return await fetch(URL_API_DELETE, {
    method: "DELETE",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((response) => alert(response.message))
    .catch((error) => console.error("Error: ", error.message));
};

const filterName = async (api, name) => {
  return await fetch(api + "/" + name)
    .then((res) => res.json())
    .then((json) => printData(json.books))
    .catch((e) => console.log(e));
};

btnSearch.onclick = () => {
  let name = document.getElementById("search").value;
  filterName(URL_API_LIST, name);
};
