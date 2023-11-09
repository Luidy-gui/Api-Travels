import { app } from './app';

app.listen({ port: 3001 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${3000}`);
});

