import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the WhatsApp Clone</h1>
      <Link href="/chatroom">
        <p>Go to Chatroom</p>
      </Link>
    </div>
  );
}

export default Home;
