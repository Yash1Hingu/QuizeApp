import { useEffect, useState } from "react";
export default function QuestionTimer({ timer, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        setTimeout(onTimeOut, timer);
    }, [timer, onTimeOut]);

    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
        }, 100)
    }, [])

    return <progress id='question-time' max={timer} value={remainingTime}/>
}