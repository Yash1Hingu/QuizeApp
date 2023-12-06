import { useCallback, useState } from 'react';
import QUIZ_COMPLETE from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleAnswerSelect = useCallback(function handleAnswerSelect(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })
    }, []);

    const handleSkipAnswer = useCallback(() => handleAnswerSelect(null), [])

    if (quizIsComplete) {
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
            <QuestionTimer
                key={activeQuestionIndex}
                timer={10000}
                onTimeOut={handleSkipAnswer}
            />
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