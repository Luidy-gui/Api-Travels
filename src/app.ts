import fastify from 'fastify';
import { testimonialRoutes, userRouter } from './Routes/router';

const app = fastify();
app.register(userRouter);
app.register(testimonialRoutes);


export { app };
