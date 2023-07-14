import axios from 'axios';

export const submitBookmark = async (bookmark: Bookmark) => {
  const response = await axios.post('https://polite-gaufre-824dca.netlify.app/.netlify/functions/links', bookmark);
  console.log(response);
  return response;
};
