const amqp = require('amqplib');

const QUEUE = 'demo_queue';
const BROKER_URL = 'amqps://<username>:<password>@b-1c2930c4-a5f3-4b1d-9778-64b189aa8e3a.mq.ap-south-1.amazonaws.com:5671'; // replace with your values

async function receiveMessage() {
try {
const connection = await amqp.connect(BROKER_URL);
const channel = await connection.createChannel();
await channel.assertQueue(QUEUE);

console.log('Waiting for messages in the queue…');
channel.consume(QUEUE, (msg) => {
if (msg !== null) {
console.log(`Received: ${msg.content.toString()}`);
channel.ack(msg); // Acknowledge that the message was received
}
});
} catch (error) {
console.error('Error receiving message:', error);
}
}

receiveMessage();