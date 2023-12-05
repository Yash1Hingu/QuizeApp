import { useState } from 'react';
import QUIZ_COMPLETE from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js';
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleAnswerSelect(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })
    }

    if(quizIsComplete) {
        return <div id="summary">
            <img src={QUIZ_COMPLETE} alt="Quize Complete" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const suffleAnswers = QUESTIONS[activeQuestionIndex].answers;
    suffleAnswers.sort(() => Math.random() - 0.5);

    return <div id="quiz">
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id='answers'>
                {suffleAnswers.map((answer) =>
                    <li key={answer} className='answer'>
                        <button onClick={() => handleAnswerSelect(answer)}>{answer}</button>
                    </li>
                )}
            </ul>
        </div>
    </div>
}