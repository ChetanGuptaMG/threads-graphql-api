import express from "express" ;
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = 4000;

  app.use(express.json());
  const gqlServer = new ApolloServer({
    typeDefs: "./schema.graphql",
    resolvers: {},
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({message: "Hello World"});
  });
  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
}
init();