const { GraphQLServer } = require("graphql-yoga");
const keys = require("./config/keys");
const mongoose = require("mongoose");

mongoose.connect(
  keys.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to mongoDB")
);

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
};

const server = new GraphQLServer({
  typeDefs: "./graphql/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
