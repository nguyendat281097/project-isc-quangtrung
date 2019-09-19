const express = require('express');
const { Reader, LoanSlipPay } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    Reader.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    Reader.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    Reader.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Reader.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                fullName: req.body.fullName,
                identityCardNumber: req.body.identityCardNumber,
                gender: req.body.gender,
                address: req.body.address,
                dateOfBirth: req.body.dateOfBirth,
                email: req.body.email,
                phone: req.body.phone,
                registrationDate: req.body.registrationDate,
                image: req.body.image,
                userName: req.body.userName,
                password: req.body.password,
                RTD_ID: req.body.RTD_ID,
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
    LoanSlipPay.findAll({
        where: {
          RD_ID: req.params.id
        }
      }).then(type =>{
          if(type == null){
            Reader.destroy({
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
