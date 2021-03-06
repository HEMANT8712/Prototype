


import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Input from '../Compoenents/Input/input';
import CustomButton from '../Compoenents/Button/Button';
import axios from 'axios';
import startPrivate from './startPrivateScreen';

class GenerateKeyScreen extends Component{
    static navigatorStyle = {
        navBarHidden: true,
    }

    state={
        username: '',
        iotdevice_name:'',
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

    handleChangeIoTId = text => {
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

    handleGenerateKey = () =>{
        const{username, iotdevice_name} = this.state; 
        //alert(username + iotdevice_id + this.state.uniquetoken);
        if(username.trim() && iotdevice_name.trim()){
                    axios.post('http://192.168.0.30:3000/private/generatedevicekey', {
                        username,
                        iotdevice_name,
                    },{headers:{
                        'x-auth': this.state.uniquetoken
                    }})
                    .then((response) =>{
                        let token_key = response.data['key_id'];
                        if (token_key) {
                            AsyncStorage.setItem(iotdevice_name, token_key).then(() =>{        
                                startPrivate();
                               //AsyncStorage.getItem(iotdevice_name, (err, result) => {
                               //     alert(result);
                               // });
                            })
                            .catch((err) => {
                                alert('error');
                            });
                        }
                        else {
                            alert("Key Generation Fail, Try Again");
                        }
                    })
                    .catch((err) => {
                      //  alert('Invalid username or IoT Device_Id!');
                    });
         } else {
             alert('Username and IoT Device_Name fields are both Required!');
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
                    <Input 
                        placeholder="IoT Device_Name" 
                        onChangeText={this.handleChangeIoTId}
                        value={this.state.iotdevice_name}
                    />
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:150, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Generate"  onPress={this.handleGenerateKey} />
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
        height:150,
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
        height:100,
        width:100,
        marginTop: 100,
        marginBottom:100,
    }, 
});

export default GenerateKeyScreen ;