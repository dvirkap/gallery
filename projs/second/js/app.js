'use strict';
// debugger;
var gLastRes = null;

$(document).ready(init);

function init() {
    $('h2').hide()
    $('.alert-success').hide();
    $('.alert-danger').hide();
        createQuestsTree();
    
}

function onStartGuessing() {
    // TODO: hide the game-start section//
    $('.btn-success').hide()
    $('h2').show()
    renderQuest();
    // TODO: show the quest section//
    $('.quest').toggle()
}

function renderQuest() {
    debugger;
    // TODO: select the <h2> inside quest and update its text by the currQuest text//
    $('.question-txt').html(`${gCurrQuest.txt}`)

}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            $('.alert-success').show();
            $('.quest').toggle()
            $('h2').hide()
            $('.btn-info').hide();
            $('.btn-danger').hide();
            setTimeout(function() {
                
                $('.alert-success').hide();
                $('.btn-success').html(`תחשבו על מישהו אחר`);
                $('.btn-success').show()
                
                createQuestsTree();
                renderQuest();
                
                $('.btn-info').show();
                $('.btn-danger').show();
                
            }, 1000); 
            // TODO: improve UX
        } else {
            $('.alert-danger').show();
            // TODO: hide and show new-quest section
            setTimeout(function() {
                $('.quest').toggle()
                $('.game-start').toggle();
                $('.new-quest').show();
                $('.alert-danger').hide();
            }, 2000);
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        console.log('glastRes:', gLastRes);
            moveToNextQuest(res);
                renderQuest();
    
}
}

function onAddGuess() {
    // debugger;
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    var newGuessTxt = $('#newGuess').val();    
    var newQuestTxt = $('#newQuest').val();   
    var res = gLastRes; 
    addGuess(newQuestTxt, newGuessTxt, res)
    onRestartGame();
}


function onRestartGame() {
    $('.alert-success').hide();
    $('.alert-danger').hide();
    $('.new-quest').hide();
    $('.game-start').toggle();
    $('.quest').hide()
    $('.btn-success').show()
    gLastRes = null;


}

