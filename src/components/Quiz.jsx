import { useCallback, useState, useRef } from 'react';
import QUIZ_COMPLETE from '../assets/quiz-complete.png'
import Question from './Question.jsx';
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



    return <div id="quiz">
        <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onTimeOut={handleSkipAnswer}
            onSelect={handleAnswerSelect}
        />
    </div>
}