var intervalID;
var qClock = 20;
var feedbackClock = 5;
var questionSelected = false;

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

var q3 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>Which of the following is a bulletted list?",
  correctAnswer: "<ul>",
  possibleAnswers: ["<ul>", "<li>", "<bl>", "<ol>"],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};

var q4 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>What does the following mean to the computer? <span class='alt-code'>div p </span> <span class='alt-code-green'>{</span> <span class='alt-code-red'>color: #ff0000;</span><span class='alt-code-green'>}</span>",
  correctAnswer:
    "Make the text inside any paragraph that is inside any div be bright red",
  possibleAnswers: [
    "Make text in all divs and all paragraphs in this document be bright red",
    "Make the background in all divs that are of the class 'p' be bright red",
    "Make the text inside any divs inside of any paragraph be bright red",
    "Make the text inside any paragraph that is inside any div be bright red"
  ],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};

var q5 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>What are the main differences between ID and Class?",
  correctAnswer:
    "ID's are supposed to be only used once per page but Classes can be used multiple times per page, and one element can have more than one Class but should have only one ID",
  possibleAnswers: [
    "Classes are for use with spans and ID's are for use with DIVs",
    "ID's are supposed to be only used once per page but Classes can be used multiple times per page, and one element can have more than one Class but should have only one ID",
    "Classes should be used only once per page, but ID's can be used as many times as you like on one page",
    "ID's are better than Classes"
  ],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};

var q6 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>Take choice from user either yes and no or cancel we use ________",
  correctAnswer: "Alertbox",
  possibleAnswers: ["Promptbox", "Confirmbox", "Alertbox", "None of these"],
  randomize: function() {
    this.possibleAnswers.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
};
var q7 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span>How can we declare variables in Javascript",
  correctAnswer: "var",
  possibleAnswers: ["var", "int", "float", "set"],
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
  questions: [q1, q2, q3, q4, q5, q6, q7]
};

function resetGameBoard() {
  gameBoard.correctAnswers = 0;
  gameBoard.wrongAnswers = 0;
  gameBoard.unanswered = 0;
  qClock = 20;
  for (var index = 0; index < 4; index++) {
    $(`#A${index + 1}`).css({ "background-color": "" });
  }
}
function results() {
  var htmlString =
    "<p>/* Programming Trivia Game<br />&nbsp*<br >&nbsp* Below are your results<br />&nbsp*<br >&nbsp* If you want to play again click start!<br />&nbsp*/</p>";
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
    "<span class='alt-code'>Unanswered: </span>" +
    gameBoard.unanswered +
    "<br><br>";
  $(".outcome").html(outcomeString);
  $(".outcome").css("color", "rgb(212, 213, 214)");
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
  $(".outcome").html("Sorry! You ran out of time!");
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
  setTimeout(function() {
    nextQuestion();
  }, feedbackClock * 1000);
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
  $(".feedback").hide();
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
  questionSelected = false;
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
    if (questionSelected === false) {
      questionSelected = true;
      checkAnswer($(this));
      console.log("Getting Ready for Time out");
      setTimeout(function() {
        nextQuestion();
      }, feedbackClock * 1000);
      console.log("Finished Timeout");
    }
  });
});
