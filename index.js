const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const { utils } = require("./utils");
const cors = require("cors");
const mongoose = require("mongoose");
const Report = require("./models/Report");
require("now-env");


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Err", err));



const schema = makeExecutableSchema({
  resolvers: utils.resolvers,
  typeDefs: utils.typeDefs
});


const server = new ApolloServer({
  schema,
  introspection: true, // enables introspection of the schema
  playground: true, // enables the actual playground
  context: ({ req }) => {
    return {Report}
  }
});

// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
