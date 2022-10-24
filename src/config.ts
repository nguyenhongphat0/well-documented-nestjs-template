export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    secret: process.env.APP_SECRET,
  },
  password: {
    saltOrRounds: 10,
  },
});
