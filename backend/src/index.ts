// src/index.ts
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolver/UserResolver';

(async () => {
    const app = express();
    const port = 4000;

    await createConnection();

    const schema = await buildSchema({
        resolvers: [UserResolver],
    });

    const server = new ApolloServer({ schema });

    await server.start();  // Add this line
    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/graphql`);
    });
})();
