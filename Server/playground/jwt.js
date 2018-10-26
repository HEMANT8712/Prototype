
const jwt = require('jsonwebtoken');

//Jwt
let payload={
    _id:'Hello JWT'
};

let secret='12345678';

//Token Generation
let token = jwt.sign(payload, secret,{
    algorithm:''
});

console.log(token);


//Token Verification
let decoded = jwt.verify(token, secret);

console.log(decoded);