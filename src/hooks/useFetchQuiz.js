import { useState, useEffect } from 'react';
import { fetchQuizData } from '../api/apiQuiz';

const useFetchQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const response = await fetchQuizData();                
                setQuestions(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadQuizData();
    }, []);

    return { questions, loading, error };
};

export default useFetchQuiz;
