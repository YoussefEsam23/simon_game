var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var randomChosenColour = "";
var randomNumber = 0;
var userChosenColour = "";
var level = 0;
var started = false;

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(current_color)
{
    $("#" + current_color).addClass("pressed");
    setTimeout(function(){
    $("#" + current_color).removeClass("pressed");
    } , 100);
}


function nextSequence ()
{
    userPattern = [];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100) // Stop any current animations and jump to end
                               .fadeOut(100) // Quickly fade out
                               .fadeIn(100); // Quickly fade in
    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("level" + level);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer (currentLevel)
{
    if(gamePattern[currentLevel] === userPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length === userPattern.length)
        {
            setTimeout(function () { nextSequence ();} , 1000);
        }
    }
    else{
        console.log("wrong");
        var a = new Audio("sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over");} , 200)
        $("#level-title  ").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

$("body").keydown(function() { 
    if(!started)
        {
            nextSequence();
            $("#level-title").text("level  " + level);
            started = true;
        }
});

$(".start_button").click(function() { 
    if(!started)
        {
            nextSequence();
            $("#level-title").text("level  " + level);
            started = true;
        }
});

$(".btn").click(function() {
    if(started)
        {
        userChosenColour = $(this).attr("id");
        userPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatepress(userChosenColour);
        checkAnswer(userPattern.length-1);

    }
});