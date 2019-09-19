module.exports = (sequelize, type) => {
    return sequelize.define('Librarians', {
        id: {
            field: 'LIBA_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            field: 'fullName',
            type: type.STRING,
            allowNull: false,
        },
        email: {
            field: 'email',
            type: type.STRING,
        },
        phone: {
            field: 'phone',
            type: type.STRING,
        },
        userName: {
            field: 'userName',
            type: type.STRING,
            allowNull: false,
        },
        password: {
            field: 'password',
            type: type.STRING,
            allowNull: false,
        },
    }, {timestamps: false});
}