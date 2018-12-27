
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import StartAuth from './startAuthScreen';
import CustomButton from '../Compoenents/Button/Button';

class PrivateScreen extends Component{
    static navigatorStyle ={
        navBarHidden:true,
    };

    handleLogOut=()=>{
        AsyncStorage.removeItem('x-auth').then(()=>{
            return StartAuth();
        }).catch(()=> {
            return StartAuth();
        })
    };
    handlePushConnectScreen= () =>{
        this.props.navigator.push({
            screen:'newClient.RegisterConnectScreen',
            title:' Connect Device Registration'
        })
    }
    handlePushIoTScreen= () =>{
        this.props.navigator.push({
            screen:'newClient.RegisterIoTScreen',
            title:' IoT Device Registration'
        })
    }
    handleGenerateKey= () =>{
        this.props.navigator.push({
            screen:'newClient.GenerateKeyScreen',
            title:' IoT Device Key Generation'
        })
    }
    handleLockOpen= () =>{
        this.props.navigator.push({
            screen:'newClient.LockOpenScreen',
            title:'Lock Open'
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text style={ styles.message}>Private Message, Hello! </Text>
                <View 
                    style={{
                        alignItems:'center', 
                        height:100, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Register Connect Device" onPress={this.handlePushConnectScreen}/>
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:100, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Register IoT Device" onPress={this.handlePushIoTScreen}/>
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:100, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Generate Key" onPress={this.handleGenerateKey}/>
                </View>
                <View 
                    style={{
                        alignItems:'center', 
                        height:100, 
                        justifyContent:'space-around',
                        }}
                >
                    <CustomButton text="Open Lock" onPress={this.handleLockOpen}/>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'rgb(255,82,76)',
    },
    buttonContainer:{
        height:'8%',
        width:'90%',
        backgroundColor:'orange',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth:1,
        marginTop: '10%'
    },
    buttonText:{
        fontSize:22,
        color:'white',
    },
    message:{
        color:'white',
        fontSize:30,
        marginBottom:'10%',
        marginTop:'15%',
    }
})
export default PrivateScreen;