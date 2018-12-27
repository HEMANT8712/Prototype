const express = require('express');
const router = express.Router();
const User = require('../db/models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

router.post('/register',(req,res)=> {
    console.log(req.body); 
    const {email, password, username, connect_id, iotdevice_id} = req.body;
    let newUser= new User({
        email,
        password,
        username,
        connect_id,
        iotdevice_id,
    });
    console.log(req.body);
    newUser
        .save()
        .then(user => {
            if(!user){
                console.log("User Null");
                return res.status(400).send()
            }
            return res.status(201).send(user);
        })
        .catch(err =>{
             if(err){
                 console.log(err);
                 return res.status(400).send({error:err});
             }
             return res.status(400).send();
        });
});

router.post('/login', (req,res) =>{
    const {username, password} = req.body;
    User.findOne({ username }).then((user) => {
        if(!user){
            return res.status(400).send();  //404- User not found
        }
        bcrypt.compare(password, user.password).then((match)=>{
            if(!match){
                return res.status(401).send();  // 401-Unauthorized ---http status code
            }
            let token = jwt.sign({_id:user._id},secret);
            console.log(token); 
            return res.status(201).header('x-auth', token).send();   // 201- Created
        }).catch((err)=> {
            return res.status(401).send({error:err});
        })

    }).catch((err)=> {
        if(err){
            return res.status(401).send(err);
        }
        return res.status(401).send();
    })
})


module.exports = router;