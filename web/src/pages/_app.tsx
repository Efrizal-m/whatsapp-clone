import { useEffect } from 'react';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const chatroomId = 1; // replace with dynamic chatroom ID if needed
    const socket = new WebSocket(`ws://localhost:3000/cable?chatroom_id=${chatroomId}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
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
        console.log('Received message:', data.message);
        // Handle the message and update your state here
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
