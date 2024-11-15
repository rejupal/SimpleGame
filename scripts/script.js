
 // Create a score object
const score = {
    wins : 0,
    losses : 0,
    ties:0
}


// Listening the storage event
window.addEventListener("storage",updateScrore());

function updateScrore(e) {
    // parse storage
    let newScore = JSON.parse(localStorage.getItem('Score'));
    // Check is empty
    if(newScore !== null) {
        score.losses = newScore.losses;
        score.wins = newScore.wins;
        score.ties = newScore.ties;
    }
}

// jQuery as $
$(document).ready(function(){

    $("#rock").click(function(){
        genarateComuterMove('Rock');
    });
  
    $("#Paper").click(function(){
    genarateComuterMove('Paper');
    }); 

    $("#Scissor").click(function(){
        genarateComuterMove('Scissor')
    });
    $("#reset").click(function(){
        resetCounters();
    });
    display();
});

function genarateComuterMove(userMove) {
    
    const rndNum = Math.random();
    // Creating the computer move
    let machineMove = '';
    // check the random value
    if(rndNum >= 0 && rndNum < 1/3 ) {
        machineMove = "Rock";
    } else if(rndNum >= 1/3 && rndNum < 2/3 ){
        machineMove = "Paper";
    } else {
        machineMove = "Scissor";
    }
    compareChoices(userMove, machineMove);
}
// Compare choice
function compareChoices(userChoice, machineChoice) {
    let result = "";
    if(userChoice === machineChoice) {
        result = "Tie";
        score.ties += 1;
    } else if(userChoice === "Rock" && machineChoice === "Paper") {
        result = "You lose.";
    }  else if(userChoice === "Rock" && machineChoice === "Scissor") {
        result = "You win.";
        score.wins += 1
    } else if(userChoice === "Paper" && machineChoice === "Rock") {
        result = "You win.";
        score.wins += 1;
    } else if(userChoice === "Paper" && machineChoice === "Scissor") {
        result = "You Lose.";
        score.losses += 1;
    } else if(userChoice === "Scissor" && machineChoice === "Rock") {
        result = "You Lose.";
        score.losses += 1;
    } else {
        result = "You Win.";
        score.wins += 1;
    } 
   
  /*  console.log(`You picked:${userChoice}. 
    Computer Picked ${machineChoice}. Result  ${result}.
    Wins: ${score.wins}, Losses: ${score.losses} & Ties: ${score.ties}`);*/
    localStorage.setItem('Score', {});
    localStorage.setItem('Score', JSON.stringify(score));

    display(result,userChoice,machineChoice);
}

function display(result='New game', userChoice='No Moves', machineChoice='No moves') {
    $(".jsResult").text('');
    $(".jsResult").append('Result: <strong>'+ result + '</strong>');
    //$(".jsMoves").text('Your Choice: '+ userChoice + '; Computer choice :' + machineChoice);
    $(".jsMoves").text('');
    $(".jsMoves").append(`Your Choice:   <img src="./img/${userChoice}Final.png" alt="" class="moveIcon"/>Computer choice :<img src="./img/${machineChoice}Final.png" alt="" class="moveIcon"/> `);

    $(".jsScores").text( `Result: Wins: ${score.wins},
         Losses: ${score.losses} & Ties: ${score.ties}`);
}
// Reset Counters 
function resetCounters() {
    score.ties = 0;
    score.wins = 0;
    score.losses = 0;
    // deleting local storage
    localStorage.removeItem('Score');
    console.log("Reset counters.");
    display('', '', '');
}