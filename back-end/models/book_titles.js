module.exports = (sequelize, type) => {
    return sequelize.define('BookTitles', {
        id: {
            field: 'BOT_ID',
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        bookTitleName: {
            field: 'bookTitleName',
            type: type.STRING,
            allowNull: false,
        },
        edition: {
            field: 'edition',
            type: type.INTEGER,
        },
        page: {
            field: 'page',
            type: type.INTEGER,
        },
        size: {
            field: 'size',
            type: type.INTEGER,
        },
        publishingInfo: {
            field: 'publishingInfo',
            type: type.STRING,
        },
        callNumber: {
            field: 'callNumber',
            type: type.STRING,
            allowNull: false,
        },
        ISBN: {
            field: 'ISBN',
            type: type.STRING,
            allowNull: false,
        },
        description: {
            field: 'description',
            type: type.STRING,
        },
        image: {
            field: 'image',
            type: type.STRING,
        },
    }, {timestamps: false});
}