import { gql } from 'apollo-server-express';
import UserModel from '../../models/user';

export const typeDefs = gql`
  type UserProfile {
    firstName: String
    lastName: String
  }

  type User {
    _id: ID
    email: String
    profile: UserProfile
  }

  input CreateUserProfileInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserProfileInput!): User
    login(email: String, password: String!): User
  }
`;

export const resolvers = {
  Query: {
    me: (root, params, ctx) => ctx.user,
  },
  Mutation: {
    createUser: async (root, { input: { firstName, lastName, email, password } }) => {
      const existsUser = await UserModel.countDocuments({ email });
      if (existsUser) throw new Error('Email already exists');
      const user = await new UserModel({
        profile: { firstName, lastName },
        email,
        password,
      }).save();
      console.log(user);
      return user;
    },
    login: async (root, { email, password }) => {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) throw new Error('User not found');
      if (password !== user.password) throw new Error('Incorrect password');
      return user;
    },
  },
};
