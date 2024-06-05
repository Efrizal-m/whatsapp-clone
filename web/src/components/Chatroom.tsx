import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';

interface Message {
  id: number;
  content: string;
  chatroom_id: number;
}

interface ChatroomProps {
  chatroomId: number;
}

const Chatroom: React.FC<ChatroomProps> = ({ chatroomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    const socket = new WebSocket(`ws://localhost:3100/cable?chatroom_id=${chatroomId}`);

    socket.onopen = () => {
      socket.send(JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatroomChannel',
          chatroom_id: chatroomId
        })
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ping') return;

      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [chatroomId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Chatroom</h1>
      <div id="messages">
        {messages.map((message) => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <MessageForm chatroomId={chatroomId} />
    </div>
  );
}

export default Chatroom;
