export default function handler(req, res) {
    if (req.method === 'POST') {
      const { articles, rate } = req.body;
  
      if (!articles || !rate) {
        return res.status(400).json({ error: 'Invalid data provided' });
      }
  
      const totalPayout = articles.length * rate;
      res.status(200).json({ totalPayout });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  