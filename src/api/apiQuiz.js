import axios from 'axios';

export const fetchQuizData = async () => {
    try {
        const response = await axios.get(`/api/questions`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch quiz data');
    }
};

