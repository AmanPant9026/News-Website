/**
 * Calculates the total payout for a given number of articles and rate.
 * @param {number} articles - The number of articles/blogs.
 * @param {number} rate - The payout rate per article.
 * @returns {number} Total payout.
 */
export const calculateTotalPayout = (articles, rate) => {
    if (!articles || !rate) {
      console.error('Invalid inputs for calculating payout.');
      return 0;
    }
    return articles * rate;
  };
  