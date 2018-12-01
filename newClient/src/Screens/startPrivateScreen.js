import {Navigation} from 'react-native-navigation';


const startSingleScreen = () =>{
    Navigation.startSingleScreenApp({
        screen:{
            screen:'newClient.PrivateScreen',
            title:'Welcome to my Private Screen',
        },
    });
};

export default startSingleScreen;