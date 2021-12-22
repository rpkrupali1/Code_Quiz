var timerEl = document.querySelector("#timer"); // timer element
var startQuizEl = document.querySelector("#quiz-start-btn"); // start quiz button
var quizMemoEl = document.querySelector("#quiz_memo"); // initial screen text
var mainEl = document.querySelector(".page-content"); //main element
var quizHeader = document.querySelector(".quiz-header"); // main header
var timeleft; // timer value
var userAnswer; // quiz option value selected by user
var questionNum = 0; //quetions number

//score element
var scoreEl = document.createElement("p");
scoreEl.className = "score";

// quiz list element
var listItemEl = document.createElement("ol");
listItemEl.className = "quiz-options";
mainEl.appendChild(listItemEl);
var score = 0; //initial score set to 0

// element to store the answer validation result as correct/wrong
var answerEl = document.createElement("h2");
answerEl.className = "answer";

// initials element
var initialsEl = document.createElement("div");
initialsEl.className = "initials";
initialsEl.innerHTML = "<p>Enter initials:</p><input type='text' placeholder='your initials'/><button type='submit' class='initials-submit'>Submit</button>"

//parent element to store buttons go back and clear highscore
var buttonsEl = document.createElement("div");
buttonsEl.style.textAlign = "left";
buttonsEl.id = "div-btn-highscore"

// highest score element
var highScoresEl = document.createElement("p")
highScoresEl.className = "highscores";

// hight score value
var highestScore;

//variable to store all quizes along with its answers
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

// start quiz from here
var countdown = function(event){
    event.preventDefault();
    clearQuizMemo(); //clear elements from prior page
    provideQuiz(questionNum); //show the quiz based on question number

    // start the timer
    timeleft = 75; //initial timer 
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

//provide quiz based on questions number
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

//clear initial screen once quiz is started
function clearQuizMemo(){
    startQuizEl.remove();
    quizMemoEl.remove();
}

// show the quiz on screen
function provideQuiz(questionNum){
    quizHeader.textContent = quizSet[questionNum].question;
    listItemEl.style.visibility='visible'; 

    //create dynamic options elements for the quiz
    var options = "";
    for (let i = 0; i < quizSet[questionNum].Options.length; i++) {
        options = options + "<li class='quiz-option-list'><button class='quiz-option-btn'>" + quizSet[questionNum].Options[i] + "</button></li>";
    }
    listItemEl.innerHTML = options;
}

//end the quiz
var endQuiz = function(){
    clearInterval();

    //remove quiz elements
    listItemEl.remove();
    answerEl.remove()

    quizHeader.textContent = "All Done!";

    // set the text for final score
    scoreEl.textContent = "Your final score is "+ score + "."
    mainEl.appendChild(scoreEl);
    mainEl.appendChild(initialsEl);
}

//check if provided answer is correct or wrong
var validateAnswer = function(questionnum,answer){
    if(answer===quizSet[questionnum].answer){
        answerEl.textContent = "Correct!";
        score = score + 5; //for correct answer increase score by 5
    }
    else {
        answerEl.textContent = "Wrong!";
        timeleft = timeleft -10; // for wrong answer decrease score by 10s
    }
    mainEl.appendChild(answerEl);
    questionNum++; //increase the question number to set for next

    if(questionNum<quizSet.length){
        provideQuiz(questionNum);
    }
    // set timer to zero if all questions are done
    else
    timeleft=0;
}

// get selected option from user
var getAnswer = function(event){
    var selectedAnswerEl = event.target;
    if(selectedAnswerEl.matches(".quiz-option-btn")){
        //change background for user selected option 
        selectedAnswerEl.style.background = "plum"; 
        userAnswer = selectedAnswerEl.textContent; //set the selected option
    }
    // check if user selected option is the correct answer
    validateAnswer(questionNum,userAnswer);
}

// get highest score by comparing current score with previous scores stored in local storage
var getHighScore = function(initial) {
    //save the current score and initials here
    var scoreObj = {
        initial: initial,
        score: score
    };
    //get the values from local storage else create blank array
    var localScoreObj = JSON.parse(window.localStorage.getItem("score")) || [];
    //push the current score to local storage
    localScoreObj.push(scoreObj);
    window.localStorage.setItem("score",JSON.stringify(localScoreObj));
    // sort the local storage value to set the highest score at top
    localScoreObj.sort(function(a, b){return b.score - a.score});

    // find initials and current score with local storage
    for (let i = 0; i < localScoreObj.length; i++) {
        if(localScoreObj[i].initial===initial){
            highestScore = localScoreObj[i].score;
            break;
        }
    }
}

var highScores = function(event){
    //save initials
    var initial = initialsEl.querySelector("input").value;

    // check if initials are empty (validate)
    if (!initial) {
        alert("You need to enter initials!");
        return false;
    }

    //get the highest score from local storage
    getHighScore(initial);

    //remove prior screen elements
    scoreEl.remove();
    initialsEl.remove();

    // update text contects with new header and highest score value
    quizHeader.textContent = "HighScores"
    highScoresEl.textContent = initial + " - " + highestScore ;

    //provide go back button
    var buttonGobackEl = document.createElement("button");
    buttonGobackEl.className = "quiz-option-btn";
    buttonGobackEl.textContent = "Go Back";
    buttonGobackEl.id = "go-back";

    //provide clear highscore button
    var buttonClearHighscores = document.createElement("button");
    buttonClearHighscores.className = "quiz-option-btn";
    buttonClearHighscores.textContent = "Clear HighScores";
    buttonClearHighscores.id = "clear-highscore";

    buttonsEl.appendChild(buttonGobackEl);
    buttonsEl.appendChild(buttonClearHighscores);

    mainEl.appendChild(highScoresEl);
    mainEl.appendChild(buttonsEl)
}

// set page to its original form 
var setPage = function(){
    window.location.reload();
}

//Handler to manage to go back to start quiz or clear highestscore
var highScoreHandler = function(event){
    var targetEl = event.target;
    if(targetEl.matches("#go-back")){
        setPage(); //set the page to its original form to start quiz again
    }
    else if(targetEl.matches("#clear-highscore")){
        //clear highscores
        highScores = 0;
        localStorage.setItem("score",highScores);
    }
}

// Start the quiz
startQuizEl.addEventListener("click",countdown);

//select options when provided questions
listItemEl.addEventListener("click",getAnswer);

//submit for initials and get highest score
initialsEl.querySelector("button").addEventListener("click", highScores);

//when quiz end then clear highscore or go back
buttonsEl.addEventListener("click", highScoreHandler);