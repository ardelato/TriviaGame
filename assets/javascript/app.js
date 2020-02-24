var intervalID;
var qClock = 10;

var tempQuestions = [];
var currentQuestion;

var q1 = {
  question:
    "<span class='alt-code-blue' id='question-label'>Question: </span><span class='alt-code'>&lt;a&gt;</span> and<span class='alt-code'>&lt;/a&gt;</span> are the tags used for?",
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

function randomizeGame() {}

$(window).on("load", function() {
  $(".start").on("click", function() {
    startGame();
  });
  randomizeGame();
});
