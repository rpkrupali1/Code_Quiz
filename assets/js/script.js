var timerEl = document.querySelector("#timer");
var startQuizEl = document.querySelector("#quiz-start-btn");
var quizMemoEl = document.querySelector("#quiz_memo");
var mainEl = document.querySelector(".page-content");
var quizHeader = document.querySelector(".quiz-header");
var timeleft;
var userAnswer;
var questionNum = 0;
var scoreEl = document.createElement("p");
scoreEl.className = "score";
var listItemEl = document.createElement("ol");
listItemEl.className = "quiz-options";
mainEl.appendChild(listItemEl);
var score = 0;

var answerEl = document.createElement("h2");
answerEl.className = "answer";

var initialsEl = document.createElement("div");
initialsEl.className = "initials";
initialsEl.innerHTML = "<p>Enter initials:</p><input type='text' placeholder='your initials'/><button type='submit' class='initials-submit'>Submit</button>"

var buttonsEl = document.createElement("div");
buttonsEl.style.textAlign = "left";
buttonsEl.id = "div-btn-highscore"

var highScoresEl = document.createElement("p")
highScoresEl.className = "highscores";

var highestScore;

var quizSet = [{
    question:"Commonly used data types DO NOT include:",
    Options: ["strings","booleans","alert","numbers"],
    answer: "alert"
},
{
    question:"Arrays in javascript can be used to store___.",
    Options: ["numbers and strings","other arrays","booleans","all of the above"],
    answer: "all of the above"
},
{
    question:"String values must be enclosed within ___ when being assigned to variables:",
    Options: ["commos","curly braces","quotes","parenthesis"],
    answer: "quotes"
},
{
    question:"A very useful tool used during development and debugging for printing content to the debugger is:",
    Options: ["JavaScript","terminal/bash","for loops","console log"],
    answer: "console log"
},
{
    question:"The condition in an if / else statement is enclosed within ___.",
    Options: ["quotes","curly brackets","paranthesis","square brackets"],
    answer: "curly brackets"
}
];

var countdown = function(event){
    event.preventDefault();
    clearQuizMemo();
    provideQuiz(questionNum);

    timeleft = 75;
    var timeInterval = setInterval(function(){
        if(timeleft > 0){
            timerEl.textContent = timeleft;
            timeleft--;
        }
        else {
            clearInterval(timeInterval)
            timerEl.textContent = 0;
            endQuiz();
        }
    },1000);
};

var quizHandler = function(event){
    i = 1;
    while (i < quizSet.length) {
        provideQuiz(i);
        if(userAnswer){
            validateAnswer(i,userAnswer);
            i++;
            continue;
        }
    }
};

function clearQuizMemo(){
    startQuizEl.remove();
    quizMemoEl.remove();
}

function provideQuiz(questionNum){
    quizHeader.textContent = quizSet[questionNum].question;
    listItemEl.style.visibility='visible';
    var options = "";
    for (let i = 0; i < quizSet[questionNum].Options.length; i++) {
        options = options + "<li class='quiz-option-list'><button class='quiz-option-btn'>" + quizSet[questionNum].Options[i] + "</button></li>";
    }
    listItemEl.innerHTML = options;
}

var endQuiz = function(){
    clearInterval();
    listItemEl.remove();
    answerEl.remove()
    quizHeader.textContent = "All Done!";
    scoreEl.textContent = "Your final score is "+ score + "."
    mainEl.appendChild(scoreEl);
    mainEl.appendChild(initialsEl);
}

var validateAnswer = function(questionnum,answer){
    if(answer===quizSet[questionnum].answer){
        answerEl.textContent = "Correct!";
        score = score + 5;
    }
    else {
        answerEl.textContent = "Wrong!";
        timeleft = timeleft -10;

    }
    mainEl.appendChild(answerEl);
    questionNum++;
    if(questionNum<quizSet.length){
        provideQuiz(questionNum);
    }
    else
        endQuiz();
}

var getAnswer = function(event){
    var selectedAnswerEl = event.target;
    if(selectedAnswerEl.matches(".quiz-option-btn")){
        selectedAnswerEl.style.background = "plum";
        userAnswer = selectedAnswerEl.textContent;
    }
    validateAnswer(questionNum,userAnswer);
}

var getHighScore = function(initial) {
    var scoreObj = {
        initial: initial,
        score: score
    };
    var localScoreObj = JSON.parse(window.localStorage.getItem("score")) || [];
    localScoreObj.push(scoreObj);
    window.localStorage.setItem("score",JSON.stringify(localScoreObj));
    localScoreObj.sort(function(a, b){return b.score - a.score});

    for (let i = 0; i < localScoreObj.length; i++) {
        if(localScoreObj[i].initial===initial){
            highestScore = localScoreObj[i].score;
            break;
        }
    }
}

var highScores = function(event){
    var initial = initialsEl.querySelector("input").value;

    // check if initials are empty (validate)
    if (!initial) {
        alert("You need to enter initials!");
        return false;
    }

    getHighScore(initial);
    scoreEl.remove();
    initialsEl.remove();
    quizHeader.textContent = "HighScores"

    highScoresEl.textContent = initial + " - " + highestScore ;

    var buttonGobackEl = document.createElement("button");
    buttonGobackEl.className = "quiz-option-btn";
    buttonGobackEl.textContent = "Go Back";
    buttonGobackEl.id = "go-back";

    var buttonClearHighscores = document.createElement("button");
    buttonClearHighscores.className = "quiz-option-btn";
    buttonClearHighscores.textContent = "Clear HighScores";
    buttonClearHighscores.id = "clear-highscore";

    buttonsEl.appendChild(buttonGobackEl);
    buttonsEl.appendChild(buttonClearHighscores);

    mainEl.appendChild(highScoresEl);
    mainEl.appendChild(buttonsEl)
}

var setPage = function(){
    window.location.reload();
}

var highScoreHandler = function(event){
    var targetEl = event.target;
    if(targetEl.matches("#go-back")){
        setPage();
    }
    else if(targetEl.matches("#clear-highscore")){
        highScores = 0;
        localStorage.setItem("score",highScores);
    }
}

startQuizEl.addEventListener("click",countdown);
listItemEl.addEventListener("click",getAnswer);
initialsEl.querySelector("button").addEventListener("click", highScores);
buttonsEl.addEventListener("click", highScoreHandler);