`use strict`

function renderBooks() {
    var strHTML = '';
    var books = gBooks;
    books.map(function (book) {
        strHTML += `<tr class="row${book.id}">
        <th scope="row" class ="book-row-id">${book.id}</th>
        <td class ="book-name">${book.name}</td>
        <td class ="book-author">${book.author}</td>
        <td class ="book-price">${book.price}$</td>
        <td class ="book-actions"><div class="action-buttons">
        <button type="button" onclick="onButtonInfo(this); updateModal(this)" data-name="${book.name}" class="book-btn btn btn-success btn-info"  data-toggle="modal" data-target="#infoModal">info / Update</button>
        <button type="button" onclick="onButtonDelete(this)" data-name="${book.name}" class="book-btn btn btn-danger btn-delete">Delete</button>
      </div></td>
      </tr>`
    })
    $('.add-books').html(strHTML);
}

function updateModal(item) {
    var book = getBook(item);
    bookObj = book[0];
    $('.modal-title').html(`
    <button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editTitle()">&#128393</button>
    <span class="remove-title">${bookObj.name}</span>
    <input type="text" id="book-title" class="title hidden" placeholder="${bookObj.name}">
    </input>`)
    $('.author').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editAuthor()">&#128393</button><span class="font-weight-bold"> Author:</span><span class="remove-author"> ${bookObj.author}</span><input type="text" id="book-author" class="author-input hidden" placeholder="${bookObj.author}"></input>`)
    $('.price').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editPrice()">&#128393</button><span class="font-weight-bold">price:</span><span class="remove-price">${bookObj.price}$</span><input type="text" id="book-price" class="price-input hidden " placeholder="${bookObj.price}"></input>`)
    $('.photo').html(`<img src="img/${bookObj.photo()}">`)
    $('.desc').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editDesc()">&#128393</button><span class="font-weight-bold">Short description:</span><span class="remove-desc"> ${bookObj.description}</span><input type="text" id="book-desc" class="desc-input hidden" placeholder="${bookObj.description}"></input>`)
}
function editTitle() {
    var item = bookObj.name;
    var title = document.querySelector('.title');
    $('.remove-title').html('');
    title.classList.remove('hidden')
    console.log(item);
}
function editAuthor() {
    var item = bookObj.name;
    var author = document.querySelector('.author-input');
    console.log(author);
    $('.remove-author').html('');
    author.classList.remove('hidden')
    console.log(item);
}
function editPrice() {
    var item = bookObj.price;
    var price = document.querySelector('.price-input');
    console.log(price);
    $('.remove-price').html('');
    price.classList.remove('hidden')
    console.log(item);
}

function editDesc() {
    var item = bookObj.description;
    var desc = document.querySelector('.desc-input');
    console.log(desc);
    $('.remove-desc').html('');
    desc.classList.remove('hidden')
    console.log(item);
}
function onSaveChanges() {
    console.log(bookObj);
    if ($('#book-title').val()) {
        bookObj.name = $('#book-title').val();
        console.log('changed name:', bookObj.name);
    }
    if ($('#book-author').val()) {
        bookObj.author = $('#book-author').val();
        console.log('changed author:', bookObj.author);
    }
    if ($('#book-price').val()) {
        bookObj.price = $('#book-price').val();
        console.log('changed price:', bookObj.price);
    }
    if ($('#book-desc').val()) {
        bookObj.description = $('#book-desc').val();
        console.log('changed desc:', bookObj.description);
    }
    if (bookObj.photo) {
        bookObj.photo = bookObj.photo;
        console.log('changed desc:', bookObj.photo);
    }
    console.log('book obj:', bookObj);
    // debugger;
    gBooks.push(bookObj);
    renderBooks()
    $('#infoModal').hide();
    $('.modal-backdrop').hide();

}

function onAddBook() {
    bookObj = {
        id: BOOK_ID++,
        name: 'Add book title',
        photo: function () {
            return this.name.split(' ').join('_') + '.jpg';
        },
        description: 'Insert short description',
        author: 'Add book author',
        price: 'Add book price'
    };
    // $('#newBookModal').show();
    $('.modal-title').html(`
    <input type="text" id="book-title" class="title" placeholder="${bookObj.name}"></input>`)
    $('.author').html(`<input type="text" id="book-author" class="author-input" placeholder="${bookObj.author}"></input>`)
    $('.price').html(`<input type="number" id="book-price" class="price-input " placeholder="${bookObj.price}"></input>`)
    // $('.photo').html(`<img src="img/${bookObj.photo()}">`)
    $('.desc').html(`<input type="text" id="book-desc" class="desc-input" placeholder="${bookObj.description}"></input>`)

}
