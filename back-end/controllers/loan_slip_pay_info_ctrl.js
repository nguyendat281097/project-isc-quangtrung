const express = require('express');
const { LoanSlipPayInfo } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    LoanSlipPayInfo.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    LoanSlipPayInfo.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    LoanSlipPayInfo.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    LoanSlipPayInfo.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                LSP_ID: req.body.BOT_ID,
                BO_ID: req.body.BO_ID,
                datePay: req.body.datePay,
            }).then(type => {
                res.json(Result(type));
            }).catch(err =>{
                res.status(400).json(ErrorResult(500, err.errors));
            });
        } else {
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.delete('/:id', (req, res) =>{
    LoanSlipPayInfo.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});
module.exports = router;
