var intervalID;
var qClock = 10;

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

var gameBoard = {
  correctAnswers: 0,
  wrongAnswers: 0,
  unanswered: 0,
  questions: [q1]
};

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

function startGame() {
  console.log("Starting Game");
  $(".start").hide();
  var htmlString =
    "<p>/* Programming Trivia Game<br />&nbsp*<br >&nbsp* Cick on the correct question<br />&nbsp*/</p>";
  $(".comment").html(htmlString);

  $(".timer").show();
  $(".question-container").fadeIn("fast");
  startTimer();
}

function randomizeGame() {}

$(window).on("load", function() {
  $(".start").on("click", function() {
    startGame();
  });
  randomizeGame();
});
