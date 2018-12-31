

import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Input from '../Compoenents/Input/input';
import CustomButton from '../Compoenents/Button/Button';
import axios from 'axios';
import startPrivate from './startPrivateScreen';

class RegisterIoTScreen extends Component{
    static navigatorStyle = {
        navBarHidden: true,
    }

    state={
        username: '',
        iotdevice_name:'',
        iotdevice_public_key:'',
        iotdevice_mac_addr:'',
        iotdevice_serial:'',
        uniquetoken:'',

    }
    handleChangeUsername= text =>{
        this.setState(() =>{
            return{
                username:text,
            }
        });
    }
    handleChangeTokenId= text =>{
        this.setState(() =>{
            return{
                uniquetoken:text,
            }
        });
    }

    handleChangeIoTName = text => {
        this.setState(() => {
            return {
                iotdevice_name: text,
            }
        });
        AsyncStorage.getItem('x-auth').then((token) => {
            if (!token) {
                alert("Invalid Username");
            }
            this.handleChangeTokenId(token);
        });
    }
    handleChangeIoTPublicKey = text => {
        this.setState(() => {
            return {
                iotdevice_public_key: text,
            }
        });
    }
    handleChangeIoTMacAddr = text => {
        this.setState(() => {
            return {
                iotdevice_mac_addr: text,
            }
        });
    }
    handleChangeIoTSerial = text => {
        this.setState(() => {
            return {
                iotdevice_serial: text,
            }
        });
    }

    handleIoTRegister = () =>{
        const{username, iotdevice_name, iotdevice_public_key, iotdevice_mac_addr, iotdevice_serial} = this.state; 

        if(username.trim() && iotdevice_name.trim() && iotdevice_mac_addr.trim() && iotdevice_public_key.trim() && iotdevice_serial.trim()){
                    axios.post('http://192.168.0.30:3000/private/registeriotdevice', {
                        username,
                        iotdevice_name,
                        iotdevice_public_key,
                        iotdevice_mac_addr,
                        iotdevice_serial,
                    },{headers:{
                        'x-auth': this.state.uniquetoken
                    }})
                    .then((response) =>{
                                        alert('Successful');
                                        startPrivate();
                    })
                    .catch((err) => {
                        alert('Invalid username or IoT Device_Id!');
                    });
         } else {
             alert('Username and IoT Device_ID fields are both Required!');
         }
    } 
    render() {
        return (
            <View style={styles.container}>
                <Image 
                     source={require('../../assets/images/logo.png')}
                     style={styles.img1} 
                 />
                <View style={styles.formContainer}>
                    <Input 
                        placeholder="Username" 
                        onChangeText={this.handleChangeUsername}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input 
                        placeholder="IoT Device_Name" 
                        onChangeText={this.handleChangeIoTName}
                        value={this.state.iotdevice_name}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input 
                        placeholder="IoT Device_Public_Key" 
                        onChangeText={this.handleChangeIoTPublicKey}
                        value={this.state.iotdevice_public_key}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input 
                        placeholder="IoT Device_Mac_Addr" 
                        onChangeText={this.handleChangeIoTMacAddr}
                        value={this.state.iotdevice_mac_addr}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input 
                        placeholder="IoT Device_Serial" 
                        onChangeText={this.handleChangeIoTSerial}
                        value={this.state.iotdevice_serial}
                    />
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:150, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Register"  onPress={this.handleIoTRegister} />
                </View>
                
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: '#fff',
        backgroundColor: 'rgb(255,255,255)',  //same result as above
    },
    formContainer:{
        height:60,
        justifyContent:'space-around',
    },
    textInput:{
        width:'90%',
        height:'8%',
        backgroundColor:'rgb(242,242,242)',
        borderRadius:30,
        paddingLeft:'8%',
        color:'rgb(188,188,188)',
        fontSize:18,
    },
    img1:{
        height:50,
        width:50,
        marginTop: 50,
        marginBottom:50,
    }, 
});

export default RegisterIoTScreen ;