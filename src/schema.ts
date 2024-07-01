const typeDefs = `#graphql
type Project {
  id: ID!
  title: String!
  description: String
  content: String
  userId: ID!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  token: String
  projects: [Project]
}

type Query {
  users: [User]
  projects: [Project]
  project(id: ID!): Project
  userProfile: User
  userProjects: [Project]
}

type Mutation {
  login(user: LoginInput!): User
  signup(user: SignupInput!): User
  deleteUser(id: ID!): User
  addProject(project: AddProjectInput!): Project
  deleteProject(id: ID!): Project
  updateProject(id: ID!, project: UpdateProjectInput!): Project
}

input AddProjectInput {
    title: String!
}

input UpdateProjectInput {
    title: String
    description: String
    content: String
}

input SignupInput {
  name: String!
  email: String!
  password: String!
}

input LoginInput {
    email: String!
    password: String!
}
`;

export default typeDefs;
