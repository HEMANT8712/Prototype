
import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Input from '../Compoenents/Input/input';
import CustomButton from '../Compoenents/Button/Button';
import axios from 'axios';
import startPrivate from './startPrivateScreen';

class RegisterConnectScreen extends Component{
    static navigatorStyle = {
        navBarHidden: true,
    }

    state={
        username: '',
        connect_id:'',
        uniquetoken:'',

    }
    handleChangeTokenId= text =>{
        this.setState(() =>{
            return{
                uniquetoken:text,
            }
        });
    }
    handleChangeUsername= text =>{
        this.setState(() =>{
            return{
                username:text,
            }
        });
    }
    handleChangeConnectId= text =>{
        this.setState(() =>{
            return{
                connect_id:text,
            }
        });
        AsyncStorage.getItem('x-auth').then((token) => {
            if (!token) {
                alert("Invalid Username");
            }
            this.handleChangeTokenId(token);
        });
    }


    handleConnectRegister = () =>{
        const{username,connect_id } = this.state; 
        if(username.trim() && connect_id.trim()){
                    axios.post('http://172.17.70.157:3000/private/registerconnect', {
                        username,
                        connect_id,
                    },{headers:{
                        'x-auth': this.state.uniquetoken
                    }})
                    .then((response) =>{
                                        alert('Successful');
                                        startPrivate();
                    })
                    .catch((err) => {
                        alert('Invalid username or Connect_Id!');
                    });
         } else {
             alert('Username and Connect_ID fields are both Required!');
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
                        placeholder="Connect_Id" 
                        onChangeText={this.handleChangeConnectId}
                        value={this.state.connect_id}
                    />
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:150, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Register"  onPress={this.handleConnectRegister} />
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

export default RegisterConnectScreen ;