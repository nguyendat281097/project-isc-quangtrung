module.exports = (sequelize, type) => {
    return sequelize.define('ReaderTypes', {
        id: {
            field: 'RDT_ID',
            type: type.STRING, 
            primaryKey: true,
        },
        readerTypeName: {
            field: 'readerTypeName',
            type: type.STRING,
            allowNull: false,
        },
        numberBookLoan: {
            field: 'numberBookLoan',
            type: type.INTEGER,
            allowNull: false,
        },
    }, {timestamps: false});
}