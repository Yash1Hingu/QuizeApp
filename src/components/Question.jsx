import { useState } from 'react';

import QuestionTimer from "./QuestionTimer";
import QUESTIONS from '../questions.js';
import Answer from "./Answer";
export default function Question({
    index,
    onTimeOut,
    onSelect
}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(newAnswer) {
        setAnswer({
            selectedAnswer: newAnswer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: newAnswer,
                isCorrect: QUESTIONS[index].answers[0] === newAnswer
            })

            setTimeout(() => {
                onSelect(newAnswer);
            }, 2000)
        }, 1000)
    }

    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer) {
        answerState = 'answered';
    }

    return <div id="question">
        <h2>{QUESTIONS[index].text}</h2>
        <QuestionTimer
            timer={10000}
            onTimeOut={onTimeOut}
        />
        <Answer
            answers={QUESTIONS[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
}