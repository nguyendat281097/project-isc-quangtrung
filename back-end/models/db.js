const Sequelize = require('sequelize');

const AuthorModel = require('./authors');
const SubjectModel = require('./subjects');
const BookTitleModel = require('./book_titles');
const BookModel = require('./books');
const LibrarianModel = require('./librarians');
const ReaderTypeModel = require('./readerTypes');
const ReaderModel = require('./readers');
const LoanSlipPayModel = require('./loan_slip_pays');
const LoanSlipPayInfoModel = require('./loan_slip_pay_infos');

const sequelize = new Sequelize('LIBRARYMANAGEMENT', 'sa', 'nguyendat260298', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        "options": {
            "instanceName": "SQLEXPRESS"
        }
    },
    pool: { max: 20, min:0, acquire: 30000, idle: 10000 },
    logging: true

});

const Author = AuthorModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const BookTitle = BookTitleModel(sequelize, Sequelize);
const Book = BookModel(sequelize, Sequelize);
const Librarian = LibrarianModel(sequelize, Sequelize);
const ReaderType = ReaderTypeModel(sequelize, Sequelize);
const Reader = ReaderModel(sequelize, Sequelize);
const LoanSlipPay = LoanSlipPayModel(sequelize, Sequelize);
const LoanSlipPayInfo = LoanSlipPayInfoModel(sequelize, Sequelize);

BookTitle.hasMany(Author, {foreignKey: 'BOT_ID', as: 'Authors'});
Author.belongsTo(BookTitle, {foreignKey: 'BOT_ID', as: 'BookTitle'});

BookTitle.hasMany(Subject, {foreignKey: 'BOT_ID', as: 'Subjects'});
Subject.belongsTo(BookTitle, {foreignKey: 'BOT_ID', as: 'BookTitle'});

BookTitle.hasMany(Book, {foreignKey: 'BOT_ID', as: 'Books'});
Book.belongsTo(BookTitle, {foreignKey: 'BOT_ID', as: 'BookTitle'});

Librarian.hasMany(Book, {foreignKey: 'BO_ID', as: 'Books'});
Book.belongsTo(Librarian, {foreignKey: 'BO_ID', as: 'Librarian'});

ReaderType.hasMany(Reader, {foreignKey: 'RDT_ID', as: 'Readers'});
Reader.belongsTo(ReaderType, {foreignKey: 'RDT_ID', as: 'ReaderType'});

LoanSlipPay.hasMany(LoanSlipPayInfo, {foreignKey: 'LSP_ID', as: 'LoanSlipPayInfos'});
LoanSlipPayInfo.belongsTo(LoanSlipPay, {foreignKey: 'MA_NXB', as: 'LoanSlipPay'});

Reader.hasMany(LoanSlipPay, {foreignKey: 'RD_ID', as: 'LoanSlipPays'});
LoanSlipPay.belongsTo(Reader, {foreignKey: 'RD_ID', as: 'Reader'});

Librarian.hasMany(LoanSlipPay, {foreignKey: 'LIBA_ID', as: 'LoanSlipPays'});
LoanSlipPay.belongsTo(Librarian, {foreignKey: 'LIBA_ID', as: 'Librarian'});

LoanSlipPayInfo.hasMany(Book, {foreignKey: 'BO_ID', as: 'Books'});
Book.belongsTo(LoanSlipPayInfo, {foreignKey: 'BO_ID', as: 'LoanSlipPayInfo'});

// sequelize.sync({ force: true }).then(() => {
//     console.log('Database & tables created!');
// });

module.exports = {
    Author, Subject, BookTitle, Book, Librarian, LoanSlipPay, LoanSlipPayInfo, Reader, ReaderType
}