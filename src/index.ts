import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addUser, getAllUsers } from "./services/user.js";
import typeDefs from "./schema.js";


const resolvers = {
  Query: {
    users: () => getAllUsers(),
  },
  Mutation: {
    signup: async (_, args) => await addUser(args.user),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
