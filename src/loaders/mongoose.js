/* eslint-disable global-require */
import mongoose from 'mongoose';
import Logger from '../utils/logger';
import config from '../config';

export default async () => {
  Logger.silly('Connecting to MongoDB...');
  mongoose.set('useFindAndModify', false);
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  Logger.silly('Connected');

  Logger.silly('Loading tickets model...');
  require('../models/ticket');
  Logger.silly('Loaded tickets model');

  return connection.connection.db;
};
