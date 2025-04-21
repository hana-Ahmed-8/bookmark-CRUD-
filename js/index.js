var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

var bookmarks = [];


if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var i = 0; i < bookmarks.length; i++) {
    displayBookmark(i);
  }
}


function displayBookmark(index) {
  var bookmark = bookmarks[index];


  var validURL = bookmark.siteURL.startsWith("http") 
    ? bookmark.siteURL 
    : "https://" + bookmark.siteURL;


  var row = document.createElement("tr");
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${bookmark.siteName}</td>              
    <td><button class="btn btn-visit" data-index="${index}">
    <i class="fa-solid fa-eye pe-2"></i>
    Visit</button></td>
    <td><button class="btn btn-delete" data-index="${index}">
    <i class="fa-solid fa-trash-can"></i>
    Delete</button></td>
  `;
  tableContent.appendChild(row);
}


function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}


function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


submitBtn.addEventListener("click", function () {
  if (siteName.value && siteURL.value) {
    var newBookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };

    bookmarks.push(newBookmark); 
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    
    displayBookmark(bookmarks.length - 1); 
    clearInput();
  } else {
    boxModal.classList.remove("d-none"); 
  }
});


tableContent.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
    var index = event.target.dataset.index;
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    tableContent.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
      displayBookmark(i);
    }
  }
});


tableContent.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-visit")) {
    var index = event.target.dataset.index;
    var url = bookmarks[index].siteURL.startsWith("http") 
      ? bookmarks[index].siteURL 
      : "https://" + bookmarks[index].siteURL;
    window.open(url, "_blank");
  }
});


function closeModal() {
  boxModal.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) closeModal();
});
