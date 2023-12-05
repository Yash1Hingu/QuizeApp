import { useState } from 'react';
import QUESTIONS from '../questions.js';
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleAnswerSelect(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })
    }
    
    return <div id="quiz">
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id='answers'>
                {QUESTIONS[activeQuestionIndex].answers.map((answer) =>
                    <li key={answer} className='answer'>
                        <button onClick={() => handleAnswerSelect(answer)}>{answer}</button>
                    </li>
                )}
            </ul>
        </div>
    </div>
}