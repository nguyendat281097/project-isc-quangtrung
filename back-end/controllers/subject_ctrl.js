const express = require('express');
const { Subject } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //Authorize here
    next();
});

// Fill customer type apis here
router.get('/', (req, res) =>{
    Subject.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    Subject.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
             res.json(ErrorResult(200, "Not Found"));
        }
    });
});

router.get('/bookTitle/:id(\\d+)', (req, res) =>{
    Subject.findAll(
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
    Subject.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.json(ErrorResult(500, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Subject.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                BOT_ID: req.body.BOT_ID,
                subjectName: req.body.subjectName
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

router.delete('/:id', (req, res) =>{
    Subject.destroy({
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
