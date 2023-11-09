import fastify from 'fastify';
import { userRouter } from './Routes/router';

const app = fastify();
app.register(userRouter);

app.get('/', (request, response) => {
    response.send('Hello World');
});

export { app };
