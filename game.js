var arr=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
var start=false;

$("h1").click(function(){
    if(!start)
    {
        $("#level-title").text("LEVEL "+level);
        nextSeq();
        start=true;
    }
});

$(".btn").click(function(){
    var clk = $(this).attr("id"); // clk is the chosen color
    userPattern.push(clk);
    playSound(clk);
    animatePress(clk);
    checkAns(userPattern.length -1)
})

function checkAns(currLevel){
    if(gamePattern[currLevel]===userPattern[currLevel])
    {
        console.log("Success");
        if(gamePattern.length===userPattern.length)
        {
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }   
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Click here to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    start=false;
    gamePattern=[];
}

function nextSeq(){
    userPattern=[];
    level++;
    $("#level-title").text("LEVEL "+level);
    var randomNum = Math.floor(Math.random()*4);
    var randomColor = arr[randomNum];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(clk){
    var aud=new Audio("./sounds/"+clk+".mp3");
    aud.play();
}

function animatePress(clk){
    $("#"+clk).addClass("pressed");

    setTimeout(function(){
    $("#"+clk).removeClass("pressed");
    },100);
}

