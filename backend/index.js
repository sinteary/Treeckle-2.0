const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const keys = require('./config/keys')
const schema = require('./graphql/schema');

dotenv.config({ path: './config/config.env' });

const app = express();

//Connect to DB
mongoose.connect(
  keys.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to mongoDB");
  }
);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
