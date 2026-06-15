const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 5 × 6?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Who developed JavaScript?",
        options: [
            "Brendan Eich",
            "Bill Gates",
            "Mark Zuckerberg",
            "James Gosling"
        ],
        answer: "Brendan Eich"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const q = quizData[currentQuestion];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");

        btn.addEventListener("click", () => checkAnswer(btn, option));

        optionsEl.appendChild(btn);
    });
}

function checkAnswer(button, selectedOption) {
    const correctAnswer = quizData[currentQuestion].answer;

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");

        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    scoreEl.textContent =
        `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    loadQuestion();
}

loadQuestion();