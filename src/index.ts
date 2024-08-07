import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  signupUser,
  deleteUser,
  getAllUsers,
  loginUser,
  getUserFromToken,
  getUserById
} from "./services/user.js";
import typeDefs from "./schema.js";
import { createProject, getAllProjects, deleteProject, getUserProjects, getProject, updateProject, getProjectTasks } from "./services/project.js";
import { addTask, deleteTask } from "./services/task.js";

const resolvers = {
  Query: {
    users: () => getAllUsers(),
    userProfile: (_, args, context) => getUserById(context.user.id),
    projects: () => getAllProjects(),
    userProjects: (_, args, context) => getUserProjects(context.user.id),
    project: (_, args) => getProject(args.id),
  },
  Mutation: {
    login: async (_, args) => await loginUser(args.user),
    signup: async (_, args) => await signupUser(args.user),
    deleteUser: async (_, args) => await deleteUser(args.id),
    addProject: async (_, args, context) => await createProject(args.project, context.user.id),
    deleteProject: async (_, args) => await deleteProject(args.id),
    updateProject: async (_, args) => await updateProject(args.id, args.project),
    addTask: async (_, args) => await addTask(args.projectId, args.task),
    deleteTask: async (_, args) => await deleteTask(args.id),
  },
  User: {
    projects: (parent) => getUserProjects(parent.id),
  },
  Project: {
    tasks: (parent) => getProjectTasks(parent.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



const context =  async ({ req }) => {

  if(req.body.query.includes("login") || req.body.query.includes("signup")) return {};

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
