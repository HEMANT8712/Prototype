const axios = require('axios');


const {username, password, connect_id, url } = require('./config');
var newtoken = 0 ;
//var iotdevicedata=[];


function storetoken(token){
    
    console.log(newtoken);
    newtoken = token;
    console.log(newtoken);
//    newiotdeviceinfo();

}
function handleLogin() {

    if (username && password) {
        axios.post(`${url}/user/login`, {
            username,
            password
        })
            .then((response) => {

                try {
                    const token = response.headers['x-auth'];
                    if (token) {
                        console.log("token found");
                        storetoken(token);
                       // newiotdeviceinfo(token);
                    }
                } catch (err) {
                    return err;
                }
            })
            .catch((err) => {
                return err;
            });
    } else {
        return 0;
    }
} 

function newiotdeviceinfo() {
    console.log("inside funstion");
    axios.post(`${url}/private/newiottokeninfo`, {
        username,
        connect_id,
    }, {
            headers: {
                'x-auth': newtoken
            }
        })
        .then((response) => {
            console.log("data found");
            let data = response.data;
            if (data) {
                console.log(data);
            }
            else {
                console.log("Error");
            }
        })
        .catch((err) => {
            //  alert('Invalid username or IoT Device_Id!');
        });

}

function newiotdevicetokeninfo() {
    console.log("inside funstion");
    axios.post(`${url}/private/newiotdeviceinfo`, {
        username,
        connect_id,
    }, {
            headers: {
                'x-auth': newtoken
            }
        })
        .then((response) => {
            console.log("data found");
            let data = response.data;
            if (data) {
                console.log(data);
            }
            else {
                console.log("Error");
            }
        })
        .catch((err) => {
            //  alert('Invalid username or IoT Device_Id!');
        });

}
console.log (username + password + connect_id);


handleLogin();
setTimeout(newiotdeviceinfo, 3000);
setTimeout(newiotdevicetokeninfo, 6000);