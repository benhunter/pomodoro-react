import React, {useEffect, useState} from "react";
import './App.css';

const minutes = 25;
const seconds = 60;

function App() {
    document.title = "Pomodoro Timer"
    const [isRunning, setIsRunning] = useState(false);
    const [timeStartPomodoro] = useState(1000 * seconds * minutes);
    const [timeLeft, setTimeLeft] = useState(timeStartPomodoro);  // milliseconds remaining

    useEffect(() => {
        if (!isRunning) return;
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 100);
        }, 100);

        if (timeLeft <= 0) {
            setIsRunning(false);
            setTimeLeft(0);
        }

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    function resetTimer() {
        setIsRunning(false)
        setTimeLeft(timeStartPomodoro)
    }

    return (
        <div className="center">
            <div
                className="timer">
                {Math.floor((timeLeft / 1000 / 60) % 60).toString().padStart(2, '0')}:
                {Math.floor((timeLeft / 1000) % 60).toString().padStart(2, '0')}</div>
            <div>
                <button
                    className="start-button"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
            </div>
            <div>
                <button
                    className="reset-button"
                    onClick={() => resetTimer()}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
