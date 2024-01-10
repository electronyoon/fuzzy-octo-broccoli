import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

import { createClient as createRedisClient } from 'redis';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const redisUrl = process.env.redisUrl;
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

let redis = null;
let supabase = null;

const connectToRedis = async () => {
  redis = await createRedisClient({
    url: redisUrl
  })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
};

// Function to connect to Supabase
const connectToSupabase = () => {
  supabase = createSupabaseClient(supabaseUrl, supabaseKey);
  console.log('Connected to Supabase');
};

// Initialize Redis and Supabase connections
await connectToRedis();
connectToSupabase();

app.get('/posts', async (req, res) => {
    try {
      if (redis) {
        const cachedPosts = await redis.lRange('ltsposts', 0, 9);
  
        if (cachedPosts.length > 0) {
          const parsedPosts = cachedPosts.map(post => JSON.parse(post));
          console.log('Serving Redis Cache');
          return res.status(200).json({ posts: parsedPosts, source: 'Redis Cache' });
        }
      }
  
      console.log('Serving Supabase');
      if (!supabase) {
        console.log('Supabase not initialized. Reconnecting...');
        connectToSupabase();
      }
  
      const { data: supabasePosts, error } = await supabase
        .from('posts')
        .select('*')
        .order('createdAt', { ascending: false })
        .range(0, 9);
  
      if (error) {
        throw new Error('Failed to fetch data from Supabase');
      }
  
      return res.status(200).json({ posts: supabasePosts, source: 'Supabase' });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

app.listen(3001, () => {
    console.log('express listening...');
});