import mongooseLoader from './mongoose';
import expressLoader from './express';

export default async ({ expressApp }) => {
  await mongooseLoader();
  await expressLoader({ app: expressApp });
};
