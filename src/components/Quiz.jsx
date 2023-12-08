import { useCallback, useState } from 'react';
import Question from './Question.jsx';
import QUESTIONS from '../questions.js';
import Summary from './Summary.jsx';
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
        return <Summary userAnswers={userAnswers}/>
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