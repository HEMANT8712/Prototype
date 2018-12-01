
import {Navigation} from 'react-native-navigation';


const startSingleScreen = () =>{
    Navigation.startSingleScreenApp({
        screen:{
            screen:'newClient.AuthScreen',
        },
    });
};

export default startSingleScreen;