import * as path from 'path';
import { Application } from "express";

export = function welcome(app: Application): Promise<void> {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  return;
};
