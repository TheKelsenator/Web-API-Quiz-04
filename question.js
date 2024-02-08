var questions = [
    {
        title: "Which of the following is true about variable naming conventions in JavaScript?",
        choices: ["JavaScript variable names must begin with a letter or the underscore character.", 
                "JavaScript varablie names are case sensitive.", "Both of the above.", "None of the above."],
        answer: "Both of the above."
    },
    {
        title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        choices: ["last()", "put()", "push()", "None of the above."],
        answer: "push()"
    },
    {
        title: "Which built-in method reverses the order of the elements of an array?",
        choices: ["changeOrder(order)", "reverse()", "sort(order)", "None of the above."],
        answer: "reverse()"
    },
    {
        title: "Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
        choices: ["toSource()", "valueOf()", "toString()", "None of the above."],
        answer: "toString()"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["alert('Hello World')", "msg('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')"],
        answer: "alert('Hello World')"
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["javascript tag", "script tag", "js tag", "scripting tag"],
        answer: "script tag"
    },
    {
        title: "How do you create a function in JavaScript?",
        choices: ["function myFunction()", "function=myFunction()", "function:myFunction()", "myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "How to write an IF statement in JavaScript?",
        choices: ["if i=5 then", "if(i==5)", "if i=5", "if i==5 then"],
        answer: "if(i==5)"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section", "The <body> section", "Both the <head> section and the <body> section are correct"],
        answer: "Both the <head> section and the <body> section are correct"
    },

];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 121;

var holdInterval = 0;

var penalty = 10;

var ulCreate = document.createElement("ul");


timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});


function render(questionIndex) {
 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
  
    for (var i = 0; i < questions.length; i++) {
   
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }    
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
       
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
         
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
   
    questionIndex++;

    if (questionIndex >= questions.length) {
        
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

 
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);


    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

   
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

 
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

 
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.replace("./highscore.html");
        }
    });

}
