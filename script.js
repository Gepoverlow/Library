"use strict";

function getStorageData() {
  return JSON.parse(localStorage.getItem("myLibrary") || "[]");
}

let myLibrary = getStorageData();

function deleteBook() {
  for (let i = 0; i < myLibrary.length; i++) {
    let bookUI = document.getElementById(`${myLibrary[i].id}`);
    let closeButton = bookUI.childNodes[4];
    closeButton.addEventListener("click", function () {
      let indexOfId = myLibrary
        .map(function (e) {
          return e.id;
        })
        .indexOf(bookUI.id);

      myLibrary.splice(indexOfId, 1);
      bookContainer.removeChild(bookUI);
      addToLocalStorage(myLibrary);
    });
    addToLocalStorage(myLibrary);
  }
}

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

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = isRead;
    this.id = createId();
  }
}

function addBookToLibrary(a) {
  myLibrary.push(a);
}

function addBookToContainer(addedBook) {
  let book = document.createElement("div");
  let titleB = document.createElement("h1");
  let authorB = document.createElement("h2");
  let pagesB = document.createElement("p");
  let readB = document.createElement("button");
  let closeBook = document.createElement("button");

  book.classList.add("book");
  closeBook.classList.add("closeBook");
  book.setAttribute("id", `${addedBook.id}`);
  bookContainer.appendChild(book);
  book.appendChild(titleB);
  book.appendChild(authorB);
  book.appendChild(pagesB);
  book.appendChild(readB);
  book.appendChild(closeBook);

  closeBook.textContent = "Delete Book";
  titleB.textContent = addedBook.title;
  authorB.textContent = `by ${addedBook.author}`;
  pagesB.textContent = `${addedBook.pages} pages`;
  readB.textContent = `${addedBook.read ? "Read" : "Not Read"}`;

  if (addedBook.read === true) {
    readB.classList.add("readButton");
  } else if (addedBook.read === false) {
    readB.classList.add("notReadButton");
  }

  readB.addEventListener("click", function () {
    let className = readB.getAttribute("class");
    if (className === "readButton") {
      readB.className = "notReadButton";
      readB.textContent = "Not Read";
      addedBook.read = false;
    } else if (className === "notReadButton") {
      readB.className = "readButton";
      readB.textContent = "Read";
      addedBook.read = true;
    }
    addToLocalStorage(myLibrary);
  });
}

function addToLocalStorage(arr) {
  localStorage.setItem("myLibrary", JSON.stringify(arr));
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
const popUpForm = document.getElementById("popUpForm");

addButton.addEventListener("click", function () {
  popUp.style.display = "flex";
});

closePopUp.addEventListener("click", function () {
  popUp.style.display = "none";
  title.value = "";
  author.value = "";
  pages.value = "";
});

submit.addEventListener("click", function () {
  if (popUpForm.checkValidity()) {
    let theTitle = title.value;
    let theAuthor = author.value;
    let thePages = pages.value;
    let theRead = isRead.checked;

    const book = new Book(theTitle, theAuthor, thePages, theRead);
    addBookToLibrary(book);
    bookContainer.innerHTML = "";
    myLibrary.forEach(addBookToContainer);

    title.value = "";
    author.value = "";
    pages.value = "";

    deleteBook();
  }
});

window.addEventListener("load", function () {
  myLibrary.forEach(addBookToContainer);

  deleteBook();
});

// Like this project tweaking
