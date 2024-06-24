import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addUser, deleteUser, getAllUsers } from "./services/user.js";
import typeDefs from "./schema.js";


const resolvers = {
  Query: {
    users: () => getAllUsers(),
  },
  Mutation: {
    signup: async (_, args) => await addUser(args.user),
    deleteUser: async (_, args) => await deleteUser(args.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
