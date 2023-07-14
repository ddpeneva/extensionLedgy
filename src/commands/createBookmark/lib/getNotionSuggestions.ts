import axios from 'axios';

export const getNotionSuggestions = async (query = '') => {
    const { data } = await axios.get(`https://polite-gaufre-824dca.netlify.app/.netlify/functions/notion?query=${query}`);
    return data.pages;
};
