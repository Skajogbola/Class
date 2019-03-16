$(document).ready(function () {
    // 10 Questions and Answers
    var triviaQuestions = [
        {
            question: " How many colours are there in a rainbow?",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1
        },
        {
            question: " What do you call a time span of one thousand years? ",
            answers: ["Millennium", "Century", "Decade", "Eon"],
            correctAnswer: 0,
        },
        {
            question: " How many squares are there on a chess board?",
            answers: ["60", "64", "70", "65"],
            correctAnswer: 1,
        },
        {
            question: " Which is NOT one of the four types of teeth?",
            answers: ["Molars", "Incisors", "Canines", "Post-molars"],
            correctAnswer: 3,
        },
        {
            question: " How many American cents make up a dime?",
            answers: ["25", "10", "15", "5"],
            correctAnswer: 1
        },
        {
            question: " What is the average temperature of the human body, in degrees centigrade?",
            answers: ["35", "37", "40", "30"],
            correctAnswer: 1
        },
        {
            question: " What is rum distilled from?",
            answers: ["Sugar cane", "Wheat", "Millet", "Rice"],
            correctAnswer: 0
        },
        {
            question: " Which common household item, usually found in a kitchen or utility room, did Hamilton Smith invent in 1858?",
            answers: ["Oven", "Dryer", "Washing machine", "Refrigerator"],
            correctAnswer: 2
        },
        {
            question: " How many symphonies did Beethoven compose?",
            answers: ["6", "9", "8", "5"],
            correctAnswer: 1
        },
        {
            question: " Which species of mollusc and a planet share a name?",
            answers: ["Pluto", "Venus", "Mars", "Mercury"],
            correctAnswer: 1
        }

    ]
    //Creating the Global Variables
    var pick;
    var index;
    var time = 30;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var queCount = triviaQuestions.length;
    var clockRunning = false;
    var newArray = [];
    var holder = [];
    var userGuess = "";
    var intervalId;

    $("#startOverBtn").hide();
    //click on start button to start the game   
    $(".button").on("click", function () {
        $(this).hide();
        loadQuestions();
        start();
        for (
            var i = 0; i < triviaQuestions.length; i++) {
            holder.push(triviaQuestions[i]);
        }

    });

    //--------------Creating functions----------------------
    function start() {
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }
    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }
    function count() {
        time--;
        console.log(time);
        // var converted = timeConverter(time);
        $("#timeLeft").html("<h3>Time remaining: " + time + "</h3>")
        if (time === 0) {
            clockRunning = false;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.answers[pick.correctAnswers] + "</p>");
        }
    }

    //sets up new questions & answerList.
    //display question and loop though and display possible answers
    function loadQuestions() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        newQuestion();
    }

    function newQuestion() { 
        $("#correctedAnswer").empty();
        answered = true;
      
        //sets up new questions & answerList
        $("#currentQuestion").html(
          "Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length
        );
        $(".question").html(
          "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
        );
        for (var i = 0; i < 4; i++) {
          var userChoices = $("<div>");
          userChoices.text(triviaQuestions[currentQuestion].answerList[i]);
          userChoices.attr({ "data-index": i });
          userChoices.addClass("answerchoice");
          $(".answers").append(choices);
        }
    }

    //click function to select answer and outcomes
    $("#answers").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));

        var rightAnswerText =
        triviaQuestions[currentQuestion].answers[
          triviaQuestions[currentQuestion].correctAnswer
        ];
      var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        if (userGuess == rightAnswerIndex && answered == true) {
            correctAnswesr++;
            $("#answers").html("<p>correct!</p>");
          } else if (userGuess != rightAnswerIndex && answered == true) {
            incorrectAnswers++;
            $("#answers").html("<p>wrong!</p>");
            $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
          } else {
            unanswered++;
            $("#answers").html("<p>Unanswered!</p>");
            $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
            answered = true;
          }
        });


    //run the score screen if all questions answered
    // 	if ((incorrectAnswers + correctAnswers + unanswered) === qCount) {
    // 		$("#currentQuestion").empty();
    // 		$("#finalMessage").html("<h3>Game Over!  Here's how you did: </h3>");
    // 		$("#correctAnswers").append("<h4> Correct: " + correctAnswers + "</h4>" );
    // 		$("#incorrectAnswers").append("<h4> Incorrect: " + incorrectAnswers + "</h4>" );
    // 		$("#unanswered").append("<h4> Unanswered: " + unanswered + "</h4>" );
    // 		$("#reset").show();
    // 		correctAnswers = 0;
    // 		incorrectAnswers = 0;
    // 		unanswered = 0;

    // 	} else {
    // 		runTimer();
    // 		displayQuestion();

    // 	}
    // }, 3000);


    // // countdown();
    // // //clicking an answer will pause the time and setup answerPage
    // // $('.thisChoice').on('click',function(){
    // //     userSelect = $(this).data('index');
    // //     clearInterval(time);
    // //     answerPage();
    // // });
    // // }

    // // function countdown(){
    // // seconds = 15;
    // // $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    // // answered = true;
    // // //sets timer to go down
    // // time = setInterval(showCountdown, 1000);
    // // }

    // // function showCountdown(){
    // // seconds--;
    // // $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    // // if(seconds < 1){
    // //     clearInterval(time);
    // //     answered = false;
    // //     answerPage();
    // // }
    // // }
    // function scoreboard(){
    // 	$('#timeLeft').empty();
    // 	$('#finalMessage').html(messages.finished);
    // 	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
    // 	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    // 	$('#unanswered').html("Unanswered: " + unanswered);
    // 	$('#startOverBtn').addClass('reset');
    // 	$('#startOverBtn').show();
    // $('#startOverBtn').html('Start Over?');
    // }



    $("#startOverBtn").on("click", function () {
        $("#startOverBtn").hide();
        $("#currentQuestion").empty();
        $("#answers").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        start();
        loadQuestions();

    });
})
