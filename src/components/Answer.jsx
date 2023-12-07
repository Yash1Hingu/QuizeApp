import { useRef } from 'react';
export default function Answer({ 
    answers, 
    selectedAnswer, 
    answerState,
    onSelect
}) {
    const suffleAnswers = useRef();
    if (!suffleAnswers.current) {
        suffleAnswers.current = [...answers];
        suffleAnswers.current.sort(() => Math.random() - 0.5);
    }
    return <ul id='answers'>
        {suffleAnswers.current.map((answer) => {
            const isSelected = selectedAnswer === answer;
            let cssClass = '';
            if (answerState === 'answered' && isSelected) {
                cssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                cssClass = answerState;
            }
            return <li key={answer} className='answer'>
                <button
                    onClick={() => onSelect(answer)}
                    className={cssClass}
                >{answer}</button>
            </li>
        })}
    </ul>
}