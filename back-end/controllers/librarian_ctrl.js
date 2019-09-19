const express = require('express');
const { Librarian, Book, LoanSlipPay } = require('../models/db');
const jwt = require('jsonwebtoken');
const helper = require('../utils/HELPER');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    Librarian.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    Librarian.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.post('/', (req, res) =>{
    req.body.password = helper.hash(req.body.password);
    Librarian.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Librarian.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                userName: req.body.userName,
                password: helper.hash(req.body.password),
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
//     Librarian.destroy({
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
          LIBA_ID: req.params.id
        }
      }).then(type =>{
          if(Array.isArray(type) && type.length === 0){
            LoanSlipPay.findAll({
                where: {
                  LIBA_ID: req.params.id
                }
              }).then(type =>{
                  console.log(type);
                  if(Array.isArray(type) && type.length === 0){
                    Librarian.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(type => {
                        res.json(Result(type));
                    }).catch(err => {
                        res.status(500).json(ErrorResult(500, err.errors));
                    });
                  } else {
                    res.json(ErrorResult(200, 'Has Frimary Key 2'));
                  }
              })
          } else {
            res.json(ErrorResult(200, 'Has Frimary Key 1'));
          }
      })
});

router.post('/login', (req, res) => {
    Librarian.findOne({
        where: {
            userName: req.body.userName,
            password: helper.hash(req.body.password)
        }
    }).then(aLibrarian => {
        if(aLibrarian != null) {
            const token = jwt.sign({userId: aLibrarian.id, userName: aLibrarian.userName}, helper.appKey, {expiresIn: '1h'});
            res.json(Result({
                id: aLibrarian.id,
                userName: aLibrarian.userName,
                fullName: aLibrarian.fullName,
                email: aLibrarian.email,
                phone: aLibrarian.phone,
                token: token,
            }));
        } else {
            res.json(ErrorResult(200, 'Invalid username or password'));
        }
    });
});

module.exports = router;
