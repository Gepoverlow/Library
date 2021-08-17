"use strict";

let myLibrary = [];

function createId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const length = 5;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
  this.id = createId();
}

Book.prototype.toggleRead = function (button) {};

function addBookToLibrary(a) {
  myLibrary.push(a);
}

function addBookToContainer(myLibrary) {
  let book = document.createElement("div");
  let titleB = document.createElement("h1");
  let authorB = document.createElement("h2");
  let pagesB = document.createElement("p");
  let readB = document.createElement("button");
  let closeBook = document.createElement("button");
  bookContainer.appendChild(book);
  book.classList.add("book");
  closeBook.classList.add("closeBook");
  book.appendChild(titleB);
  book.appendChild(authorB);
  book.appendChild(pagesB);
  book.appendChild(readB);
  book.appendChild(closeBook);
  closeBook.textContent = "Delete Book";
  titleB.textContent = myLibrary.title;
  authorB.textContent = `by ${myLibrary.author}`;
  pagesB.textContent = `${myLibrary.pages} pages`;
  readB.textContent = `${myLibrary.read ? "Read" : "Not Read"}`;
  console.log(myLibrary.read);
  if (myLibrary.read === true) {
    readB.classList.add("readButton");
  } else if (myLibrary.read === false) {
    readB.classList.add("notReadButton");
  }
  readB.addEventListener("click", function () {
    let className = readB.getAttribute("class");
    if (className === "readButton") {
      readB.className = "notReadButton";
      readB.textContent = "Not Read";
      myLibrary.read = false;
    } else if (className === "notReadButton") {
      readB.className = "readButton";
      readB.textContent = "Read";
      myLibrary.read = true;
    }
    console.log(myLibrary);
  });
  console.log(myLibrary);
}

const addButton = document.querySelector(".add-button");
const popUp = document.getElementById("popUp");
const closePopUp = document.getElementById("close");
const submit = document.getElementById("submit");
const title = document.getElementById("titleI");
const author = document.getElementById("authorI");
const pages = document.getElementById("pagesI");
const isRead = document.getElementById("isReadI");
const bookContainer = document.querySelector(".book-container");

addButton.addEventListener("click", function () {
  popUp.classList.remove("hidden");
});

closePopUp.addEventListener("click", function () {
  popUp.classList.add("hidden");
  title.value = "";
  author.value = "";
  pages.value = "";
});

submit.addEventListener("click", function () {
  let theTitle = title.value;
  let theAuthor = author.value;
  let thePages = pages.value;
  let theRead = isRead.checked;
  const book = new Book(theTitle, theAuthor, thePages, theRead);
  addBookToLibrary(book);
  bookContainer.innerHTML = "";
  myLibrary.forEach(addBookToContainer);
  const bookNode = document.querySelectorAll(".book");
  title.value = "";
  author.value = "";
  pages.value = "";
  let closeUI = document.querySelectorAll(".closeBook");
  let closeArray = Array.from(closeUI);
  for (let i = 0; i < myLibrary.length; i++) {
    let closeButton = closeArray[i];
    closeButton.addEventListener("click", function () {
      let libraryIndex = myLibrary.indexOf(myLibrary[i]);
      myLibrary.splice(libraryIndex, 1);
      bookContainer.removeChild(bookNode[i]);
    });
  }
});
