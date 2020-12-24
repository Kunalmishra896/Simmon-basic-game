var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$(document).keypress(function () {
    if (gameStarted == false) {
        $("h1").text("level  " + level);
        nextSequence();
        gameStarted = true;
    }

});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level = level + 1;
    $("h1").text("level  " + level);

};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass('pressed');
    }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();
        $(document).addClass("game-over");
        setTimeout(function () {
            $(document).removeClass("game-over");
        }, 200)

        $("h1").text("Game Over ,  Press Any key to restart");
        startover();
    }
}


function startover(params) {

    level = 0;
    gamePattern = [];
    gameStarted = false;


}







