
import {Navigation} from 'react-native-navigation';


const startSingleScreen = () =>{
    Navigation.startSingleScreenApp({
        screen:{
            screen:'newClient.RegisterConnectScreen',
            title:'Welcome to my Private Screen',
        },
    });
};

export default startSingleScreen;