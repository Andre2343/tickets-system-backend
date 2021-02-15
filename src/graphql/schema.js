import { makeExecutableSchema, gql } from 'apollo-server-express';
import merge from 'lodash/merge';
import GraphQLDateTime from 'graphql-type-datetime';
import { typeDefs as Ticket, resolvers as ticketResolvers } from './modules/ticket';
import { typeDefs as User, resolvers as userResolvers } from './modules/user';

const Common = gql`
  scalar Date
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const scalarResolvers = {
  Date: GraphQLDateTime,
};

const schema = makeExecutableSchema({
  typeDefs: [Common, Ticket, User],
  resolvers: merge(scalarResolvers, ticketResolvers, userResolvers),
});

export default schema;
