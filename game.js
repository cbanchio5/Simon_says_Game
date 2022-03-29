var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var handle = [];
var level = 0;
var active = false;


$(document).keypress(function(event) {

  if (!active) {
    $("h1").text("Level " + level);
    nextSequence();
    active = true;
  }
})

$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.indexOf(userChosenColor));
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");


    if (userClickedPattern.length === gamePattern.length){


      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {$("body").removeClass("game-over")},200);
    $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
  

  }


}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4)
  randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}




function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function startOver ()
{
  level=0;
  gamePattern=[];
  active=false;
}
