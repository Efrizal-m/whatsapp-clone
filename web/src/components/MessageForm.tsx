import React, { useState } from 'react';

interface MessageFormProps {
  chatroomId: number;
}

const MessageForm: React.FC<MessageFormProps> = ({ chatroomId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:3100/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: { content, chatroom_id: chatroomId } })
    });
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;
