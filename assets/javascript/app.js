//initializing variables
//object variables for questions
//questions
var questions = [

    {
        "question":"How many interceptions did Matt Ryan have in 2016?",
        "choices":["2","7","12","15"],
        "answer":"7",
        "number":"1/5",
        "fact":"Matt Ryan had 7 interceptions on 534 pass attempts, leading to an interception rate of only 1.3%!",
        "image":'assets/images/mattryan.JPG'
    },

    {
        "question":"Tevin Coleman had 3 fumbles in 2015. How many did he have in 2016?",
        "choices":["1","3","5","7"],
        "answer":"1",
        "number":"2/5",
        "fact":"Coleman cleaned up his act in 2016 and only had one fumble.",
        "image":'assets/images/tevincoleman.jpg'
    },

    {
        "question":"Overall, the Falcons had turnover problems in 2015 at a ratio of -7. What was their turnover ratio in 2016?",
        "choices":["-15","-11","+11","+15"],
        "answer":"+11",
        "number":"3/5",
        "fact":"The falcons really cleaned up their act and had a ratio of +11, a differential of 18 from 2015",
        "image":'assets/images/recovery.jpg'
    },

    {
        "question": "How many touchdowns did the Falcons have in 2016?",
        "choices": ["51", "56", "64", "69"],
        "answer": "64",
        "number": "4/5",
        "fact": "The Falcons had 64 touchdowns while their opponents only had 48",
        "image":'assets/images/touchdown.jpg'
    },

    {
        "question":"How many total yards did the Falcons have in 2016?",
        "choices":["6653","6798","6842","6914"],
        "answer":"6653",
        "number":"5/5",
        "fact":"The falcons totalled 6653 yards while their opponents totalled 5939",
        "image":'assets/images/yards.jpg'
    }
];
var questionNumber = 0;
//sets wrong answer to 0
var wrong = 0;
//sets correct to 0
var correct = 0;
//initialized unanswered questions to 0
var unanswered = 0;
//sets timer to 15
var time = 15;
//the variable used for the one-second time interval
var timer;
//sets question number to 0



//variable that holds all of the returns
var answerAll = "The correct answer is " + questions[questionNumber].answer + "." + "<br>" + "<img src=" + questions[questionNumber].image + ">" + "<br>" + questions[questionNumber].fact;

//when the window initially loads, the answer buttons are hidden and a click event is established
window.onload = function() {
    //click event for the answer button
    $(".answerbtn").click(userAnswer);
    //click event for reset button
    $(".resetbtn").click(reset);
    //hides the timer
    $("#timer").hide();
    //answer buttons and reset button hidden
    $(".resetbtn").css("display","none");
    $(".answerbtn").css("display","none");

    //click event for start button
    $("#start").click(start);

    //initializes time left to 15 seconds
    $("#timer").html(time);
    //toggle variable for right and wrong answers
    var isCorrect;
};


//start function, clicking start button shows answer choices and hides start button
function start() {
    $("#timer").show();
    //timer starts counting down from 15s
    //answer buttons are shown
    $(".answerbtn").css("display","initial");
    //start button goes away
    $("#start").css("display","none");
    //shows timer

    runCountdown();
    //show question number
    $("#questionNumber").html("<h1>Question " + questions[questionNumber].number + "</h1>");
    //the first question is shown
    $("#question").html(questions[questionNumber].question);
    //the answer choices for the first question are shown
    $("#answer1").html(questions[questionNumber].choices[0]);
    $("#answer2").html(questions[questionNumber].choices[1]);
    $("#answer3").html(questions[questionNumber].choices[2]);
    $("#answer4").html(questions[questionNumber].choices[3]);
}

//function is run when an answer button is pressed
function userAnswer () {
    //timer is stopped
    stop();
    //checks if the answer is true or false
    if ($(this).text() === questions[questionNumber].answer) {
        //for a correct answer, the isCorrect variable toggle is set to true
        isCorrect = true;
        //number of right answers increases by one
        correct += 1;
    }
    else {
        //for incorrect answer, the isCorrect variable toggle is set to false
        isCorrect = false;
        //number of wrong answers increases by one
        wrong += 1;
    }

    //runs function that displays if you user chose the right or wrong answer along with what the correct answer was.
    questionEnd();
    //resets timer to 15s
    time = 15;
    $("#timer").html(time);
}

