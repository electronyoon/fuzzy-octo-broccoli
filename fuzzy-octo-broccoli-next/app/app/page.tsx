'use client';
import { useState, useEffect } from 'react';
import withAuthCheck from '@/components/withAuthCheck';
import AnimatedBackground from '../AnimatedBackground';
import { NewBadge, FeedPost } from '@/components/Feeds';
// import { ModalPost } from '@/components/Modals';


interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

interface Post {
  id: number;
  author: string;
  textContents: string;
  imageContents: string;
  location: string;
  likes: number;
}

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // const eventSource = new EventSource("http://sse-service/sse");
    const eventSource = new EventSource("http://localhost:3002/sse");

    eventSource.onopen = function() {
      console.log('연결 됐어요')
    }
    eventSource.onerror = function (error) {
      console.log('에러 났어요')
    }
    eventSource.onmessage = (e) => {
      if (e.data === 'event') {
        console.log('pubsub');
        setCount((prev) => prev + 1);
      } else {
        console.log('redis');
        console.log(JSON.parse(atob(e.data)));
      }
    };
 
    fetchPosts();

    return () => {
      eventSource.close();
    };
  }, []);

  const [post, setPost] = useState([]);
  
  const fetchPosts = async () => {
    setCount(0);

    try {
      // const res = await fetch('http://express-service/posts');
      const res = await fetch('http://localhost:3001/posts');
      const data = await res.json();
      console.log('fetchPosts');
      console.dir(data);
      setPost(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <>
      {count > 0 && <NewBadge count={count} onclick={fetchPosts} />}
      {post.map((post: Post, index: number) => (
        <div key={index}>
          <FeedPost post={post} />
        </div>
      ))}
    </>
  );
};

export default withAuthCheck(App);
