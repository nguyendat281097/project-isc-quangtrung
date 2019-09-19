const express = require('express');
const { LoanSlipPay, LoanSlipPayInfo } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    LoanSlipPay.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    LoanSlipPay.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    LoanSlipPay.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    LoanSlipPay.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                RD_ID: req.body.BOT_ID,
                LIBA_ID: req.body.LIBA_ID,
                loanDate: req.body.loanDate,
                promisedDateToPay: req.body.promisedDateToPay,
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
//     LoanSlipPay.destroy({
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
          LSP_ID: req.params.id
        }
      }).then(type =>{
          if(Array.isArray(type) && type.length === 0){
            LoanSlipPay.destroy({
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
