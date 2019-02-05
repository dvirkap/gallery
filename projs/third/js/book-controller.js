`use strict`

function renderBooks() {
    var strHTML = '';
    var books = gBooks;
    books.map(function (book) {
        strHTML += `<tr class="row${book.id}">
        <th scope="row" class ="book-row-id">${book.id}</th>
        <td class ="book-name">${book.name}</td>
        <td class ="book-author">${book.author}</td>
        <td class ="book-price">${formatNum(book.price)}</td>
        <td class ="book-actions"><div class="action-buttons">
        <button type="button" onclick="onButtonInfo(this); updateModal(this)" data-name="${book.name}" class="book-btn btn btn-success btn-info"  data-toggle="modal" data-target="#infoModal" data-trans="buttons-info">info / Update</button>
        <button type="button" onclick="onButtonDelete(this)" data-name="${book.name}" class="book-btn btn btn-danger btn-delete" data-trans="buttons-delete">Delete</button>
      </div></td>
      </tr>`
    })
    $('.add-books').html(strHTML);
}

function updateModal(item) {
    var book = getBook(item);
    var num = book.price
    bookObj = book[0];
    $('.modal-title').html(`
    <button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editTitle()">&#128393</button>
    <span class="remove-title">${bookObj.name}</span>
    <input type="text" id="book-title" class="title hidden" placeholder="${bookObj.name}">
    </input>`)
    $('.author').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editAuthor()">&#128393</button><span class="font-weight-bold" data-trans="update-author"> Author:</span><span class="remove-author"> ${bookObj.author}</span><input type="text" id="book-author" class="author-input hidden" placeholder="${bookObj.author}"></input>`)
    $('.price').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editPrice()">&#128393</button><span class="font-weight-bold" data-trans="update-price">price:</span><span class="remove-price">${bookObj.price}$</span><input type="text" id="book-price" class="price-input hidden " placeholder="${bookObj.price}"></input>`)
    $('.photo').html(`<img src="img/${bookObj.photo()}">`)
    $('.desc').html(`<button type="button" class="btn btn-outline-info btn-sm pencil-btn" onclick="editDesc()">&#128393</button><span class="font-weight-bold" data-trans="update-desc">Short description:</span><span class="remove-desc"> ${bookObj.description}</span><input type="text" id="book-desc" class="desc-input hidden" placeholder="${bookObj.description}"></input>`);
    doTrans()
}
function editTitle() {
    var item = bookObj.name;
    var title = document.querySelector('.title');
    $('.remove-title').html('');
    title.classList.remove('hidden')
}
function editAuthor() {
    var item = bookObj.name;
    var author = document.querySelector('.author-input');
    $('.remove-author').html('');
    author.classList.remove('hidden')
}
function editPrice() {
    var item = bookObj.price;
    var price = document.querySelector('.price-input');
    $('.remove-price').html('');
    price.classList.remove('hidden')
}

function editDesc() {
    var item = bookObj.description;
    var desc = document.querySelector('.desc-input');
    $('.remove-desc').html('');
    desc.classList.remove('hidden')
}
function onSaveChanges() {
    if ($('#book-title').val()) {
        bookObj.name = $('#book-title').val();
    }
    if ($('#book-author').val()) {
        bookObj.author = $('#book-author').val();
    }
    if ($('#book-price').val()) {
        bookObj.price = $('#book-price').val();
    }
    if ($('#book-desc').val()) {
        bookObj.description = $('#book-desc').val();
    }
    if (bookObj.photo) {
        bookObj.photo = bookObj.photo;
    }
    // debugger;
    gBooks.push(bookObj);
    renderBooks()
    doTrans();
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
    $('.modal-title').html(`
    <input type="text" id="book-title" class="title" data-trans="add-book-modal-title" placeholder="${bookObj.name}"></input>`)
    $('.author').html(`<input type="text" id="book-author" class="author-input"  data-trans="add-book-modal-author" placeholder="${bookObj.author}"></input>`)
    $('.price').html(`<input type="number" id="book-price" class="price-input " data-trans="add-book-modal-price" placeholder="${bookObj.price}"></input>`)
    $('.photo').html(``);
    $('.desc').html(`<input type="text" id="book-desc" class="desc-input" data-trans="add-book-modal-desc" placeholder="${bookObj.description}"></input>`)
doTrans()

}

function onClickLang(getLang) {
var lang = getLang.innerText.toLowerCase();
console.log(lang);
var getBodyEl = document.querySelector('body')
var getModalEl = document.querySelector('.modal');
if (lang === 'he')  {
    getBodyEl.classList.add('trans-rtl');
    getModalEl.classList.add('trans-rtl');
     
} else {
    getBodyEl.classList.remove('trans-rtl');
    getModalEl.classList.remove('trans-rtl');
    
}
setLang(lang);
renderBooks()
doTrans();

}

function onSortClick(theader) {
    var sortType = theader.dataset.th;        
    sortBooks(sortType)
    renderBooks()
    doTrans()
}
