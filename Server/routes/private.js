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
    User.findOne({connect_id: req.body.connect_id}).then((user) => {
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
    console.log(req.body); 
    User.findOne({"iotdevice_id.serial":req.body.iotdevice_serial }).then((user) => {
        if (user !== null) {
            console.log("Device Already Exist");
            return res.status(401).send();  //404- IoT Device ID Already Exist
        }
            console.log("Device did not Exist");

        User.findOne({username: req.body.username}).then((user) => {
            if (user === null) {
                return res.status(400).send();  //404- User not found
            }

            console.log("user Exist ");
            var i = 0;
            while(user.iotdevice_id[i]){
                console.log(user.iotdevice_id[i].name);
                i++;
            } 
            user.iotdevice_id[i] = []; // Clone the tags array
            user.iotdevice_id[i].name = req.body.iotdevice_name; // Clone the tags array
            user.iotdevice_id[i].public_key = req.body.iotdevice_public_key; // Clone the tags array
            user.iotdevice_id[i].mac_addr = req.body.iotdevice_mac_addr; // Clone the tags array
            user.iotdevice_id[i].serial = req.body.iotdevice_serial; // Clone the tags array
            user.iotdevice_id[i].newdataupdate = false; // Clone the tags array
            
            console.log(user.iotdevice_id[i]);
            
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

router.post('/generatedevicekey', authenticate, (req, res) => {
     
    //const { username, iotdevice_id } = req.body;

            console.log(req.body);
    User.findOne({ "iotdevice_id.name": req.body.iotdevice_name }).then((user) => {
     
        if (user === null) {
            return res.status(401).send();  //404- IoT Device did not Exist
        }

        if (user.username !== req.body.username) {
            return res.status(401).send({ error: err });
        }
        console.log("user exists");     
        var i = 0;

        while (user.access_control[i]) {

            console.log(user.access_control[i].uname);
            i++;
        }

        console.log("user Exist " + i);

        let new_secret = secret.concat(req.body.iotdevice_name);
        let token = jwt.sign({ _id: user._id }, new_secret);
        let obj = {
            key_id: token,
        };
        console.log("key_id :" + token);

        user.access_control[i] = []; // Clone the tags array
        user.access_control[i].uname = req.body.username; // Clone the tags array
        user.access_control[i].iotdevice_name = req.body.iotdevice_name; // Clone the tags array
        user.access_control[i].token_key = token; // Clone the tags array
        user.access_control[i].newdataupdate = false; // Clone the tags array

        console.log(user.access_control[i]);

        user.save()
            .then(user => {
                if (!user) {
                    return res.status(400).send()
                }
                return res.status(201).send(obj);
            })
            .catch(err => {
                if (err) {
                    return res.status(400).send({ error: err });
                }
                return res.status(400).send();
            });
    }).catch((err) => {
        if (err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    })
})

router.post('/newiotdeviceinfo', authenticate, (req, res) => {
    console.log(req.body);

    User.findOne({ username: req.body.username }).then((user) => {
        if (user === null) {
            return res.status(400).send();  //404- User not found
        }

        if (user.connect_id !== req.body.connect_id) {
            return res.status(401).send({ error: err });
        }
        console.log("user Exist ");
        var i = 0;
        
        while (user.iotdevice_id[i]) {
            if (user.iotdevice_id[i].newdataupdate !== true) {

                console.log(user.iotdevice_id[i].name);

                user.iotdevice_id[i].newdataupdate = true;
                user.save()
                    .then(user => {
                        if (!user) {
                            return res.status(400).send()
                        }
                        return res.status(201).send(user.iotdevice_id[i]);
                    })
                    .catch(err => {
                        if (err) {
                            return res.status(400).send({ error: err });
                        }
                        return res.status(400).send();
                    });
                break;
            }
            i++;
        }
        if (!user.iotdevice_id[i]) {
            return res.status(400).send();
        }

    }).catch((err) => {
        return res.status(401).send({ error: err });
    })

});
router.post('/newiottokeninfo', authenticate, (req, res) => {
    console.log(req.body);

    User.findOne({ username: req.body.username }).then((user) => {
        if (user === null) {
            return res.status(400).send();  //404- User not found
        }

        if (user.connect_id !== req.body.connect_id) {
            return res.status(401).send({ error: err });
        }
        console.log("user Exist ");
        var i = 0;
        
        while (user.access_control[i]) {
            if (user.access_control[i].newdataupdate !== true) {

                console.log(user.access_control[i].name);
                
                user.access_control[i].newdataupdate = true;

                user.save()
                    .then(user => {
                        if (!user) {
                            return res.status(400).send()
                        }
                        return res.status(201).send(user.access_control[i]);
                    })
                    .catch(err => {
                        if (err) {
                            return res.status(400).send({ error: err });
                        }
                        return res.status(400).send();
                    });
                break;
            }
            i++;
            console.log(i);
        }
        if (!user.access_control[i]) {
            return res.status(400).send();
        }

    }).catch((err) => {
        return res.status(401).send({ error: err });
    })

});

module.exports = router;