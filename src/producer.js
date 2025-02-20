const amqp = require('amqplib');

const QUEUE = 'demo_queue1';
const BROKER_URL = 'amqps://<username>:<password>@amqps://b-1c2930c4-a5f3-4b1d-9778-64b189aa8e3a.mq.ap-south-1.amazonaws.com:5671'; // replace with your values

async function sendMessage() {
try {
    console.log("1")
const connection = await amqp.connect('amqps://<username>:<password>@b-1c2930c4-a5f3-4b1d-9778-64b189aa8e3a.mq.ap-south-1.amazonaws.com:5671',{
    ssl: {
        rejectUnauthorized: true, // Ensure the connection is secure
    },
    frameMax: 1048576, // 1MB frame size

});
const channel = await connection.createChannel();

await channel.assertQueue(QUEUE,{ durable: true });


const msg = 'Hello sanskar1';
channel.sendToQueue(QUEUE, Buffer.from(msg));
console.log(`Message sent: ${msg}`);

setTimeout(() => {
connection.close();
}, 500);
} catch (error) {
console.error('Error sending message:', error);
}
}

sendMessage();