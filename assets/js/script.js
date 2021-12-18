var timerEl = document.querySelector("#timer");
var startQuizEl = document.querySelector("#quiz-start-btn");
var quizMemoEl = document.querySelector("#quiz_memo");
var mainEl = document.querySelector(".page-content");
var quiz = document.querySelector(".quiz-header");
var timeleft;
var userAnswer;
var questionNum = 0;

var listItemEl = document.createElement("ol");
listItemEl.className = "quiz-options";
mainEl.appendChild(listItemEl);
var answerEl = document.createElement("h2");
answerEl.className = "answer";


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
            timeInterval.textContent = 0;
        }
    },1000);
    //quiz();
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
    quiz.textContent = quizSet[questionNum].question;
    listItemEl.style.visibility='visible';
    var options = "";
    for (let i = 0; i < quizSet[questionNum].Options.length; i++) {
        options = options + "<li class='quiz-option-list'><button class='quiz-option-btn'>" + quizSet[questionNum].Options[i] + "</button></li>";
    }
    listItemEl.innerHTML = options;
}

var validateAnswer = function(questionnum,answer){
    if(answer===quizSet[questionnum].answer){
        answerEl.textContent = "Correct!";
    }
    else
        answerEl.textContent = "Wrong!";
    mainEl.appendChild(answerEl);
    questionNum++;
    if(questionNum<quizSet.length){
        provideQuiz(questionNum);
    }

}

var getAnswer = function(event){
    var selectedAnswerEl = event.target;
    if(selectedAnswerEl.matches(".quiz-option-btn")){
        selectedAnswerEl.style.background = "plum";
        userAnswer = selectedAnswerEl.textContent;
    }
    validateAnswer(questionNum,userAnswer);
}

startQuizEl.addEventListener("click",countdown);
listItemEl.addEventListener("click",getAnswer);