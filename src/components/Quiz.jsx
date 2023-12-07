import { useCallback, useState, useRef } from 'react';
import QUIZ_COMPLETE from '../assets/quiz-complete.png'
import Question from './Question.jsx';
import QUESTIONS from '../questions.js';
export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleAnswerSelect = useCallback(function handleAnswerSelect(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex]);

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
            question={QUESTIONS[activeQuestionIndex].text}
            activeQuestionIndex={activeQuestionIndex}
            onTimeOut={handleSkipAnswer}
            answers={QUESTIONS[activeQuestionIndex].answers}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answerState={answerState}
            onSelect={handleAnswerSelect}
        />
    </div>
}