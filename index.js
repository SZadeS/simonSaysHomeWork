// $(function() {
//   // Add your code here
// });

//variables
userSeq = [];
givenSeq = [];
var started = false;
var arrayOfSequences = [
  ["red"],
  ["red", "blue"],
  ["red", "blue", "green"],
  ["red", "blue", "green", "yellow"]
];
var score = 0;
var lives = 3;
var colourClicked = null;

$(document).ready(function() {
  //this function sets out the sequence and time intervals for the flashes in the boxes
  var showingSequenceEvent = function() {
    givenSeq.forEach(function(elem, index) {
      setTimeout(function() {
        $("#" + elem).css("background-color", elem);
      }, 500 + 1000 * index);

      setTimeout(function() {
        $("#" + elem).css("background-color", "white");
      }, 1000 * (index + 1));
    });
  };
//the following five lines fire off a click function when start button is clicked, fter which the start button is made to hide
  $("#startButton").click(function() {
    $("#startButton").hide();
    started = true;//boolean
    updateLivesText();//these two functions are then fired off
    getCurrentSequence();
  });

  $(".box").click(function() {//when anything in the box class is clicked, alongside a conditional, an array is compiled
    if (started) {
      colourClicked = $(this).attr("id");
      userSeq.push(colourClicked);
      checkUserPlay();
    } else {
      console.log("Game not started...");
    }
  });

  $("#playAgain").click(function() {
    userSeq = [];
    score = 0;
    lives = 3;
    colourClicked = null;
    started = true;
    $("#gameOver").hide();
    updateLivesText();
    updateScoresText();
    getCurrentSequence();
  });

  function getCurrentSequence() {
    givenSeq = arrayOfSequences[score];//this is possible becasue score is same same as sequence number/index
    showingSequenceEvent();
  }
  function checkUserPlay() {
    if (!isCorrectSeq()) {
      wrongPlay();
      if (lives == 0) {
        gameOver();
      } else {
        showingSequenceEvent();
      }
    } else {
      if (userSeq.length == givenSeq.length) {
        nextRound();
      }
    }
  }
  function isCorrectSeq() {
    for (var i = 0; i < userSeq.length; i++) {
      if (userSeq[i] != givenSeq[i]) {
        return false;
      }
    }
    return true;
  }

  function wrongPlay() {
    userSeq = [];
    lives--;
    updateLivesText();
  }

  function updateLivesText() {
    $("#lives").text(lives.toString());
  }
  function updateScoresText() {
    $("#score").text(score.toString());
  }//this works because the HTML already had an empty space where the score and lives ought to be displayed

  function gameOver() {
    started = false;
    $("#gameOver").show();
  }
  function youWin() {
    started = false;
    $("#youWin").show();
  }

  function nextRound() {
    score++;
    updateScoresText();
    if (score == arrayOfSequences.length) {
      youWin();
    } else {
      userSeq = [];
      getCurrentSequence();
    }
  }
});
