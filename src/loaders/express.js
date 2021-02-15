import apolloLoader from './appolo';

export default ({ app }) => {
  console.log(`🚀 Staring GraphQL Server`);
  apolloLoader({ app });
  console.log(`🚀 GraphQL Server is loaded`);
};
