const express = require('express');
const { Book, LoanSlipPayInfo } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    Book.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    Book.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.get('/bookTitle/:id(\\d+)', (req, res) =>{
    Book.findAll(
        {
        where: {
          BOT_ID: req.params.id
        }
        }).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    console.log(req.body);
    Book.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Book.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                BOT_ID: req.body.BOT_ID,
                isBorrowHome: req.body.isBorrowHome,
                LIBA_ID: req.body.LIBA_ID,
                dateImport: req.body.dateImport,
                status: req.body.status,
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
//     Book.destroy({
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
    LoanSlipPayInfo.findAll({
        where: {
          BO_ID: req.params.id
        }
      }).then(type =>{
          if(Array.isArray(type) && type.length === 0){
            Book.destroy({
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
});

module.exports = router;
