import { ConnectionOptions } from "mongoose";
import { DatabaseConfiguration } from "forest-express-mongoose";
import { resolve } from 'path';

const databaseOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const databasesConfiguration: DatabaseConfiguration[] = [{
  name: 'default',
  modelsDir: resolve(__dirname, '../models'),
  connection: {
    url: process.env.DATABASE_URL,
    options: { ...databaseOptions },
  },
}];

export default databasesConfiguration;
