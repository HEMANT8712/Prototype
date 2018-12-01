const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const express = require('express');
const User = require('../db/models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');


router.get('/private',authenticate, (req,res)=>{
    let obj = {
        message:'This is a secret ROUTE',
        secret:'YOU MAY PASS',
        _id: req._id
    };

    res.status(200).send(obj);
})


router.post('/registerconnect', authenticate, (req, res) => {

    const { username, connect_id } = req.body;
    User.findOne({ connect_id }).then((user) => {
        console.log(user);
        if (user !== null) {
            return res.status(401).send();  //404- Connect ID Already Exist
        }
        User.findOne({ username }).then((user) => {
            if (user === null) {
                return res.status(400).send();  //404- User not found
            }
            user.connect_id = req.body.connect_id;
            user.save()
                .then(user => {
                    if (!user) {
                        return res.status(400).send()
                    }
                    return res.status(201).send(user);
                })
                .catch(err => {
                    if (err) {
                        return res.status(400).send({ error: err });
                    }
                    return res.status(400).send();
                });
        }).catch((err) => {
            return res.status(401).send({ error: err });
        })

    }).catch((err) => {
        if (err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    })
});


router.post('/registeriotdevice', authenticate, (req, res) => {
    const { username, iotdevice_id } = req.body;
    User.findOne({ iotdevice_id }).then((user) => {
        if (user !== null) {
            return res.status(401).send();  //404- IoT Device ID Already Exist
        }
        User.findOne({ username }).then((user) => {
            if (user === null) {
                return res.status(400).send();  //404- User not found
            }
            user.iotdevice_id = req.body.iotdevice_id;
            user.save()
                .then(user => {
                    if (!user) {
                        return res.status(400).send()
                    }
                    return res.status(201).send(user);
                })
                .catch(err => {
                    if (err) {
                        return res.status(400).send({ error: err });
                    }
                    return res.status(400).send();
                });
        }).catch((err) => {
            return res.status(401).send({ error: err });
        })

    }).catch((err) => {
        if (err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    })
});

module.exports = router;