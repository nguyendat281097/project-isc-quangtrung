module.exports = (sequelize, type) => {
    return sequelize.define('Books', {
        id: {
            field: 'BO_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        BOT_ID: {
            field: 'BOT_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        isBorrowHome: {
            field: 'isBorrowHome',
            type: type.BOOLEAN,
            allowNull: false,
        },
        LIBA_ID: {
            field: 'LIBA_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        dateImport: {
            field: 'dateImport',
            type: type.DATE,
            allowNull: false,
        },
        status: {
            field: 'status',
            type: type.STRING,
            allowNull: false,
        },
    }, {timestamps: false});
}