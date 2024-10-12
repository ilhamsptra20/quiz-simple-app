
import React, { useState } from 'react';
import useFetchQuiz from '../hooks/useFetchQuiz';

const Quiz = () => {
  const { questions, loading, error } = useFetchQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (label) => {
    setSelectedAnswer(label);
  };

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
    setSelectedAnswer('');
  };

  if (showResult) {
    return <p>Your score is {score} out of {questions.length}</p>;
  }

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option.label}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option.label}
                checked={selectedAnswer === option.label}
                onChange={() => handleAnswerSelection(option.label)}
              />
              {option.label}. {option.value}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
