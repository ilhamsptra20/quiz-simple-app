// AnswerButton.js
import React from 'react';

const AnswerButton = ({ answer, isCounting, selectedAnswer, correctAnswer, onSelect }) => {
    const getButtonClass = () => {
        if (isCounting) {
            return selectedAnswer === answer
                ? "border-sky-500 bg-sky-100 bg-sky-300"
                : "border-sky-500 bg-sky-100 hover:bg-sky-200";
        } else {
            if (selectedAnswer === answer && selectedAnswer === correctAnswer) {
                return "border-green-500 bg-green-100 text-green-500";
            } else if (selectedAnswer === answer && selectedAnswer !== correctAnswer) {
                return "border-red-500 bg-red-100 text-red-500";
            } else if (answer === correctAnswer) {
                return "border-green-500 bg-green-100 text-green-500";
            } else {
                return 'bg-gray-400 text-white'; // Tombol lainnya
            }
        }
    };

    return (
        <button
            onClick={() => onSelect(answer)}
            className={`px-4 py-2 rounded ${getButtonClass()}`}
            disabled={!isCounting} // Nonaktifkan tombol jika tidak dalam hitung mundur
        >
            {answer}
        </button>
    );
};

export default AnswerButton;
