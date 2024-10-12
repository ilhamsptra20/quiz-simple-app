import React, { useEffect, useState } from 'react';

const ProgressBar = ({ initialTime, startCounting, resetCounting, onTimeEnd }) => {
    const initialTimeInMs = (initialTime-2.9) * 1000
    const [progress, setProgress] = useState(100)
    const totalSteps = initialTimeInMs / 1; // Total langkah untuk durasi
    const percentagePerInterval = (100 / totalSteps); // Persentase per interval 10ms

        useEffect(() => {
            let timer;
                if (startCounting && progress > 0) {
                timer = setInterval(() => {
                    setProgress((prev) => (prev > 0 ? prev - percentagePerInterval : prev))
                }, 1);
            } else if (progress === 0) {
                clearInterval(timer);
                // Panggil callback ketika waktu habis
                if (onTimeEnd) {
                    onTimeEnd();
                }
            }

            if (resetCounting) {
                setProgress(100); // Reset waktu jika resetCounting true
            }

            return () => clearInterval(timer);
        }, [startCounting, resetCounting, progress, initialTime, onTimeEnd]);


    return (
        <div className="w-full bg-gray-200 rounded-full h-[4px]">
            <div
                className="bg-blue-600 h-full rounded-full0"
                style={{ width: `${(!resetCounting)?progress:0}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
