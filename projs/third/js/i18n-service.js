var gCurrLang = 'en';

var gTrans = {
    'buttons-info': {
        en: 'Info / Update',
        he: 'מידע / עדכון',
        es: 'nothing / nothing'
    },
    'buttons-delete': {
        en: 'Delete',
        he: 'מחיקה',
        es: 'nothing'
    },
    't-header-id': {
        en: 'Id',
        he: 'מספר סידורי',
        es: 'Nothing'
    },
    't-header-title': {
        en: 'Title',
        he: 'שם הכותר',
        es: 'nothing'
    },
    't-header-author': {
        en: 'Author',
        he: 'שם המחבר',
        es: 'nothing'
    },
    't-header-price': {
        en: 'Price',
        he: 'מחיר',
        es: 'nothing'
    },
    'add-book-button': {
        en: 'Add book',
        he: 'הוסף כותר',
        es: 'nothing'
    },
    'add-book-modal-title': {
        en: 'Add book title',
        he: 'שם הספר',
        es: 'nothing'
    },
    'add-book-modal-author': {
        en: 'Add author',
        he: 'שם המחבר',
        es: 'nothing'
    },
    'add-book-modal-price': {
        en: 'Price',
        he: 'מחיר',
        es: 'nothing'
    },
    'add-book-modal-desc': {
        en: 'Description',
        he: 'תקציר',
        es: 'Nothing'
    },
    'modal-close-button': {
        en: 'Close',
        he: 'סגור',
        es: 'nothing'
    },
    'modal-save-changes-button': {
        en: 'Save changes',
        he: 'שמירת שינויים',
        es: 'nothing'
    },
    'update-author': {
        en: 'Author:',
        he: 'מחבר:',
        es: 'nothing:'
    },
    'update-price': {
        en: 'Price:',
        he: 'מחיר:',
        es: 'nothing:'
    },
    'update-desc': {
        en: 'Description:',
        he: 'תקציר:',
        es: 'nothing:'
    },
    '': {
        en: '',
        he: '',
        es: ''
    },

}


function doTrans() {
   
    var langLabels = document.querySelectorAll('[data-trans]');
    for (let i = 0; i < langLabels.length; i++) {
        var langEl = langLabels[i];
        var transKey = langEl.dataset.trans;
        var txt = getTrans(transKey);

        if (langEl.nodeName === 'INPUT') {
            langEl.setAttribute('placeholder', txt);
        } else {
            langEl.innerText = txt;
        }
    }

}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(langClicked) {
    gCurrLang = langClicked;
}

function setCurrency() {
    if (gCurrLang === 'en') {
     return 'USD';
    }
    if (gCurrLang === 'he') {
      return 'ILS';
    } else {
     return 'EUR';
    }
    

}

// var priceLang = `${formatNum(num)}`;

function formatNum(num) {
    var curr = setCurrency();
    return new Intl.NumberFormat(gCurrLang ,{ style: 'currency', currency: curr }).format(num);
    // return new Intl.NumberFormat(gCurrLang).format(num);
}