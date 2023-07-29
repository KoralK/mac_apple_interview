let score = 0;
let currentQuestionIndex = 0;
let currentSingleQuestionIndex = 0;
let quizData = [];
let singleQuestionData = [];

function loadQuizData() {
    fetch('quiz_questions.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            displayQuizQuestion();
        });

    fetch('single_questions.json')
        .then(response => response.json())
        .then(data => {
            singleQuestionData = data;
            displaySingleQuestion();
        });
}

function displayQuizQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        alert('Quiz finished!');
        return;
    }

    let questionData = quizData[currentQuestionIndex];
    let questionText = document.getElementById('question-text');
    questionText.textContent = questionData.question;

    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    questionData.options.forEach((option, index) => {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'option' + index;
        checkBox.value = index;

        let label = document.createElement('label');
        label.htmlFor = 'option' + index;
        label.appendChild(document.createTextNode(option));

        optionsDiv.appendChild(checkBox);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });
}

function displaySingleQuestion() {
    if (currentSingleQuestionIndex >= singleQuestionData.length) {
        alert('All questions answered!');
        return;
    }

    let questionData = singleQuestionData[currentSingleQuestionIndex];
    let questionText = document.getElementById('single-question-text');
    questionText.textContent = questionData.question;
}

document.getElementById('check-answer').addEventListener('click', function() {
    let questionData = quizData[currentQuestionIndex];
    let selectedOptions = [];

    questionData.options.forEach((option, index) => {
        let checkBox = document.getElementById('option' + index);
        if (checkBox.checked) {
            selectedOptions.push(index);
        }
    });

    if (JSON.stringify(selectedOptions) === JSON.stringify(questionData.answers)) {
        score++;
    } else {
        score = Math.max(score - 1/3, 0);
    }

    document.getElementById('score').textContent = 'Score: ' + score;

    currentQuestionIndex++;
    displayQuizQuestion();
});

document.getElementById('show-answer').addEventListener('click', function() {
    let questionData = singleQuestionData[currentSingleQuestionIndex];
    document.getElementById('answer').textContent = 'Answer: ' + questionData.answer;

    currentSingleQuestionIndex++;
    displaySingleQuestion();
});

loadQuizData();
