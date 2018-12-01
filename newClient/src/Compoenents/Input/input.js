import {TextInput,StyleSheet, Dimensions} from 'react-native';
import React, {Component} from 'react';

const{width, height } = Dimensions.get('screen');

class Input extends Component {
    state = { }
    render(){
        return <TextInput 
                     style={ styles.textInput } 
                     {...this.props}
                     />
    }
}


const styles = StyleSheet.create({
    textInput: {
        width: 0.9 * width,
        height: 0.08 * height,
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 30,
        paddingLeft: '8%',
        color: 'rgb(188,188,188)',
        fontSize: 18,

    }  
})
export default Input;