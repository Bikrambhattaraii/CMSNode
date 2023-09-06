module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "cms", //database name
    dialect: "mysql",  // database used
    pool: {   //database le kati request handle garne
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };