module.exports = (sequelize, type) => {
    return sequelize.define('Subjects', {
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
        subjectName: {
            field: 'subjectName',
            type: type.STRING,
            allowNull: false,
        },
    }, {timestamps: false});
}