const express = require('express');
const { ReaderType, Reader } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    ReaderType.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id', (req, res) =>{
    ReaderType.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    ReaderType.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id', (req, res) =>{
    ReaderType.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                readerTypeName: req.body.readerTypeName,
                numberBookLoan: req.body.numberBookLoan,
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
//     ReaderType.destroy({
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
    Reader.findAll({
        where: {
          RDT_ID: req.params.id
        }
      }).then(type =>{
          if(type == null){
            ReaderType.destroy({
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
