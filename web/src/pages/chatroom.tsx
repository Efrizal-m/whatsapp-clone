import React, { useState, useEffect } from 'react';
import Chatroom from '../components/Chatroom';
import { v4 as uuidv4 } from 'uuid';

const ChatroomPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve unique user ID
    let storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      storedUsername = uuidv4();
      localStorage.setItem('username', storedUsername);
    }
    setUsername(storedUsername);    
  }, [])

  return (
    <div>
      <Chatroom chatroomId={1} username={username}/>
    </div>
  );
}

export default ChatroomPage;
