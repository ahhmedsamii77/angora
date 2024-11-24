var inputName = document.querySelector("#siteName");
var inputURL = document.querySelector("#siteUrl");
var arrOfWebsites = [];
if (localStorage.getItem("wesites") != null) {
  arrOfWebsites = JSON.parse(localStorage.getItem("wesites"));
  displayWebsites(arrOfWebsites);
}
var submit = document.querySelector(".submit");
document.querySelector(".submit").addEventListener("click", function (e) {
  e.preventDefault();
  if (checkregex()) {
    var website = {
      name: inputName.value,
      URL: inputURL.value,
    };
     if(arrOfWebsites.length!=0){
      for(var i =0;i<arrOfWebsites.length;i++){
        if(!(arrOfWebsites[i].name.toLowerCase().includes(website.name.toLowerCase()))){
          arrOfWebsites.push(website);  
        }
       }
     }else{
     arrOfWebsites.push(website);

     }
    displayWebsites(arrOfWebsites);
    restInputs();
    localStorage.setItem("wesites", JSON.stringify(arrOfWebsites));
    document.querySelector(".myModel").classList.add("d-none");
    inputName.classList.remove("is-valid");
    inputURL.classList.remove("is-valid");
  } else {
    document.querySelector(".myModel").classList.remove("d-none");
  }
});
function displayWebsites(websites) {
  var container = "";
  for (var i = 0; i < websites.length; i++) {
    container += `
             <tr>
              <td>${i + 1}</td>
              <td>${websites[i].name}</td>
              <td><a href="${
                websites[i].URL
              }" class="btn visit btn-info text-white   " target="_blank"><span class="pe-2"><i class="fa-solid fa-eye"></i></span>Visit</a></td>
              <td><button onclick="deleteWebsite(${
                websites.oldIndex != undefined ? websites.oldIndex : i
              })" href="" class="btn delete btn-danger  " target="_blank"><span class="pe-2"><i class="fa-solid fa-trash"></i></span>Delete</button></td>
              <td><button onclick=setInputsToUpdates(${
                websites.oldIndex != undefined ? websites.oldIndex : i
              }) class="btn bg-primary update text-white "><span class="pe-2"><i class="fa-solid fa-pen-to-square"></i></span>Update</button></td>
            </tr>
       `;
  }
  document.querySelector("tbody").innerHTML = container;
}
function restInputs() {
  inputName.value = "";
  inputURL.value = "";
}
function deleteWebsite(index) {
  arrOfWebsites.splice(index, 1);
  displayWebsites(arrOfWebsites);
  localStorage.setItem("wesites", JSON.stringify(arrOfWebsites));
}

var indexOfSite;
function setInputsToUpdates(index) {
  indexOfSite = index;
  inputName.value = arrOfWebsites[index].name;
  inputURL.value = arrOfWebsites[index].URL;
  document.querySelector(".updateBtn").classList.remove("d-none");
  document.querySelector(".submit").classList.add("d-none");
}
function updatewebsite() {
  document.querySelector(".updateBtn").classList.add("d-none");
  document.querySelector(".submit").classList.remove("d-none");
  if(checkregex()){
    arrOfWebsites[indexOfSite].name = inputName.value;
    arrOfWebsites[indexOfSite].URL = inputURL.value;
    restInputs();
    displayWebsites(arrOfWebsites);
    localStorage.setItem("wesites", JSON.stringify(arrOfWebsites));
    inputName.classList.remove("is-valid");
    inputURL.classList.remove("is-valid");
  }

}
document.querySelector(".updateBtn").addEventListener("click", function (e) {
  e.preventDefault();
  updatewebsite();
});

document.querySelector("#search").addEventListener("input", function (e) {
  var term = e.target.value;
  var searchdSites = [];
  for (var i = 0; i < arrOfWebsites.length; i++) {
    if (arrOfWebsites[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchdSites.push(arrOfWebsites[i]);
      searchdSites.oldIndex = i;
    }
  }
  displayWebsites(searchdSites);
});

var regexNameOfSite = /^[A-Z][a-z]{3,}$/i;
var regexURL = /^(ftp|http|https):\/\/w{3}.[a-z]{4,}.com$/;

function doRegex(inputElement, regex) {
  if (regex.test(inputElement.value)) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    inputElement.nextElementSibling.classList.add("d-none");
  } else {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    inputElement.nextElementSibling.classList.remove("d-none");
  }
}
function checkregex(){
  if(regexNameOfSite.test(inputName.value)&&regexURL.test(inputURL.value)){
            return true;
  }else{
    return false;
  }
}
inputName.addEventListener("change", function (e) {
  doRegex(e.target, regexNameOfSite);
});
inputURL.addEventListener("change", function (e) {
  doRegex(e.target, regexURL);
});
document.querySelector(".fa-xmark").addEventListener("click", function () {
  document.querySelector(".myModel").classList.add("d-none");
});
