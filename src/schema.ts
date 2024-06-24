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
  signup(user: SignupInput!): User
  deleteUser(id: ID!): User
}

input SignupInput {
  name: String!
  email: String!
  password: String!
}
`;

export default typeDefs;