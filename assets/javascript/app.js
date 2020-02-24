var intervalID;
var qClock = 10;

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

$(window).on("load", function() {
  $(".start").on("click", function() {
    startGame();
  });
});
