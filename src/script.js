import { quizQuestionData } from "./dataQuestion.js";
const quiz = document.querySelector('.quiz');
const options = quiz.querySelectorAll('button');
let playerScore = 0;
let currentQuestion = 0;
let playerWrongAnswer = 0;
let playerCorrectAnswer = 0;

function updateQuiz(questionData) {
    quiz.querySelector('h2').innerHTML = questionData.question;

    options.forEach((option, i) => {
        option.innerHTML = questionData.option[i];
        option.onclick = () => userChoice(questionData, i);
    });

    options.forEach((option) => {
        option.disabled = false;
        option.classList.remove('bg-red-200','bg-green-200');
    });
}

updateQuiz(quizQuestionData[currentQuestion]);


function userChoice(questionData, i) {
    if (i === questionData.answer){
        options[i].classList.add('bg-green-200');
        options[i].classList.remove('hover:bg-black','hover:text-white');
        options.forEach((option) => {
            option.disabled = true;
            option.classList.remove('hover:bg-black','hover:text-white');
        });
        playerScore += 10;
        playerCorrectAnswer += 1;
    } else {
        options[i].classList.add('bg-red-200');
        options[i].classList.remove('hover:bg-black','hover:text-white');
        options[questionData.answer].classList.add('bg-green-200');
        options.forEach((option) => {
            option.disabled = true;
            option.classList.remove('hover:bg-black','hover:text-white');
        });
        playerWrongAnswer += 1;
    }
}

const nextButton = document.querySelector('.next-button');

nextButton.addEventListener('click', () => {
    if (currentQuestion < quizQuestionData.length -1) {
        currentQuestion ++
        if (currentQuestion === quizQuestionData.length -1) {
            nextButton.innerHTML = 'Finish';
            nextButton.addEventListener('click', () => {
                if (playerCorrectAnswer >= 7) {
                    document.querySelector('.container').innerHTML = `
                    <div class="flex flex-col items-center">
                        <dotlottie-player src="https://lottie.host/e78c29a1-f4c3-4174-8230-4c0494391940/6grwGXTfTl.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
                        <h1 class="text-3xl font-bold">CONGRATULATIONS</h1>
                        <h2 class="text-base font-semibold">Your Score is ${playerScore}</h2>
                        <p class="text-xs font-semibold mt-2">
                            <span class="text-red-500">❌ Wrong: ${playerWrongAnswer}</span> || <span class="text-green-500">✅ Correct: ${playerCorrectAnswer}</span>
                        </p>
                    </div>
                    <button onclick="location.reload()" class="next-button px-8 py-2 bg-purple-950 text-white text-xs font-bold rounded-md max-w-fit mt-5 md:px-10">Try Again</button>
                    `
                } else if (playerCorrectAnswer < 7) {
                    document.querySelector('.container').innerHTML = `
                    <div class="flex flex-col items-center">
                        <dotlottie-player src="https://lottie.host/1c0b0351-a7f9-42a8-8579-24355b5f0741/2xtYYUHU1q.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
                        <h1 class="text-3xl font-bold">DON'T GIVE UP</h1>
                        <h2 class="text-base font-semibold">Your Score is ${playerScore}</h2>
                        <p class="text-xs font-semibold mt-2">
                            <span class="text-red-500">❌ Wrong: ${playerWrongAnswer}</span> || <span class="text-green-500">✅ Correct: ${playerCorrectAnswer}</span>
                        </p>
                    </div>
                    <button onclick="location.reload()" class="next-button px-8 py-2 bg-purple-950 text-white text-xs font-bold rounded-md max-w-fit mt-5 md:px-10">Try Again</button>
                    `
                }
            });
        }
    } else {
        currentQuestion = 0;
    }
    updateQuiz(quizQuestionData[currentQuestion]);
});