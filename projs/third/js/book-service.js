`use strict`
var gBooks = [];
var BOOK_ID = 1;
var bookObj;
var books = [
    {
        name: 'The Aztec Carnival Out Of the Jailer',
        author: 'Driscol krystle',
        price: 10,
        desc: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
     Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.`,
    },
    {
        name: 'Devilless',
        author: 'Medusa Graciana',
        price: 20,
        desc: `Aliquam tincidunt mauris eu risus. Donec odio. Quisque volutpat mattis eros.
     Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.`,
    },
    {
        name: 'With the Seal and the Tiger',
        author: 'Aoife Dragutin',
        price: 30,
        desc: `Vestibulum auctor dapibus neque. Donec odio. Quisque volutpat mattis eros.
     Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.`,
    },
    {
        name: 'Rat of Moonlight',
        author: 'Ciprian Simon',
        price: 40,
        desc: `Cras ornare tristique elit. Donec odio. Quisque volutpat mattis eros.
     Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.`,
    }

]

function init() {
    createBooks();
    renderBooks();
    
}
function createBooks() {
    for (let i = 0; i < 4; i++) {
        var book = createBook(books[i].name, books[i].desc, books[i].author, books[i].price);
        gBooks.push(book)
    }
    console.log(`gbooks:`, gBooks);

}


function createBook(bookName, bookDesc, bookAuthor, bookPrice) {
    return {
        id: BOOK_ID++,
        name: bookName,
        photo: function () {
            return this.name.split(' ').join('_') + '.jpg';
        },
        description: bookDesc,
        author: bookAuthor,
        price: bookPrice
    }
}

function getBook(item) {
    var bookName = item.dataset.name;
    return gBooks.filter(function (title) {
        return title.name === bookName;
    });
}

function onButtonInfo(item) {
    var book = getBook(item)
    doTrans();

}

function onButtonDelete(item) {
    var bookName = item.dataset.name;
    // console.log(bookName);

    gBooks.forEach(function (book) {
        if (book.name === bookName) {
            var currRow = document.querySelector(`.row${book.id}`)
            currRow.classList.add('swing-out-top-bck')
            gBooks.splice(book, 1);
        }
    });
    setTimeout(function () {
        renderBooks()
    }, 600)

}

