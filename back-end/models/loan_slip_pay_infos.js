module.exports = (sequelize, type) => {
    return sequelize.define('LoanSlipPayInfos', {
        id: {
            field: 'LSPI_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        LSP_ID: {
            field: 'LSP_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        BO_ID: {
            field: 'BO_ID',
            type: type.INTEGER,
            allowNull: false,
        },
        datePay: {
            field: 'datePay',
            type: type.DATE,
        },
    }, {timestamps: false});
}