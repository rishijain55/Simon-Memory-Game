var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var level = -1;
var x = 0;

function nextSequence() {
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);
  }, 300);
  playSound(randomChosenColour);
  window.started = true;
  level += 1;
  $("#level-title").text("level " + level.toString());
}
$(".btn").click(function () {
  if (window.started == true) {
    window.userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userChosenColour == gamePattern[x]) {
      x += 1;
    } else {
      $("#level-title").text("game over press any key to restart");
      window.started = false;
      userClickedPattern = [];
      gamePattern = [];
      level = -1;
    }
    if (x == gamePattern.length && x > 0) {
      userClickedPattern = [];
      nextSequence();
      x = 0;
    }
  }
});
function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}
function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}
window.started = false;
$("body").keypress(function () {
  if (window.started == false) {
    nextSequence();
    $("#level-title").text("level 0");
  }
});
console.log(window.started);
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
