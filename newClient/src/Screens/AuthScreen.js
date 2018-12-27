
import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Input from '../Compoenents/Input/input';
import CustomButton from '../Compoenents/Button/Button';
import TextButton from '../Compoenents/TextButton/TextButton';
import startPrivate from './startPrivateScreen';
import axios from 'axios';

export default class App extends Component{
    static navigatorStyle = {
        navBarHidden: true,
    }

    state={
        username: '',
        password:'',

    }
    handleChangeUsername= text =>{
        this.setState(() =>{
            return{
                username:text,
            }
        });
    }
    handleChangePassword= text =>{
        this.setState(() =>{
            return{
                password:text,
            }
        });
    }

    handlePushScreen= () =>{
        this.props.navigator.push({
            screen:'newClient.CreateAnAccount',
            title:'Sign Up'
        })
    }

    handleLogin = () =>{
        const{username,password } = this.state; 
        
        if(username.trim() && password.trim()){
                    axios.post('http://172.17.70.157:3000/user/login', {
                        username,
                        password
                    })
                    .then((response) =>{
                    
                           try{
                               const token = response.headers['x-auth'];
                               if(token){
                                    AsyncStorage.setItem('x-auth', token)
                                    .then(() => {
                                        startPrivate();
                                    })
                                    .catch((err) =>{
                                        alert('error');
                                    });
                               }     
                           }catch(err){
                               alert('error');
                           }
                    })
                    .catch((err) => {
                        alert('Wrong username or password!');
                    });
         } else {
             alert('Username and Password fireld are both Required!');
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
                        placeholder="Password" 
                        secureTextEntry 
                        onChangeText={this.handleChangePassword}
                        value={this.state.password}
                    />
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:150, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Sign In" onPress={this.handleLogin}/>
                    <TextButton onPress={this.handlePushScreen} text="Sign Up"/>
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
        marginTop: 75,
        marginBottom:75,
    }, 
});
