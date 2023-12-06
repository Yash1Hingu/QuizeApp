import { useEffect, useState } from "react";
export default function QuestionTimer({ timer, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        console.log("SET TIMEOUT");
        setTimeout(onTimeOut, timer);
    }, [timer, onTimeOut]);
    
    useEffect(() => {
        console.log("SET INTERVAL");
        setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
        }, 100)
    }, [])

    return <progress id='question-time' max={timer} value={remainingTime}/>
}