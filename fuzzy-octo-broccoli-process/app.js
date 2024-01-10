import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

import { createClient as createRedisClient } from 'redis';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { PubSub } from '@google-cloud/pubsub';

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

// Initialize PubSub
const pubsub = new PubSub({
  projectId: 'broccoli-pubsub-project',
  // keyFilename: '/app/credentials/credentials.json'
  keyFilename: '/app/gcpadc.json'
});
const subscription = pubsub.subscription('broccoli-topic-sub');

subscription.on('message', async (message) => {
  console.log('Received message:', JSON.parse(message.data.toString()));
  try {
    if (redis) {
      await redis.lPush('ltsposts', JSON.stringify(JSON.parse(message.data.toString())));
      console.log('Message added to Redis cache');
    } else {
      console.log('Redis not available, using Supabase instead');
      if (!supabase) {
        console.log('Supabase not initialized. Reconnecting...');
        connectToSupabase();
      }
      await supabase.from('posts')
        .insert(JSON.parse(message.data.toString()))
        .then(console.log)
        .catch(console.error);
      console.log('Message added to Supabase');
    }
    message.ack();
  } catch (error) {
    console.log(error);
  }
});

subscription.on('error', (error) => {
  console.error('Received error:', error);
  // If there's an error, set `redis` to null to switch to Supabase
  redis = null;
});
