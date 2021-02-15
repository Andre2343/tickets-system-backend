import apolloServer from '../graphql';

export default async ({ app }) => {
  apolloServer.applyMiddleware({ app });
  return apolloServer;
};
