
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        minlength:5,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not an email!',
        },
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        minlength:4,
        trim:true,
        unique:true,
    },
    connect_id: {
        type:String,
        trim:true,
    },
    iotdevice_id:[{
        name:{
            type: String,
            trim: true,
        },
        public_key:{
            type: String,
            trim: true,
        },
        mac_addr:{
            type: String,
            trim: true,
        },
        serial:{
            type: String,
            trim: true,
        },
        newdataupdate:{
            type:Boolean,
            trim: true,
        },
    }],
    access_control:[{
        uname:{
            type:String,
            trim:true,
        },
        iotdevice_name:{
            type:String,
            trim:true,
        },
        token_key:{
            type:String,
            trim:true,
        },
        newdataupdate:{
            type:Boolean,
            trim: true,
        },
    }]
});

User.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')){
        return next();
    }
    
    bcrypt.genSalt(12,(err,salt)=>{
        if(err){
            return Promise.reject(err);
        }
        bcrypt.hash(user.password, salt, (err, hashedPassword)=>{
            user.password= hashedPassword;
            next();
        });
    });
})


module.exports = mongoose.model('User', User)