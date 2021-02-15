import { ApolloServer } from 'apollo-server-express';
import config from '../config';
import schema from './schema';

const server = new ApolloServer({ schema, introspection: true, playground: config.isDevelopment });

export default server;
