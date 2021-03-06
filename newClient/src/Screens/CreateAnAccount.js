
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Validator from 'validator';
import Input from '../Compoenents/Input/input'
import CustomButton from '../Compoenents/Button/Button';

import axios from 'axios';
import validator from 'validator';

class CreateAnAccount extends Component {
    state = {
      email: "",
      username: "",
      password: "",
//      connect_id: "",
//      iotdevice_id: "",
    };
   
    handleEmailChange = email => this.setState({email});
    handlePasswordChange = password => this.setState({ password });
    handleUsernameChange = username => {
        this.setState({ username });
    }
    handleRegister = () =>{
        const{email,username,password} = this.state; 
        if(validator.isEmail(email) && username.trim() && password.trim()){
                    axios.post('http://192.168.0.30:3000/user/register', {
                        email,
                        username,
                        password
                    })
                    .then((response) =>{
                       if(response.status == 201){
                           this.props.navigator.pop();
                       }
                    })
                    .catch((err) => {
                        alert('You made an error!');
                    });
         } else {
             alert(' Invalid Inputs !')
         }
    }
    render() {
        return (
      <View style={styles.container}>
        <View style={styles.signUpForm}>
          <Input 
                placeholder="Email" 
                onChangeText={this.handleEmailChange}
                value={this.state.email}
            />
          <Input 
                placeholder="Username" 
                onChangeText={this.handleUsernameChange}
                value={this.state.username}
            />
          <Input 
                placeholder="Password" 
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
            />
          
        </View>
        <CustomButton text="SignUp" onPress={this.handleRegister} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    signUpForm:{
        height:250,
        justifyContent:'space-around',

    }
})
export default CreateAnAccount;