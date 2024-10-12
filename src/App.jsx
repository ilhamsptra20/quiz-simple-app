import React, { useState, useEffect } from 'react';
import { Question, Option, Time, Loading, } from './components/';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import useFetchQuiz from './hooks/useFetchQuiz';
import Swal from 'sweetalert2'; // Impor SweetAlert
import ProgressBar from './components/ProgressBar/';

export default function Testing() {
    const { questions, loading, error } = useFetchQuiz();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (error) return <p>Error: {error}</p>;

    const [selectedAnswer, setSelectedAnswer] = useState(null); 
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestion = questions.length;

    const [isCounting, setIsCounting] = useState(false);
    const [reset, setReset] = useState(false);
    const [autoRestartTimeout, setAutoRestartTimeout] = useState(null);

    const handleStart = () => {
        setIsCounting(true);
        setReset(false); // Menghilangkan reset saat countdown dimulai kembali
    };

    const handleAutoRestart = () => {
        // Hentikan timeout yang ada jika sudah ada
        if (autoRestartTimeout) {
            clearTimeout(autoRestartTimeout);
        }

        const timeoutId = setTimeout(() => {
            console.log('Auto-restart countdown setelah 5 detik');
            handleNext(); // Panggil handleNext saat timeout berakhir
        }, 5000);

        setAutoRestartTimeout(timeoutId); // Simpan ID timeout
    };

    const handleTimeEnd = () => {
        console.log('Countdown finished!');
        setIsCounting(false); // Hentikan countdown sementara
        if (currentQuestionIndex < totalQuestion - 1) {
            setReset(true); // Reset countdown
            handleAutoRestart(); // Panggil auto-restart setelah 5 detik
            // Tampilkan alert menggunakan SweetAlert
            Swal.fire({
                title: 'Waktu Habis!',
                text: 'Waktumu telah habis untuk pertanyaan ini. Melanjutkan ke pertanyaan berikutnya.',
                icon: 'info',
                confirmButtonText: 'OK',
                timer: 5000, // Menentukan durasi timer dalam milidetik
                timerProgressBar: true, // Menampilkan progress bar
            });
        } else {
            Swal.fire({
                title: 'Waktu Habis!',
                text: 'Waktumu telah habis untuk pertanyaan ini. Melanjutkan ke pertanyaan berikutnya.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleAnswerSelect = (label) => {
        if (isCounting) {
            setSelectedAnswer(label);
            console.log(label);
        }
    };

    // Fungsi untuk mengatur pergeseran ke pertanyaan berikutnya
    const handleNext = () => {
        if(isCounting){
            return
        }
        if (currentQuestionIndex < totalQuestion - 1) {
            if (autoRestartTimeout) {
                clearTimeout(autoRestartTimeout);
            }
            setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Pergi ke pertanyaan berikutnya
            setSelectedAnswer(null); // Reset jawaban yang dipilih
            setIsCounting(true); // Mulai kembali countdown
            setReset(false); // Hapus reset
        } else {
            // Menangani jika sudah mencapai pertanyaan terakhir
            Swal.fire({
                title: 'Quiz Selesai!',
                text: 'Terima kasih telah mengikuti kuis ini!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    };

    // useEffect untuk memulai countdown saat komponen dirender
    useEffect(() => {
        handleStart(); // Mulai countdown saat komponen pertama kali dirender
        
        // Fungsi pembersihan
        return () => {
            console.log('Melakukan pembersihan...');
            setIsCounting(false); // Hentikan countdown jika perlu
            setReset(true); // Reset state
            if (autoRestartTimeout) {
                clearTimeout(autoRestartTimeout); // Hentikan timeout auto-restart saat unmount
            }
        };
    }, []); // Kosongkan array dependensi untuk hanya berjalan saat pertama kali dirender

    return (
        <div className="w-full h-screen flex justify-center items-center bg-blue-600 select-none">
            <div className="w-11/12 lg:w-1/2 min-h-[50vh] bg-white rounded-md">
            {!loading ? (
                <div>
                    <div className="px-5 py-3 flex justify-between items-center shadow" id="card-header">
                        <h1 className="text-lg font-semibold">Basic Math Test</h1>
                        {/* <h1>Progress {progress}</h1> */}
                        <Time 
                            initialTime={10}
                            startCounting={isCounting}
                            resetCounting ={reset}
                            onTimeEnd={handleTimeEnd}
                        />
                    </div>
                        <ProgressBar 
                        initialTime={10}
                        startCounting={isCounting}
                        resetCounting ={reset}
                        onTimeEnd={handleTimeEnd}
                        />
                    <div className="p-5 shadow" id="card-body">
                        <Question text={currentQuestion.question}/>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {currentQuestion.options.map((option) => (
                            <Option
                                key={option.label}
                                label={option.label} 
                                value={option.value} 
                                isCounting={isCounting}
                                selectedAnswer={selectedAnswer}
                                correctAnswer={currentQuestion.correctAnswer}
                                onSelect={handleAnswerSelect}
                            />
                        ))}
                        </div>
                    </div>
                    <div className="px-5 py-3 flex justify-between" id="card-footer">
                        <h3>{currentQuestionIndex + 1} of {totalQuestion} Questions</h3>
                        <div className="flex gap-4"> 
                            <button type="button" className='flex items-center' onClick={handleNext}>
                                Next<FiChevronsRight size={25}/>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
            </div>
        </div>
    );
}
