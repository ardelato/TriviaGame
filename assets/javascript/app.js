var intervalID;
var qClock = 20;
var feedbackClock = 5;

var tempQuestions = [];
var currentQuestion;

var q1 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span><span class='alt-code'>&lt;a&gt;</span> and <span class='alt-code'>&lt;/a&gt;</span> are the tags used for?",
  correctAnswer: "Adding links to your page",
  possibleAnswers: [
    "Adding links to your page",
    "Aligning Text",
    "Adding images",
    "Adding audio"
  ],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};

var q2 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>What does <span class='alt-code'>HTML</span> stand for",
  correctAnswer: "Hyper Text Markup Language",
  possibleAnswers: [
    "Hyperlinks and Text Markup Language",
    "Hyper Table Markdown Logic",
    "Hyper Text Markup Language",
    "Hungry Teething Mammoth Lance"
  ],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};

var gameBoard = {
  correctAnswers: 0,
  wrongAnswers: 0,
  unanswered: 0,
  questions: [q1, q2]
};

function resetGameBoard() {
  gameBoard.correctAnswers = 0;
  gameBoard.wrongAnswers = 0;
  gameBoard.unanswered = 0;
}
function results() {
  var htmlString =
    "<p>/* Programming Trivia Game<br />&nbsp*<br >&nbsp* Below are your results<br />&nbsp&*<br >&nbsp* If you want to play again click start!<br />&nbsp*/</p>";
  $(".comment").html(htmlString);
  $(".timer").hide();
  $(".question-container").hide();
  var outcomeString =
    "<span class='alt-code'>Correct Answers: </span>" +
    gameBoard.correctAnswers +
    "<br><br>" +
    "<span class='alt-code'>Incorrect Answers: </span>" +
    gameBoard.wrongAnswers +
    "<br><br>" +
    "<span class='alt-code'>Unasnwered: </span>" +
    gameBoard.unanswered +
    "<br><br>";
  $(".outcome").html(outcomeString);
  $(".start").show();
}
//Question Logic
function getRandomQuestion() {
  var q = tempQuestions.splice(
    Math.floor(Math.random() * tempQuestions.length),
    1
  );
  return Object.assign({}, q.pop());
}
function populateQuestion() {
  currentQuestion = getRandomQuestion();
  console.log(currentQuestion);
  $(".question").html(currentQuestion.question);
  currentQuestion.randomize();

  for (var index = 0; index < 4; index++) {
    $(`#A${index + 1}`)
      .find(".pa")
      .text(currentQuestion.possibleAnswers[index]);
  }
}

function correct(selected) {
  $(".feedback").show();
  $(".outcome").html("Correct!");
  $(".outcome").css({ color: "#809A00" });
  selected.css({
    "background-color": "#809A00"
  });
  gameBoard.correctAnswers++;
}
function incorrect(selected) {
  $(".feedback").show();
  $(".outcome").html("Incorrect!");
  $(".outcome").css({ color: "#df4b68" });
  selected.css({
    "background-color": "#df4b68"
  });

  for (var index = 0; index < 4; index++) {
    if (
      currentQuestion.correctAnswer ===
      $(`#A${index + 1}`)
        .find(".pa")
        .text()
    ) {
      $(`#A${index + 1}`).css({
        "background-color": "#809A00"
      });
    }
  }
  gameBoard.wrongAnswers++;
}
function checkAnswer(selected) {
  if (currentQuestion.correctAnswer === selected.find(".pa").text()) {
    correct(selected);
  } else {
    incorrect(selected);
  }
}
function outOfTime() {
  $(".feedback").show();
  $(".outcome").html(
    "Sorry! You ran out of time! <br> The correct answer was: " +
      currentQuestion.correctAnswer
  );
  $(".outcome").css("color", "#df4b68");
  gameBoard.unanswered++;
  for (var index = 0; index < 4; index++) {
    if (
      currentQuestion.correctAnswer ===
      $(`#A${index + 1}`)
        .find(".pa")
        .text()
    ) {
      $(`#A${index + 1}`).css({
        "background-color": "#809A00"
      });
    }
  }
}

// Timer Logic
function stop() {
  clearInterval(intervalID);
}
function decrease() {
  qClock--;
  $("#time-remaining").text(qClock + " seconds");
  if (qClock === 0) {
    stop();
    console.log("Time's Up!");
    outOfTime();
  }
}
function startTimer() {
  clearInterval(intervalID);
  intervalID = setInterval(decrease, 1000);
}
// End of Timer Logic

function startGame() {
  console.log("Starting Game");
  $(".start").hide();
  resetGameBoard();
  var htmlString =
    "<p>/* Programming Trivia Game<br />&nbsp*<br >&nbsp* Cick on the correct question<br />&nbsp*/</p>";
  $(".comment").html(htmlString);

  tempQuestions = Array.from(gameBoard.questions);
  console.log(tempQuestions);
  populateQuestion();
  $(".question-container").fadeIn("fast");

  $(".timer").show();
  startTimer();
}

function nextQuestion() {
  console.log("Starting next question");
  if (tempQuestions.length === 0) {
    results();
  } else {
    qClock = 20;
    $(".feedback").hide();
    for (var index = 0; index < 4; index++) {
      $(`#A${index + 1}`).css({ "background-color": "" });
    }
    startTimer();
    populateQuestion();
  }
}
function randomizeGame() {}

$(window).on("load", function() {
  $(".start").on("click", function() {
    startGame();
  });
  $(".possible-answer").on("click", function() {
    stop();
    console.log(
      "Selected Answer: " +
        $(this)
          .find(".pa")
          .text()
    );
    checkAnswer($(this));
    console.log("Getting Ready for Time out");
    setTimeout(function() {
      nextQuestion();
    }, 5000);
    console.log("Finished Timeout");
  });
});
