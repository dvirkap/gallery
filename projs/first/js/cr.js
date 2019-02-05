// 'use strict';
console.log('Mine Sweeper');
//Global variables
var victory;
var seconds = 0;
var stoper;
var gBoard;
var SYMBOL = '.';
var cell;
var gLevel = {
    SIZE: 6,
    MINES: 5
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var MINE = '&#128163';

function init() {
    gBoard = buildBoard();
    printMat();
    createMines();
    setMinesNegsCount(gBoard)
    noContextMenu()
    headLine();
    seconds = 0
    hints()
};

// chooseLevel()
function buildBoard() {
    var board = [];
    for (let i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (let j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = cell = {
                sign: '&#9744;',
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    // console.log('this is the gBoard output:', board);
    return board;

}
//Print the gBoard to the DOM
function printMat(mouseEvent) {
    var strHTML = '<table border = 1; class="cellBox"></tbody>';
    var mouseEvent = 'onmousedown="cellClicked(event)';
    for (let i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for (let j = 0; j < gLevel.SIZE; j++) {
            strHTML += `<td data-id="${i},${j}" class="cellBox js-noMenu cell${i}-${j}"  ${mouseEvent}">${cell.sign}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var gameContainer = document.querySelector('.board-container');
    gameContainer.innerHTML = strHTML;
}
//General dom function
function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

//Creating mines and positoning them in random places
function createMines() {
    var mineCounter = 0;
    while (mineCounter < gLevel.MINES) {

        var i = getRandomIntInclusive(0, gLevel.SIZE - 1);
        var j = getRandomIntInclusive(0, gLevel.SIZE - 1);
        var nextMineCell = gBoard[i][j];
        nextMineCell.isMine = true;
        mineCounter++
    }
}


//Show all mines in the DOM if game is over
function exposeAllMines() {
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            var nextMineCell = gBoard[i][j];
            if (nextMineCell.isMine === true) {
                nextMineCell.sign = '&#128163;';
                var location = {
                    i: i,
                    j: j
                }
                renderCell(location, nextMineCell.sign);
            }
        }
    }
}

//Counting the mines
function setMinesNegsCount(gBoard) {
    // debugger;
    // var minesCounter = 0;
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            var elCell = gBoard[i][j];
            var iPoint = i;
            var jPoint = j;
            if (elCell.isMine === false) {
                // console.log('The choosen cell', elCell);
            } else {
                for (let t = iPoint - 1; t <= iPoint + 1; t++) {
                    for (let y = jPoint - 1; y <= jPoint + 1; y++) {
                        if (t < 0 || y < 0 || t > gLevel.SIZE - 1 || y > gLevel.SIZE - 1 || gBoard[t][y].isMine === true) continue;
                        gBoard[t][y].minesAroundCount += 1;
                    }
                }

            }
        }
    }

}

function cellClicked(ev) {
    //CR: The way this is written, a lot of conditions are being executed. could've avoided some of them by first checking whether this is a left click or a right click.
    var value;
    //Extract the Index position of the cell from the event
    var cellIdx = ev.target.dataset.id.split(',')
    var choosenCell = gBoard[cellIdx[0]][cellIdx[1]];
    var location = {
        i: cellIdx[0],
        j: cellIdx[1]
    }

    //Mouse events!!!
    if (choosenCell.isMine === true && gGame.isOn === false) {
        return;
    }
    if (gGame.isOn === true && choosenCell.isMine === true && ev.button !== 2) {
        exposeAllMines()
        victory = false;
        var explode = new Audio('sound/explode.mp3')
        explode.play();
        return gameOver();
    }


    if (gGame.isOn === false && (ev.button === 0 || ev.button === 2)) {
        //CR: this means you are only exapnding on the first click
        //CR: the task was to make the expansion whenever you are clicking on a cell with no neighbour mines, and to make sure the first click is never a mine
        expandShown(choosenCell, location.i, location.j)
        startGame()
        gGame.isOn = true;
        stopWatch();
    }

    if (ev.button === 0 && gGame.isOn === true) {
        var click = new Audio('sound/click.mp3')
        click.play();
        // console.log('show cell');
        choosenCell.isShown = true;
        if (choosenCell.minesAroundCount === 0) {
            value = '&#10240;';
        } else {

            value = choosenCell.minesAroundCount;
        }
    }
    if (ev.button === 2 && choosenCell.isMarked === false && choosenCell.isShown === true) return;



    if (ev.button === 2 && choosenCell.isMarked === false) {
        //If right mouse key is pressed - flag cell
        choosenCell.isMarked = true;
        // console.log('flag cell');
        value = '&#x1f6a9;';
        minesCounting()
    } else if (ev.button === 2 && choosenCell.isMarked === true) {
        choosenCell.isMarked = false;
        value = '&#9744;';
    }



    renderCell(location, value)
    // console.log('This is the cell:', choosenCell);
}

//Game over: disables ability to press 
function gameOver() {
    //CR: remove old code and console logs.
    gGame.isOn = false;
    var menuContainer = document.querySelector('.newGame')
    menuContainer.classList.remove('disableMouse');
    if (localStorage.getItem("topTime") < seconds && victory === true) {
        localStorage.setItem("topTime", `${seconds}`)
        var bestTime = document.querySelector('.bestTime');
        bestTime.innerHTML = '<h3>Best score :' + localStorage.getItem('topTime') + ' seconds!!!</h3>';
    }
    if (victory === false) {
        var bestTime = document.querySelector('.bestTime');
        bestTime.innerHTML = '<h3>Youv`e been exploded</h3>';
    }
    // newGame()
    stopTimer();
    var gameContainer = document.querySelector('.board-container');
    gameContainer.classList.add('disableMouse');
    // var gameOvercss = document.querySelector('.gameOver');
    // gameOvercss.classList.remove('hidden');

    // console.log(gameContainer);

}

//First click expansion
function expandShown(choosenCell, i, j) {
    // debugger;
    //CR: missing the test whether the cell has 0 neighbor mines. causes some glitches with the expansion function
    var i = +i
    var j = +j
    if (gGame.isOn === false) {
        for (let t = i - 2; t <= i + 2; t++) {
            for (let r = j - 2; r <= j + 2; r++) {
                if (gLevel.SIZE - t <= 0 || t < 0) continue;
                if (gLevel.SIZE - r <= 0 || r < 0) continue;
                if (gBoard[t][r].isMine === true) continue;

                gBoard[t][r].isShown = true;
                var location = {
                    i: t,
                    j: r
                }
                var value = gBoard[t][r].minesAroundCount;
                if (gBoard[t][r].minesAroundCount === 0) {
                    value = '&#10240;';
                }
                renderCell(location, value)

            }
        }
        console.log('This is the expand start cell:', choosenCell);
        // debugger;
    }
}

function headLine() {
    var headline = document.querySelector('.headLine');
    var broom = '&#128163;';
    headline.innerHTML = `<h1>The ${broom} squad</h1>`;
}



function chooseLevel(levels) {
    if (gGame.isOn === false) {
        var levelChoosen = levels;
        if (levelChoosen.classList.contains('level1') === true) {
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            init()
        }
        if (levelChoosen.classList.contains('level2') === true) {
            gLevel.SIZE = 6;
            gLevel.MINES = 8;
            init()
        }
        if (levelChoosen.classList.contains('level3') === true) {
            gLevel.SIZE = 8;
            gLevel.MINES = 16;
            init()
        }

    }

}


function minesCounting() {
    var markedCells = 0;
    // debugger;
    var minesCounter = 0;
    var numOfCellsNotShown = 0
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine === true && gBoard[i][j].isMarked === true) {
                minesCounter++
            }
            if (gBoard[i][j].isMarked === true) {
                markedCells++
            }
            if (gBoard[i][j].isShown === false)
                numOfCellsNotShown++
        }
    }
    console.log('mines:', minesCounter);
    console.log('marked cells:', markedCells);

    if (minesCounter === gLevel.MINES && gLevel.MINES === markedCells) {
        return gameWon();
    } else if (numOfCellsNotShown === gLevel.MINES && markedCells === 0) {
        return gameWon();
    }

}

function gameWon() {
    victory = true;
    gameOver();
}

function newGame(box) {
    //CR: I can see this is on purpose, but why can't I restart game while a game is running?
    // if (gGame.isOn === false) {
    console.log(box);
    var watchContainer = document.querySelector('.stopWatch');
    watchContainer.classList.add('hidden');
    var gameContainer = document.querySelector('.board-container');
    gameContainer.classList.remove('disableMouse');
    // box.classList.remove('hidden');
    var menuContainer = document.querySelector('.levels')
    menuContainer.classList.remove('hidden');
    var bestTime = document.querySelector('.bestTime');
        bestTime.innerHTML = '<h3>You got a death wish?`</h3>';
    init();
    // }
}

function startGame() {
    var menuContainer = document.querySelector('.levels')
    menuContainer.classList.add('hidden');
    var menuContainer = document.querySelector('.newGame')
    menuContainer.classList.add('disableMouse');
    var watchContainer = document.querySelector('.stopWatch');
    watchContainer.classList.remove('hidden');
}



function hints() {
    //CR: not sure what this is doing?
    var hint = `<button class="hint hint1" onclick="hints(this)">&#128269;</button>
    <button class="hint hint2" onclick="hints(this)">&#128269;</button>
    <button class="hint hint3" onclick="hints(this)">&#128269;</button>`;
    var hintBox = document.querySelector('.hints')
    hintBox.innerHTML = `<h3>You got hints:</h3> ${hint}</div>`;
    
}
function hintsremove(ev) {
    //CR: this is never called
    console.log(ev);
    hintsleft.pop();
}

//Utility functions

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function noContextMenu() {
    [...document.querySelectorAll(".js-noMenu")].forEach(el =>
        el.addEventListener('contextmenu', e => e.preventDefault())
    );
}
function stopWatch() {
    var watchContainer = document.querySelector('.stopWatch');
    stoper = setInterval(function () {
        seconds++
        watchContainer.innerHTML = '<h3>You stayed alive for: <br> ' + seconds + ' seconds!!!</h3>';
    }
        , 1000);
}
function stopTimer() {
    clearInterval(stoper);

}

