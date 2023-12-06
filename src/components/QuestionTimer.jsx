import { useEffect, useState } from "react";
export default function QuestionTimer({ timer, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        console.log("SET TIMEOUT");
        const timerout = setTimeout(onTimeOut, timer);

        return () => {
            clearTimeout(timerout);
        }
    }, [timer, onTimeOut]);
    
    useEffect(() => {
        console.log("SET INTERVAL");
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <progress id='question-time' max={timer} value={remainingTime}/>
}