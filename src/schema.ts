const typeDefs = `#graphql
type Project {
  id: ID!
  title: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  token: String
}

type Query {
  users: [User]
  projects: [Project]
  userProjects: [Project]
}

type Mutation {
  login(user: LoginInput!): User
  signup(user: SignupInput!): User
  deleteUser(id: ID!): User
  addProject(project: ProjectInput!): Project
}

input ProjectInput {
    title: String!
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
