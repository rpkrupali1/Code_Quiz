var timerEl = document.querySelector("#timer");
var startQuizEl = document.querySelector("#quiz-start-btn");
var quizMemoEl = document.querySelector("#quiz_memo");
var mainEl = document.querySelector(".page-content");
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
    var timeleft = 75;    
    var timeInterval = setInterval(function(){
        if(timeleft > 0){
            timerEl.textContent = timeleft;
            timeleft--;
        }
        else {
            clearInterval(timeInterval)
            timeInterval.textContent = 0;
        }
    },1000);
    quiz();
};

function quiz(){
    startQuizEl.remove();
    quizMemoEl.remove();
    var quiz = document.querySelector(".quiz-header");
    quiz.textContent = quizSet[0].question;

    var listItemEl = document.createElement("ol");
    listItemEl.className = "quiz-options";
    var options = "";
    for (let i = 0; i < quizSet[0].Options.length; i++) {
        options = options+ "<li class='quiz-option-list'><button class='quiz-option-btn'>" + quizSet[0].Options[i] + "</button></li>";
    }
    listItemEl.innerHTML = options;
    mainEl.appendChild(listItemEl);
}

var validateAnswer = function(event){
    var selectedAnswerEl = event.target;
    var answer;
    if(selectedAnswerEl.matches(".quiz-option-btn")){
        selectedAnswerEl.style.background = "plum";
        answer = selectedAnswerEl.textContent;
        checkAnswer(answer)
    }
}

var checkAnswer = function(answer){
    var answerEl = document.createElement("h2");
    answerEl.className = "answer";
    if(answer===quizSet[0].answer){
        answerEl.textContent = "Correct!";
    }
    else
        answerEl.textContent = "Wrong!";
    mainEl.appendChild(answerEl);
}

//var optionSelectedEl = document.querySelector(".quiz-option-btn");

startQuizEl.addEventListener("click",countdown);
mainEl.addEventListener("click",validateAnswer);
