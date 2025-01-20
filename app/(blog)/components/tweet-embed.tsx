'use client';
import { Tweet } from 'react-tweet';

interface TweetProps {
  id: string;
}

export default function TweetEmbed({ id }: TweetProps) {
  return (
    <div className="flex justify-center my-6">
      <Tweet id={id} />
    </div>
  );
}