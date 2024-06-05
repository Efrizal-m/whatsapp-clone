import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
interface Message {
  id: number;
  content: string;
  chatroom_id: number;
  username: string;
}

interface ChatroomProps {
  chatroomId: number;
  username: string;
}

const Chatroom: React.FC<ChatroomProps> = ({ chatroomId, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch message
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3100/messages.json?chatroom_id=${chatroomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        setMessages(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchMessages();

    const ws = new WebSocket(`ws://localhost:3100/cable?chatroom_id=${chatroomId}&username=${username}`); 
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      ws.send(JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatroomChannel',
          chatroom_id: chatroomId
        })
      }));

    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ping') return;
      console.log('Received message:', data);
      
      if (data.message) {
        // setMessages(prevMessages => [...prevMessages, data.message]);
        setMessages(prevMessages => {
          // Check if the message already exists
          const messageExists = prevMessages.some(message => message.id === data.message.id);
          // If it doesn't exist, add the new message; otherwise, return the previous messages unchanged
          if (!messageExists) {
            return [...prevMessages, data.message];
          }
          
          return prevMessages;
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };

  }, [chatroomId, username]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(messages,'<<<S')
  return (
    <div>
      <h1>Chatroom</h1>
      <div id="messages">
        {messages.map((message) => (
          <p key={message.id}>{message.username} - {message.content}</p>
        ))}
      </div>
      <MessageForm chatroomId={chatroomId} username={username}/>
    </div>
  );
}

export default Chatroom;
