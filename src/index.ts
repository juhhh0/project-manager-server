import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const projects = [
  {
    title: "To do list",
  },
  {
    title: "Facebook clone",
  },
];

const typeDefs = `#graphql
  type Project {
    title: String
  }
  
  type Query {
    projects: [Project]
  }
`;

const resolvers = {
  Query: {
    projects: () => projects,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  