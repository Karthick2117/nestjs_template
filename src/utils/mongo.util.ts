export const getMongoUri = () =>
  process.env.MONGO_URI ?? 'mongodb://localhost:27017/nest_template';
