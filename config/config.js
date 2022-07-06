const Sequelize = require("sequelize");
sequelize = new Sequelize({
    dialect: "mysql",
    database: "company",
    username: "root",
    host: "localhost",
    port: "3306",
    password: "",
    logging: true,
    operatorsAliases: 0,
    pool: {
        max: 100,
        min: 1,
        idle: 200000,
        acquire: 200000,
    },
    retry: { max: 3 },

});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.emp = require("../model/emp.model")(sequelize, Sequelize);

module.exports = db;