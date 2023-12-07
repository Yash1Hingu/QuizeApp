import QuestionTimer from "./QuestionTimer";
import Answer from "./Answer";
export default function Question({
    question,
    activeQuestionIndex,
    onTimeOut,
    answers,
    selectedAnswer,
    answerState,
    onSelect
}) {
    return <div id="question">
        <h2>{question}</h2>
        <QuestionTimer
            timer={10000}
            onTimeOut={onTimeOut}
        />
        <Answer
            answers={answers}
            selectedAnswer={selectedAnswer}
            answerState={answerState}
            onSelect={onSelect}
        />
    </div>
}