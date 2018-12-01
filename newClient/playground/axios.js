const axios = require('axios');

let data={
    email:'example1@example.com',
    username:'user5',
    password:'123456',
}

axios.post('http://172.17.67.167:3000/user/register', data).then((response) =>{
    console.log(response.status);
}).catch((err) => {
    console.log('User already exist or the email/username is not in correct format');
})


//axios.post('http://localhost:3000/user/login', data).then((response) =>{
//    console.log(response.headers['x-auth']); // removing x-auth from response
//
//}).catch((err) =>{
//    console.log('Wrong Username or Password !');
//})


//axios.get('http://localhost:3000/private/private',{
//    headers:{
//        'x-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmQyMDU4MzkxZDFhMzVhM2MxM2E2MGMiLCJpYXQiOjE1NDA0OTExNjB9.WQFXLDVaMzcoIBBDtaYhHhiHEH6KXvdGPHQ4Auxtk5s'
//    }
//}).then((response) =>{
//    console.log(response.status);
//}).catch((err) => {
//    console.log('err');
//});
