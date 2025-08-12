import Redis from 'ioredis';

// Use the REDIS_URL provided by the user
// In a Vercel environment, this should be set as an environment variable
const redis = new Redis(process.env.REDIS_URL);

export default async function handler(request, response) {
  const counterKey = 'global_visit_count'; // Key to store the count in Redis

  if (request.method === 'POST') {
    // Increment the counter
    const newCount = await redis.incr(counterKey);
    return response.status(200).json({ count: newCount });
  } else if (request.method === 'GET') {
    // Get the current counter value
    const currentCount = await redis.get(counterKey);
    // If the counter doesn't exist yet, it will be null, so initialize to 0
    return response.status(200).json({ count: parseInt(currentCount || '0', 10) });
  } else {
    // Method Not Allowed
    return response.status(405).json({ message: 'Method Not Allowed' });
  }
}