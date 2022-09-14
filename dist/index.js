"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
dotenv_1.default.config();
(async () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 5000;
    app.get('/', (_req, res) => res.send('Hello'));
    const typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
      hello: String
    }
  `;
    const resolvers = {
        Query: {
            hello: () => 'Hello World!',
        },
    };
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({}),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)(),
        ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Server running on port ${port}. Graphql: ${apolloServer.graphqlPath}`);
    });
})();
//# sourceMappingURL=index.js.map