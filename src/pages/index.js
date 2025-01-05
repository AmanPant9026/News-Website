import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/role-selection'); // Redirect to the role selection page
  }, [router]);

  return null; // Render nothing while redirecting
};

export default Home;
