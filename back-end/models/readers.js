module.exports = (sequelize, type) => {
    return sequelize.define('Readers', {
        id: {
            field: 'RD_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            field: 'fullName',
            type: type.STRING,
            allowNull: false,
        },
        identityCardNumber: {
            field: 'identityCardNumber',
            type: type.STRING,
            allowNull: false,
        },
        gender: {
            field: 'gender',
            type: type.BOOLEAN,
        },
        address: {
            field: 'address',
            type: type.STRING,
        },
        dateOfBirth: {
            field: 'dateOfBirth',
            type: type.DATE,
        },
        email: {
            field: 'email',
            type: type.STRING,
        },
        phone: {
            field: 'phone',
            type: type.STRING,
        },
        registrationDate: {
            field: 'registrationDate',
            type: type.DATE,
            allowNull: false,
        },
        image: {
            field: 'image',
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
        RDT_ID: {
            field: 'RDT_ID',
            type: type.STRING,
            allowNull: false,
        },
    }, {timestamps: false});
}