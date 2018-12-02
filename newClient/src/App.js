import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import startPrivate from './Screens/startPrivateScreen';
import startConnect from './Screens/startConnectScreen';

import AuthScreen from './Screens/AuthScreen';
import CreateAnAccount from './Screens/CreateAnAccount';
import PrivateScreen from './Screens/Private/';
import RegisterConnectScreen from './Screens/RegisterConnect';
import RegisterIoTScreen from './Screens/RegisterIoT';
import GenerateKeyScreen from './Screens/GenerateKey';

Navigation.registerComponent('newClient.AuthScreen', ()=> AuthScreen);
Navigation.registerComponent('newClient.CreateAnAccount', ()=>CreateAnAccount);
Navigation.registerComponent('newClient.PrivateScreen', ()=>PrivateScreen);
Navigation.registerComponent('newClient.RegisterConnectScreen', ()=>RegisterConnectScreen);
Navigation.registerComponent('newClient.RegisterIoTScreen', ()=>RegisterIoTScreen);
Navigation.registerComponent('newClient.GenerateKeyScreen', ()=>GenerateKeyScreen);

AsyncStorage.getItem('x-auth').then(token => {
  axios.get('http://172.17.83.103:3000/private/private', {
    headers: {
      'x-auth': token,
    },
  }).then(response => {
    if (response.status == 200) {
      return startPrivate();
    }
    return Navigation.startSingleScreenApp({
      screen: {
        screen: "newClient.AuthScreen"
      },
    });
  }).catch(() => {
    return Navigation.startSingleScreenApp({
      screen: {
        screen: "newClient.AuthScreen"
      },
    });

  });
});
