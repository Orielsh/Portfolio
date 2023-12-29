'use strict'

const questions = [
  /*
  {
    question: 'שאלון הטריויה שיסעיר אתכם! מוכנים להתחיל?',
    answer: ['חד מש', 'לגמרי', 'כן', 'אם אין ברירה, אז בסדר..'],
    correctAnswer: ['חד מש', 'לגמרי', 'כן', 'אם אין ברירה, אז בסדר..']
  },
  */
  {
    question: 'מאיפה מקבלים אריות את רוב המים שלהם?',
    answer: ['מהטרף שלהם', 'מנחלים'],
    correctAnswer: 'מהטרף שלהם'
  },
  {
    question: 'מכמה נוירונים מורכב המוח הממוצע?',
    answer: ['100 אלף', 'מיליון', 'מאה מיליארד', '10 מיליון','800','המוח לא מורכב מנוירונים'],
    correctAnswer: 'מאה מיליארד'
  },
  {
    question: 'מה סוג הסוכר שיש בחלב?',
    answer: ['פרוקטוז', 'גלקטוז', 'סוכרוז', 'לקטוז'],
    correctAnswer: 'לקטוז'
  },
  {
    question: 'באיזו שנה טבעה הטיטאניק?',
    answer: ['1921', '1915', '1912', '1927'],
    correctAnswer: '1912'
  },
  {
    question: 'באיזו תקופה גאולוגית חי הדינוזאור הטורף טירנוזאור רקס?',
    answer: ['פלאוגן', 'קרטיקון', 'יורה', 'פרם'],
    correctAnswer: 'קרטיקון'
  },
  {
    question: 'איך קוראים לאטום עם מטען חשמלי חיובי או שלילי?',
    answer: ['מולקולה', 'אלקטרון', 'פרוטון', 'יון'],
    correctAnswer: 'יון'
  }
];

let score = 0;
let currentQuestionIndex = 0;

const elmProgress = document.querySelector('#questionNum');
const elmScore = document.querySelector('#totalScore');
const elmQuestion = document.querySelector('#question');
const elmAnswers = document.querySelector('#answers');

function userChoose(answerButton) {

  const answer = answerButton.innerText;

  // 1. is the answer correct ? if yes: add 10 points to score
  if (answer === questions[currentQuestionIndex].correctAnswer) {
    score += 10;
  }

  // 2. advance one question (currentQuestionIndex++)
  currentQuestionIndex++;

  // 3. get rid of previous answer elements
  elmAnswers.innerHTML = '';

  // 4. update the UI (html)
  updateDisplay();
}

function updateDisplay() {

  elmScore.innerText = `${score} נקודות`;
  const answerElementsArray = document.querySelectorAll('.answer');

  // is game over ?
  if (questions.length === currentQuestionIndex) {
    elmProgress.innerText = `שאלה ${currentQuestionIndex} מתוך ${questions.length}`;
    elmQuestion.innerHTML = 
    `
      המשחק הסתיים
      </br></br>
      צברת ${score} נקודות
      </br>
      מתוך סך הכל ${questions.length*10} אפשריות
    `;
    for (let i=0; i<answerElementsArray.length; i++) {
      answerElementsArray[i].remove();
    };
    return;
  }

  elmProgress.innerText = `שאלה ${currentQuestionIndex+1} מתוך ${questions.length}`;

  elmQuestion.innerText = questions[currentQuestionIndex].question;

  // create answer elements ...
  const numberOfAnswers = questions[currentQuestionIndex].answer.length

  for (let i=0; i<numberOfAnswers; i++) {
    const answerElement = document.createElement('button');
    answerElement.classList.add('answer');
    answerElement.onclick = function() {userChoose(this)};
    answerElement.innerText = questions[currentQuestionIndex].answer[i]
    elmAnswers.appendChild(answerElement);
  };

}

updateDisplay();