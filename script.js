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

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = createId();
}

function addBookToLibrary(a) {
  myLibrary.push(a);
}

// function closeUi() {
//   const close = document.querySelector(".closeBook");
//   close.addEventListener("click", function () {
//     for (let i = 0; i < myLibrary.length; i++) {
//       myLibrary.pop();
//       console.log(myLibrary);
//     }
//   });
// }

function addBookToContainer(myLibrary) {
  let book = document.createElement("div");
  let closeBook = document.createElement("button");
  let titleB = document.createElement("h1");
  let authorB = document.createElement("p");
  let pagesB = document.createElement("p");
  bookContainer.appendChild(book);
  book.classList.add("book");
  closeBook.classList.add("closeBook");
  book.appendChild(closeBook);
  book.appendChild(titleB);
  book.appendChild(authorB);
  book.appendChild(pagesB);
  closeBook.textContent = "X";
  titleB.textContent = myLibrary.title;
  authorB.textContent = myLibrary.author;
  pagesB.textContent = `${myLibrary.pages} pages`;
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
const closeTemp = document.getElementById("closeTemp");

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
  let theRead = isRead.value;
  const book = new Book(theTitle, theAuthor, thePages);
  addBookToLibrary(book);
  bookContainer.innerHTML = "";
  myLibrary.forEach(addBookToContainer);
  title.value = "";
  author.value = "";
  pages.value = "";
  console.log(myLibrary);
  let closeUI = document.querySelectorAll(".closeBook");
  let closeArray = Array.from(closeUI);
  for (let i = 0; i < myLibrary.length; i++) {
    let closeButton = closeArray[i];
    closeButton.addEventListener("click", function () {
      console.log(`i am close ${i}`);
    });
  }
});
