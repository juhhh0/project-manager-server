import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addUser, getAllUsers } from "./services/user.js";

const typeDefs = `#graphql
  type Project {
    id: ID!
    title: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(user: UserInput!): User
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    users: () => getAllUsers(),
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await addUser(args.user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
