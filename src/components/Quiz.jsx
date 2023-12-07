import { useCallback, useState, useRef } from 'react';
import QUIZ_COMPLETE from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';
export default function Quiz() {
    const suffleAnswers = useRef();
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

    if (!suffleAnswers.current) {
        suffleAnswers.current = QUESTIONS[activeQuestionIndex].answers;
        suffleAnswers.current.sort(() => Math.random() - 0.5);
    }

    return <div id="quiz">
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <QuestionTimer
                key={activeQuestionIndex}
                timer={10000}
                onTimeOut={handleSkipAnswer}
            />
            <ul id='answers'>
                {suffleAnswers.current.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = '';
                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    }

                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState;
                    }
                    return <li key={answer} className='answer'>
                        <button
                            onClick={() => handleAnswerSelect(answer)}
                            className={cssClass}
                        >{answer}</button>
                    </li>
                })}
            </ul>
        </div>
    </div>
}