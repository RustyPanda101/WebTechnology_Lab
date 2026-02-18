let xmlDoc;

document.addEventListener("DOMContentLoaded", loadBooks);

function loadBooks() {
    fetch("books.xml")
        .then(res => res.text())
        .then(data => {
            xmlDoc = new DOMParser().parseFromString(data, "text/xml");
            renderBooks();
        });
}

function renderBooks() {
    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        const id = book.getElementsByTagName("id")[0].textContent;
        const title = book.getElementsByTagName("title")[0].textContent;
        const author = book.getElementsByTagName("author")[0].textContent;
        const status = book.getElementsByTagName("status")[0].textContent;

        table.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td><button onclick="deleteBook('${id}')">Delete</button></td>
            </tr>
        `;
    }
}

function addBook() {
    const book = xmlDoc.createElement("book");
    book.innerHTML = `
        <id>${bookId.value}</id>
        <title>${bookTitle.value}</title>
        <author>${bookAuthor.value}</author>
        <status>Available</status>
    `;
    xmlDoc.getElementsByTagName("library")[0].appendChild(book);
    renderBooks();
}

function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.remove();
        }
    }
    renderBooks();
}
