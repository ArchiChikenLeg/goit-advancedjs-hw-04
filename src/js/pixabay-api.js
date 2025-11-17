import axios from 'axios';

const API_KEY = '53279240-6e40a1d36b66aedd6bbd928de';
const BASE_URL = 'https://pixabay.com/api/';

/**

 * @param {Object} options 
 * @param {string} options.query 
 * @param {number} [options.page=1] 
 * @param {number} [options.per_page=15] 
 * @returns {Promise<Object>} 
 */
export const searchImages = async ({ query, page = 1, per_page = 15 }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images with axios:', error);
    throw error;
  }
};
