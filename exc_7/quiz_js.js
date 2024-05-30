// Define an array of questions with their corresponding answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "NaCl", "CH4"],
        correctAnswer: "H2O"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    }
];


// Function to select 4 random questions from the questions array
function selectRandomQuestions() {
    const selectedQuestions = [];
    while (selectedQuestions.length < 4) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(randomIndex)) {
            selectedQuestions.push(randomIndex);
        }
    }
    return selectedQuestions.map(index => questions[index]);
}

// random 4 questions from the data
let tempQuizQuestions = selectRandomQuestions();

// new questions array - each answers array converted to li elem - for future use
let quizQuestions = tempQuizQuestions.map(question => {
    // Create a copy of the question object
    let copiedQuestion = { ...question };

    // Modify the answers array by wrapping each answer in an <li> element
    copiedQuestion.answers = copiedQuestion.answers.map(answer => `<li>${answer}</li>`);

    // Return the modified question object
    return copiedQuestion;
});

// check log
console.log(quizQuestions);

let questionsCounter = 1;
insertQuestionsToDom();
 // create questions div and insert them to DOM questions-page
function insertQuestionsToDom(){
    for (let question of quizQuestions){
        let questionPage = document.createElement("div")
        questionPage.classList.add("question")
        questionPage.setAttribute("class",`question-${questionsCounter}`);
        questionPage.style.display = "none";

        let headlineSection = document.createElement("h3")
        headlineSection.classList.add("question-headline")
        headlineSection.innerText = question.question
        questionPage.appendChild(headlineSection)

        let optionalAnswersSection = document.createElement("div")
        optionalAnswersSection.classList.add("optional-answers")
        for (let answer of question.answers){
            optionalAnswersSection.innerHTML += answer
        }
        questionPage.appendChild(optionalAnswersSection)

        let buttonsSection = document.createElement("div");
        let nextButtonElement = document.createElement("button");
        nextButtonElement.setAttribute("class",`question-${questionsCounter}`);
        nextButtonElement.setAttribute("class",`button-${questionsCounter}`);
        // nextButtonElement.id = questionsCounter
        nextButtonElement.textContent = "next question >"
        nextButtonElement.onclick = function() {
            nextQuestion(this);
        };
        buttonsSection.appendChild(nextButtonElement);
        questionPage.appendChild(buttonsSection)

        document.querySelector(".questions-page").appendChild(questionPage)
        questionsCounter ++;
    }
}
function startQuiz(){
    document.querySelector(`.opening-page`).style.display = "none"
    document.querySelector(`.questions-page`).style.display = "block"
    document.querySelector(".question-1").style.display = "block"
}

function nextQuestion(buttonItem){
    let itemId = buttonItem.className.split("-")[1];
    let nextItemId = parseInt(itemId) + 1;
    document.querySelector(`.question-${itemId}`).style.display = "none";
    document.querySelector(`.question-${nextItemId}`).style.display = "block";
}
