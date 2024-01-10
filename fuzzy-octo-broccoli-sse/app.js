import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());


import { PubSub } from '@google-cloud/pubsub';
const pubsub = new PubSub({
    projectId: 'broccoli-pubsub-project',
    // keyFilename: '/app/credentials/credentials.json'
    keyFilename: '/app/gcpadc.json'
});
const subscription = pubsub.subscription('broccoli-topic-sub2');


const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
};
app.get("/sse", (req, res) => {
    res.writeHead(200, headers);

    subscription.on('message', message => {
        console.log('Received pubsub message:', message.data.toString());
        res.write(`data: event\n\n`);
        message.ack();
    });

    subscription.on('error', error => {
        console.error('Received error:', error);
    });

    req.on('close', () => {
        subscription.close();
        res.end();
    });
});

app.listen(3002, () => {
    console.log("sse listening...");
});