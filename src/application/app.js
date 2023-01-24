const { createYoga, createSchema } = require("graphql-yoga");
const { loadFiles } = require("@graphql-tools/load-files");
const { createServer } = require("http");
const sequelize = require("../config/db_config");

/*resolvers*/

const { userMutation, userQuery } = require("./resolver/user_resolver");

//} fin resolvers import


async function main() {
  /**Connection base de donne */
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    try {
      await sequelize.sync({alter:true});
      console.log("db syncronized");
    } catch (error) {
      console.log("Model synchronization have a problem", error);
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } //} fin connection base de donner

  const yoga = createYoga({
    schema: createSchema({
      typeDefs: await loadFiles("src/application/**/*.graphql"),
      resolvers: {
        Query: {
          ...userQuery,
        },
        Mutation: {
          ...userMutation
        }
      },
    }),
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