//runs when an answer button is clicked
function questionEnd() {
    //hides answer buttons and timer
    $(".answerbtn").css("display","none");
    $("#timer").hide();

    //if answer is correct
    if (isCorrect === true) {
        //screen shows use was correct
        $("#questionNumber").html("<h1>Correct!</h1>");
        //reset answerAll
        answerAll = "The correct answer is " + questions[questionNumber].answer + "." + "<br>" + "<img src=" + questions[questionNumber].image + ">" + "<br>" + questions[questionNumber].fact;
        //screen shows the correct answer
        $("#question").html(answerAll);
        //runs a function that shows the next question and restarts timer
        runNextQuestion();
    }
    else {
        //screen shows user was wrong
        $("#questionNumber").html("<h1>Wrong!</h1>");
        //reset answerAll
        answerAll = "The correct answer is " + questions[questionNumber].answer + "." + "<br>" + "<img src=" + questions[questionNumber].image + ">" + "<br>" + questions[questionNumber].fact;
        //screen shows the correct answer
        $("#question").html(answerAll);
        //runs a function that shows the next question and restarts timer
        runNextQuestion();
    }
}

//this function is called in runNextQuestion() to set an interval
function nextQuestion() {
    //the question number is increased, prepping for the next place in the question array
    questionNumber += 1;
    if (questionNumber === questions.length) {
        $("#questionNumber").html("<h1>The End!</h1>");
        //shows what the correct answer was
        $("#question").html("Correct answers: " + correct + "<br>Wrong answers: " + wrong + "<br>Not answered: " + unanswered);
        $(".resetbtn").css("display","initial");
    }
    else {
        //update answerAll
        answerAll = "The correct answer is " + questions[questionNumber].answer +"." + "<br>" + "<img src=" + questions[questionNumber].image + ">" + "<br>" + questions[questionNumber].fact;
        //resets header
        $("#questionNumber").html("<h1>Question " + questions[questionNumber].number + "</h1>");
        //shows next question
        $("#question").html(questions[questionNumber].question);
        //shows next answer choices
        $("#answer1").html(questions[questionNumber].choices[0]);
        $("#answer2").html(questions[questionNumber].choices[1]);
        $("#answer3").html(questions[questionNumber].choices[2]);
        $("#answer4").html(questions[questionNumber].choices[3]);
        //shows and starts the timer countdown
        $("#timer").show();
        time = 15;
        start();
    }
}
//adds in interval to nextQuestion()
function runNextQuestion() {
    setTimeout(nextQuestion, 5000);
}
//adds an interval to countdown()
function runCountdown() {
    timer = setInterval(countdown, 1000);
}
//decreases time by 1 until it reaches 0
function countdown() {
    time--;
    $("#timer").html(time);
    //when timer reaches 0
    if (time === 0) {
        //stop timer
        stop();
        //reset time to 15 s
        time = 15;
        $("#timer").html(time);
        //hide answer buttons and timer
        $(".answerbtn").css("display","none");
        $("#timer").hide();
        //show the user that they have run out of time
        $("#questionNumber").html("<h1>Time up!</h1>");
        //shows what the correct answer was
        $("#question").html(answerAll);
        //increases unanswered question count by 1
        unanswered += 1;
        //shows the next question and restarts timer
        runNextQuestion();
    }
}
//clears the timer interval
function stop() {
    clearInterval(timer);
}

function reset() {
    //resets the time used by the timer to 15
    time = 15;
    //initializes time left to 15 seconds
    $("#timer").html(time);
    //resets the question number to 0
    questionNumber = 0;
    //resets wrong answer count to 0
    wrong = 0;
    //resets right answer count to 0
    correct = 0;
    //resets unanswered questions to 0
    unanswered = 0;
    //answer buttons and reset button hidden
    $(".answerbtn").css("display","none");
    $(".resetbtn").css("display","none");
    //display start button
    $("#start").css("display","initial");
    //reset quiz text
    $("#questionNumber").html("<h1>Random Falcons Facts Quiz!</h1>");
    //shows what the correct answer was
    $("#question").html(" This quiz asks random questions about the Falcons 2015 and 2016 seasons (regular and post season)<br><br> You have a 15 second timer for each question. After you answer, you get a 5 second break until the next question.");
    //resets correct answer
    isCorrect = null;
}