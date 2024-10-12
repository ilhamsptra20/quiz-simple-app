import React, { useState } from 'react'

const Option = ({ label, value, isCounting, selectedAnswer, correctAnswer, onSelect }) => {
    const getButtonClass = () => {
        if (isCounting) {
            return selectedAnswer === label
                ? "border-sky-500 bg-sky-100 bg-sky-300"
                : "border-sky-500 bg-sky-100 hover:bg-sky-200";
        } else {
            if (selectedAnswer === label && selectedAnswer === correctAnswer) {
                return "border-green-500 bg-green-100 text-green-500";
            } else if (selectedAnswer === label && selectedAnswer !== correctAnswer) {
                return "border-red-500 bg-red-100 text-red-500";
            } else if (label === correctAnswer) {
                return "border-green-500 bg-green-100 text-green-500";
            } else {
                return 'bg-gray-400 text-white'; // Tombol lainnya
            }
        }
    };

    return (
        <button
            onClick={() => onSelect(label)}
            className={`text-2xl border-2 rounded-md  md:cursor-pointer  p-3 text-left ${getButtonClass()}`}
            disabled={!isCounting} // Nonaktifkan tombol jika tidak dalam hitung mundur
        >
            <span className="capitalize">{label} </span>
            <span className="">{value}</span>
        </button>
        // <label className={` ${indicator[status]} `}>
        //     <input 
        //         type='radio' 
        //         value={props.label} 
        //         className="hidden"
        //         checked={props.selectedAnswer === props.label}
        //         onChange={() => props.onSelect(props.label)}
        //     />
        //     <span className="capitalize">{props.label} </span>
        //     <span className="">{props.value}</span>
        // </label>
    )
}

export default Option