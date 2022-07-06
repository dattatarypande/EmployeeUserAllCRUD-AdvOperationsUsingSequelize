module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define(
        "emp", {
            Id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            Fname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Lname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Mobile: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            Address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            EmailId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return model;
};