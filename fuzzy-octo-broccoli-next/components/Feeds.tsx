'use client';
import { useState } from 'react';
import cyworld from '@/resources/cyworld.jpeg'; // Import the image
import Image from 'next/image'


export function NewBadge({ count, onclick }: { count: number; onclick: () => void }): JSX.Element {
  return (
<div className="text-center pt-3" onClick={onclick}>
  <span className="inline-flex items-center rounded-full p-2 bg-blue-500 text-white" role="alert" tabIndex={0}>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
    <span className="whitespace-nowrap inline-block pl-3 pr-2">new posts</span>
    <span className="whitespace-nowrap inline-block">+{count}</span>
  </span>
</div>
  );
}

interface Post {
  id: number;
  author: string;
  textContents: string;
  imageContents: string;
  location: string;
  likes: number;
}

export function FeedPost({ post }: { post: Post }): JSX.Element {
  const [isFilled, setIsFilled] = useState(false);

  const toggleColor = () => {
    setIsFilled((prevState) => !prevState);
  };

  return (
<div className="p-4 flex justify-center items-center">
  <div className="bg-white border rounded-sm w-96">
    <div className="flex items-center px-4 py-3">
      <Image className="h-8 w-8 rounded-full border" src={cyworld} alt="cyworld" width={32} height={32} />
      <div className="ml-3 ">
        <span className="text-sm text-black font-semibold antialiased block leading-tight">{post.author}</span>
        <span className="text-gray-600 text-xs block">{post.location}</span>
      </div>
    </div>
    {post.imageContents && (
      <img src={post.imageContents} />
    )}
    <div className="text-gray-600 m-3 pb-3">
      {post.textContents}
    </div>
    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div className="flex gap-5">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24" onClick={toggleColor}>
          <path fill={isFilled ? 'red' : '#262626'} d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
          <path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path>
        </svg>
      </div>
      {/* <div className="flex">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
      </div> */}
    </div>
    <div className="font-semibold text-black text-sm mx-4 mt-2 mb-4">{post.likes} likes</div>
  </div>
</div>
  );
};