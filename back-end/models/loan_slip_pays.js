module.exports = (sequelize, type) => {
    return sequelize.define('LoanSlipPays', {
        id: {
            field: 'LSP_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        RD_ID: {
            field: 'RD_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        LIBA_ID: {
            field: 'LIBA_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        loanDate: {
            field: 'loanDate',
            type: type.DATE,
            allowNull: false,
        },
        promisedDateToPay: {
            field: 'promisedDateToPay',
            type: type.DATE,
        },
    }, {timestamps: false});
}