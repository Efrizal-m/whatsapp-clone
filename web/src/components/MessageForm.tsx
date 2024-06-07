import React, { useState } from 'react';

interface MessageFormProps {
  chatroomId: number;
  username: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ chatroomId, username }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:3100/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: { content, chatroom_id: chatroomId, username } })
    });
    setContent('');
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //   />
    //   <button type="submit">Send</button>
    // </form>
    <div className="p-4 bg-white border-t border-gray-300">
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Type your message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit;
          }
        }}
      />
    </div>
  );
}

export default MessageForm;
