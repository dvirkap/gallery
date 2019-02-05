var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    if (loadFromStorage('gQuestsTree') === null) {
        gQuestsTree = createQuest('זכר?');
        gQuestsTree.yes = createQuest('גנדי');
        gQuestsTree.no = createQuest('ריטה');
    }
    else {
        gQuestsTree = loadFromStorage('gQuestsTree');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage('gQuestsTree', gQuestsTree);
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the prev, curr global vars
    gPrevQuest = gCurrQuest;
    if (res === 'yes') {
        gCurrQuest = gCurrQuest.yes;
    } else {
        gCurrQuest = gCurrQuest.no;
    }
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    if (res === 'yes') {
        var tempQuestion = gPrevQuest.yes = createQuest(newQuestTxt);
        tempQuestion.yes = createQuest(newGuessTxt);
        tempQuestion.no = gCurrQuest;
    } else {
        var tempQuestion = gPrevQuest.no = createQuest(newQuestTxt);
        tempQuestion.yes = createQuest(newGuessTxt);
        tempQuestion.no = gCurrQuest;
    }
    gCurrQuest = gQuestsTree;
    saveToStorage('gQuestsTree', gQuestsTree);
}

//Utils
/*!
 * Auto Direction. (RTL To LTR)
 * SiamakMokhtri(@sia_mac) at Fiction(@fictionteam) Under Licence MIT.
 * Created at April 2014.
 */
function isUnicode(str) {
    var letters = [];
    for (var i = 0; i <= str.length; i++) {
        letters[i] = str.substring((i - 1), i);
        if (letters[i].charCodeAt() > 255) { return true; }
    }
    return false;
}
var dir = $('input[type=text]');
dir.keyup(function (e) {
    if (isUnicode(dir.val())) {
        $(this).css('direction', 'rtl');
    }
    else {
        $(this).css('direction', 'ltr');
    }
}); 