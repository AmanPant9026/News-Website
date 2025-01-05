import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: '702462df5e4b4220be9870257d5e3b2c',
        country: 'us',
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
}
