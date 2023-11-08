import fastify from 'fastify';
import { userRouter } from './Routes/router';

const app = fastify();
app.register(userRouter);

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.listen({ port: 3001 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${3000}`);
});
