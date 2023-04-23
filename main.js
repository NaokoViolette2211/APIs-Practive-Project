//1. fetch url
//2. get only necessary content from the url and create a new array
//3. insert a question
//4. by forEach, create input/label elements. 
//5. insert multiple answers
//6. use if to compare the answer. if the answer is selected and submit button is clicked, use alert to display correct or incorrect. 
//7 if an answer is not selected and submit button is clicked, show warning.


const url = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple';



let currentQuestionIndex = 0;
let quiz = [];

//=============== get Api quizes =====================
const getApi = async () => {
  try {
    const res = await fetch(url);
    const jsonData = await res.json();
    const data = jsonData.results;
    // console.log(data)
    quiz = data.map(result => {
      return {
        question: result.question,
        choices: result.incorrect_answers.concat(result.correct_answer),
        answer: result.correct_answer,
      };
    });
    // console.log(quiz)
  } 
  catch (error) {
    console.error('Oh no! Error!!!', error);
  }
}

//============= create a quiz ====================
const getQuestion = async () => {
  await getApi();
  
  const p = document.getElementById('quizNumber');
  p.innerHTML = currentQuestionIndex + 1 + " / 10";
  const currentQuestion = quiz[currentQuestionIndex];
  console.log(currentQuestion.question);
  const questionBox = document.getElementById('questionBox');
  questionBox.innerHTML = currentQuestion.question;

  const choiceBox = document.getElementById('choiceBox');
  choiceBox.innerHTML = '';

  currentQuestion.choices.forEach(choice => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'anime';
    input.value = choice;
    choiceBox.appendChild(input);

    const label = document.createElement('label');
    label.innerHTML = choice;
    choiceBox.appendChild(label);

    const br = document.createElement('br');
    choiceBox.appendChild(br);
  })
}
getQuestion();

//============ check answer ==================
const nextBtn = document.getElementById('btn');
nextBtn.addEventListener('click', () => {
  const selectedAnswer = document.querySelector('input[name="anime"]:checked');
  if(selectedAnswer) {
    if(selectedAnswer.value === quiz[currentQuestionIndex].answer) {
      alert('correct!');
    }else {
      alert('incorrect... Try again');
    }
    currentQuestionIndex++;

    if(currentQuestionIndex === quiz.length) {
      const mainBox = document.getElementById('mainBox');
      mainBox.innerText = 'Finished, Well done! '
      nextBtn.disabled = true;
    } else {
      getQuestion();
    }
  }else {
    alert('Please select your answer');
  }
});

// const p = document.getElementById('quizNumber');
// p.innerHTML = currentQuestionIndex + 1 + " / 10";
