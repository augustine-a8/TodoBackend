import todoResolver from "./todoResolver.js";

const resolvers = {
  Query: {
    ...todoResolver.Query,
  },
  Mutation: {
    ...todoResolver.Mutation,
  },
};

export default resolvers;
