import { createConsumer } from '@rails/actioncable';

const cableUrl = 'ws://localhost:3100/cable';
const consumer = createConsumer(cableUrl);

export default consumer;