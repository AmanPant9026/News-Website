import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await signOut(auth);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
