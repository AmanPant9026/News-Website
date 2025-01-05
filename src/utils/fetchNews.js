import axios from 'axios';

/**
 * Fetches news data from the NewsAPI.
 * @returns {Promise<Object[]>} List of news articles.
 */
export const fetchNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: '702462df5e4b4220be9870257d5e3b2c', // Replace with your NewsAPI key
        country: 'us',
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    throw new Error('Failed to fetch news data.');
  }
};
