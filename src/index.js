/**
 * Created by Iulian Moldovan on 11/02/2017.
 */
// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

// Config
import { PORT, MONGODB_CONNECTION_STRING } from './config';

// Strategy Middleware
import authorizeStrategyMiddleware from './middleware/authorizeStrategy-middleware';
import loginStrategyMiddleware from './middleware/loginStrategy-middleware';

// Routers
import routersSetup from './routers';

// DB Setup
mongoose.connect(MONGODB_CONNECTION_STRING);

// Passport setup
passport.use(authorizeStrategyMiddleware);
passport.use(loginStrategyMiddleware);

// App setup
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
routersSetup(app);

app.listen(PORT, () => {
  console.log('Server listening on:', PORT);
});
