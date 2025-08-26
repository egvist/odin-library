const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


function displayBooks() {
  const table = document.getElementById("table");

  table.querySelectorAll("tr:not(:first-child)").forEach((tr) => tr.remove());

  const fragment = document.createDocumentFragment();

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = book.name;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = book.author;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.textContent = book.pages;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.innerHTML = `<span class="badge ${book.read ? 'badge-read' : 'badge-unread'}">${book.read ? "Read" : "Unread"}</span>`;
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    const td5toggleBtn = document.createElement("button");
    td5toggleBtn.setAttribute("class", "secondary-btn fixed-btn");
    td5toggleBtn.textContent = book.read ? "Change to Unread" : "Change to Read";
    td5toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });
    td5.appendChild(td5toggleBtn);
    tr.appendChild(td5);


    const td6 = document.createElement("td");
    const td6removeBtn = document.createElement("div");
    td6removeBtn.setAttribute("class", "trash");
    td6removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path></svg>`;
    td6removeBtn.setAttribute("id", book.id);
    td6removeBtn.addEventListener("click", () => removeBook(book.id));
    td6.appendChild(td6removeBtn);
    tr.appendChild(td6);



    fragment.appendChild(tr);
  });

  table.appendChild(fragment);
}

displayBooks();


function removeBook(id) {

  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1); 
  }

  displayBooks(); 
}

const btnNewBook = document.getElementById("btnNewBook");
const container = document.querySelector(".container");


btnNewBook.addEventListener("click", () => {
  container.classList.add("show");
});


container.addEventListener("click", (e) => {
  if (e.target === container) {
    container.classList.remove("show");
  }
});

const closeBookModal = document.getElementById("closeBookModal");
closeBookModal.addEventListener("click", cancelFormHandler);


function cancelFormHandler() {
  container.classList.remove("show");
}

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", addBookHandler);

function addBookHandler(e) {
  e.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPages = document.getElementById("bookPages").value;
  const bookRead = document.getElementById("bookRead").checked;

  addBookToLibrary(new Book(bookName, bookAuthor, bookPages, bookRead));

  displayBooks();
  bookForm.reset();
  container.classList.remove("show");
}