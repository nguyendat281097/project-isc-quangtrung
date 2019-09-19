const express = require('express');
var app = express();
var bodyParser = require('body-parser');

const {ErrorResult, Result} = require('./utils/base_response');
const cors = require('cors');

app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

const auth = require('./middleware/auth');
app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const authors = require('./controllers/author_ctrl');
app.use('/authors', authors);

const books = require('./controllers/book_ctrl');
app.use('/books', books);

const bookTitles = require('./controllers/book_title_ctrl');
app.use('/bookTitles', bookTitles);

const subjects = require('./controllers/subject_ctrl');
app.use('/subjects', subjects);

const librarians = require('./controllers/librarian_ctrl');
app.use('/librarians', librarians);

const readers = require('./controllers/reader_ctrl');
app.use('/readers', readers);

const readerTypes = require('./controllers/reader_type_ctrl');
app.use('/readerTypes', readerTypes);

const loanSlipPays = require('./controllers/loan_slip_pay_ctrl');
app.use('/loanSlipPays', loanSlipPays);

const loanSlipPayInfos = require('./controllers/loan_slip_pay_info_ctrl');
app.use('/loanSlipPayInfos', loanSlipPayInfos);

app.use((req, res) =>{
    res.status(404).json(ErrorResult(404, 'API Not Found'));
});
var server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});