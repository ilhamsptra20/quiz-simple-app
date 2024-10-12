// Time.jsx
import React, { useEffect, useState } from 'react';

const Time = ({ initialTime, startCounting, resetCounting, onTimeEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        let timer;
            if (startCounting && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
            // Panggil callback ketika waktu habis
            if (onTimeEnd) {
                onTimeEnd();
            }
        }

        if (resetCounting) {
            setTimeLeft(initialTime); // Reset waktu jika resetCounting true
        }

        return () => clearInterval(timer);
    }, [startCounting, resetCounting, timeLeft, initialTime, onTimeEnd]);


    const formatTime = (secs) => {
        const remainingSeconds = secs % 60;
        return `${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-blue-200 p-2 rounded-sm flex gap-2 text-blue-600">
            Time Left 
            <span className="bg-black text-white px-1 font-medium rounded-sm" id='time'>
                <h2>{(resetCounting) ? "00" :  formatTime(timeLeft) }</h2>
            </span>
        </div>
    );
};

export default Time;
