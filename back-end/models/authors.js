module.exports = (sequelize, type) => {
    return sequelize.define('Authors', {
        id: {
            field: 'ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        BOT_ID: {
            field: 'BOT_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        authorName: {
            field: 'authorName',
            type: type.STRING,
            allowNull: false,
        },
    }, {timestamps: false});
}