import { FlatList, View,Text,Image,ImageBackground } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '@/components/header/header';
import NavigationFooter from './footer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
export default function Index() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const check_loggeed_in =async () => {
        const access_token = await AsyncStorage.getItem("access_token")

    }
    

useEffect(() =>{
    // setMangaFeed(mangafeed)
    if (netInfo.isInternetReachable === true){
        check_loggeed_in()
    }
    
},[netInfo])
if (netInfo.isInternetReachable === true  ){
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <ImageBackground source={{uri:"data:image/jpeg;base64,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"}} style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>

        </ImageBackground>
        {/*<View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                <Image alt='Image Here' style={{width:200,height:200}} source={{uri:"data:image/png;base64,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"}}></Image>
        </View>*/}
        <View style={{flex:0.2,padding:30,gap:30}}>
            <View style={{}}>
                <Text style={{fontSize:25}}>Log in or signup</Text>
            </View>
            <TouchableOpacity onPress={() =>{router.push("/login")}} style={{backgroundColor:"grey",width:"90%",justifyContent:"center",alignItems:"center",padding:20,borderRadius:50,alignSelf:"center"}}>
                    <Text style={{color:"white"}}>I already have an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{router.push("/createaccount")}}   style={{backgroundColor:"#3ec7f3",width:"90%",justifyContent:"center",alignItems:"center",padding:20,borderRadius:50,alignSelf:"center"}}>
                    <Text style={{color:"white"}}>Create my Account</Text>
            </TouchableOpacity>

        </View>


  

    </View>
  );
}
else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <Header style={{flex:1}}/>
        {<View style={{flex:1}}></View>}
        <NavigationFooter currentpage={"home"}></NavigationFooter>

  

    </View>
    )
}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Read your Downloads
                </Text>
            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"home"}/>

        </View>
    )
    
}
}