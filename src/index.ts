import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  signupUser,
  deleteUser,
  getAllUsers,
  loginUser,
  getUserFromToken,
} from "./services/user.js";
import typeDefs from "./schema.js";
import { createProject, getAllProjects, getUserProjects } from "./services/project.js";

const resolvers = {
  Query: {
    users: () => getAllUsers(),
    projects: () => getAllProjects(),
    userProjects: (_, args, context) => getUserProjects(context.user.id)
  },
  Mutation: {
    login: async (_, args) => await loginUser(args.user),
    signup: async (_, args) => await signupUser(args.user),
    deleteUser: async (_, args) => await deleteUser(args.id),
    addProject: async (_, args, context) => await createProject(args.project, context.user.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



const context =  async ({ req }) => {
  const authorization = req.headers.authorization || "";
  
  const token = authorization.split(" ")[1];

  const user = await getUserFromToken(token);

  if(!user) throw Error("Not Authentificated");

  return { user };
};

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  // @ts-ignore
  context: context,
});
