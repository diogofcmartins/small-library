const myLibrary = [];
const htmlBooksWrapper = document.querySelector('#books-cards-wrapper');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function getBooks() {
  myLibrary.map(book => {
    return book;
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function handleRemoveButton() {
  const deleteButtons = document.querySelectorAll('.delete-book');


  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      removeBook(index);
    })
  });
}

function toggleReadButton() {
    let toggleButton = document.querySelectorAll("input.switch ");

    toggleButton.forEach(button => {
        button.addEventListener("click", (event) => {
            const bookIndex = event.currentTarget.getAttribute("data-index");
            myLibrary[bookIndex].toggleRead();
            displayBooks();
        } )
    })
}


function displayBooks() {
  htmlBooksWrapper.innerHTML = "";

  myLibrary.map((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', index);

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <div class="book-desc">
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p class="read-status"><strong>Read status:</strong> ${book.read ? 'Yes' : 'No'}
          <label class="switch">
            <input type="checkbox" class="switch" data-index="${index}" ${book.read ? 'checked' : ''}>
            <span class="slider round"></span>
          </label>
        </p>
      </div>
      <button data-index="${index}" class="delete-book">
      </button>
    `

    htmlBooksWrapper.appendChild(bookCard);
  });

  handleRemoveButton();
  toggleReadButton();
}

addBookToLibrary('Rich Dad Poor Dad', 'Robert Kiyosaki',336, true);
addBookToLibrary('The Psychology of Money', 'Morgan Houssel',256, false);

displayBooks();

document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("popupOverlay");
  const addBookBtn = document.getElementById("add-book");
  const form = document.getElementById("add-book-form");

  addBookBtn.addEventListener("click", function () {
      popupOverlay.style.display = "flex";
  });


  popupOverlay.addEventListener("click", function (event) {
      if (event.target === popupOverlay) {
          popupOverlay.style.display = "none";
      }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = form.querySelector("input[id='book-title']").value;
    const author = form.querySelector("input[id='book-author']").value;
    const pages = form.querySelector("input[id='book-pages']").value;
    const readed = form.querySelector("input[id='book-status']").value;

    addBookToLibrary(title, author,pages, readed);
    displayBooks();
    popupOverlay.style.display = "none";
    form.reset();
});
});
