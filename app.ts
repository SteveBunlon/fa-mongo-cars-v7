import * as express from 'express';
import * as requireAll from 'require-all';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as jwt from 'express-jwt';
import * as morgan from 'morgan';
import { errorHandler, ensureAuthenticated, PUBLIC_ROUTES } from "forest-express-mongoose";

const app = express();

let allowedOrigins = [/\.forestadmin\.com$/, /localhost:\d{4}$/];

if (process.env.CORS_ORIGINS) {
  allowedOrigins = allowedOrigins.concat(<RegExp[]><unknown>process.env.CORS_ORIGINS.split(','));
}

const corsConfig = {
  origin: allowedOrigins,
  maxAge: 86400, // NOTICE: 1 day
  credentials: true,
};

app.use(morgan('tiny'));
app.use('/forest/authentication', cors({
  ...corsConfig,
  // The null origin is sent by browsers for redirected AJAX calls
  // we need to support this in authentication routes because OIDC
  // redirects to the callback route
  origin: corsConfig.origin.concat(<RegExp><unknown>'null')
}));
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({
  secret: process.env.FOREST_AUTH_SECRET,
  credentialsRequired: false,
  algorithms: ['HS256'],
}));

app.use('/forest', (request, response, next) => {
  if (PUBLIC_ROUTES.includes(request.url)) {
    return next();
  }
  return ensureAuthenticated(request, response, next);
});

requireAll({
  dirname: path.join(__dirname, 'routes'),
  recursive: true,
  resolve: (Module) => app.use('/forest', Module),
});

requireAll({
  dirname: path.join(__dirname, 'middlewares'),
  recursive: true,
  resolve: (Module) => Module(app),
});

app.use(errorHandler());

export default app;
