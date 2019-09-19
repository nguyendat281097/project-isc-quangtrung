const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op; 
const { BookTitle, Author, Subject, PagingResult } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if(req.query.q) queryString = '%' + decodeURIComponent(req.query.q) +'%';

    let sortColumn = 'name';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if ( sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2 ) {
        BookTitle.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            BookTitle.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
            }).then(bookTitles => {
                return res.json(PagingResult(bookTitles, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
                {bookTitleName: { [Op.like]: queryString}},
                {edition: { [Op.like]: queryString}},
                {size: { [Op.like]: queryString}},
                {page: { [Op.like]: queryString}},
                {callNumber: { [Op.like]: queryString}},
                {ISBN: { [Op.like]: queryString}},
                {publishingInfo: { [Op.like]: queryString}},
            ]
        }

        BookTitle.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            BookTitle.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
            }).then(bookTitles => {
                return res.json(PagingResult(bookTitles, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});

router.get('/:id(\\d+)', (req, res) =>{
    BookTitle.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    BookTitle.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    BookTitle.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                bookTitleName: req.body.bookTitleName,
                edition: req.body.edition,
                page: req.body.page,
                size: req.body.size,
                sublishingInfo: req.body.sublishingInfo,
                callNumber: req.body.callNumber,
                ISBN: req.body.ISBN,
                description: req.body.description,
                image: req.body.image,
            }).then(type => {
                res.json(Result(type));
            }).catch(err =>{
                res.json(ErrorResult(500, err.errors));
            });
        } else {
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

// router.delete('/:id', (req, res) =>{
//     BookTitle.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(type => {
//         res.json(Result(type));
//     }).catch(err => {
//         res.status(500).json(ErrorResult(500, err.errors));
//     });
// });

router.delete('/:id', (req, res) =>{
    Book.findAll({
        where: {
          BOT_ID: req.params.id
        }
      }).then(type =>{
          if(Array.isArray(type) && type.length === 0){
            Author.findAll({
                where: {
                    BOT_ID: req.params.id
                }
              }).then(type =>{
                  if(Array.isArray(type) && type.length === 0) {
                    Subject.findAll({
                        where: {
                          BOT_ID: req.params.id
                        }
                      }).then(type =>{
                        if(Array.isArray(type) && type.length === 0) {
                            BookTitle.destroy({
                                where: {
                                    id: req.params.id
                                }
                            }).then(type => {
                                res.json(Result(type));
                            }).catch(err => {
                                res.json(ErrorResult(500, err.errors));
                            });
                        } else {
                            res.json(ErrorResult(200, 'Has Frimary Key'));
                        }
                      })
                  } else {
                    res.json(ErrorResult(200, 'Has Frimary Key'));
                  }
              })
          } else {
            res.json(ErrorResult(200, 'Has Frimary Key'));
          }
      })
});

module.exports = router;
