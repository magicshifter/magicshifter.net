import express from 'express';
import { Magic } from 'magic-root';

const app = express();

Object.keys(config).forEach(
  key =>
    app.set(key, config[key])
);

app.set('cwd', __dirname);

Magic(app);
