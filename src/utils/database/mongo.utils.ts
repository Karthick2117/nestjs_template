export const getMongoUri = (): string => {
  const {
    MONGO_HOST = 'localhost',
    MONGO_PORT = '27017',
    MONGO_DB = 'nest_template',
  } = process.env;

  return `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
};
