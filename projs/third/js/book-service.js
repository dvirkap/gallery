`use strict`
var gBooks = [];
var BOOK_ID = 1;
var bookObj;
var isAscending = true;
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
        price: 60,
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

function sortBooks(sortType) {
    console.log(gBooks);

    console.log(sortType);
    switch (sortType) {
        case `price`:
            gBooks.sort(function (a, b) {
                if (isAscending === true) {
                    return a.price - b.price;
                }
                else {
                    gBooks.reverse();
                }
            })
            break;
        case `id`:
            gBooks.sort(function (a, b) {
                if (isAscending === true) {
                    return a.id - b.id;
                }
                else {
                    gBooks.reverse();
                }
            })
            break;
        case `title`:
            gBooks.sort(function (a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (isAscending === true) {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                
                    // names must be equal
                    return 0;

                } else {
                    gBooks.reverse();
                }
            })
            break;
            case `author`:
            gBooks.sort(function (a, b) {
                var nameA = a.author.toUpperCase(); // ignore upper and lowercase
                var nameB = b.author.toUpperCase(); // ignore upper and lowercase
                if (isAscending === true) {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                
                    // names must be equal
                    return 0;

                } else {
                    gBooks.reverse();
                }
            })
            break;

    }
    if (isAscending === true) isAscending = false;
    else {
        isAscending = true;
    }
    console.log(gBooks);

}

//Utils
function compareNumbers(a, b) {
    return a - b;
}
