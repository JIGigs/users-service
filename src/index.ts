// import { User } from './entity/User';
import { AppDataSource } from './data-source';
import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers';

dotenv.config();

(async () => {
  const app = express();
  const port = process.env.PORT || 5000;

  app.get('/', (_req, res) => res.send('Hello'));

  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({}),
      ApolloServerPluginLandingPageDisabled(),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `Server running on port ${port}. Graphql: ${apolloServer.graphqlPath}`
    );
  });
})();

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await AppDataSource.manager.save(user);//     console.log('Loading users from the database...');

//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await AppDataSource.manager.find(User);
//     console.log('Loaded users: ', users);
//     console.log('Loading users from the database...');

//     console.log(
//       'Here you can setup and run express / fastify / any other framework.'
//     );
//   })
//   .catch((error) => console.log(error));
