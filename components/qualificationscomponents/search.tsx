import { View,Text, Image } from "react-native"
import { AntDesign } from '@expo/vector-icons';

export default function Search({style}:any){
    return(
        <View style={[style,{justifyContent:"center",alignItems:"center",flexDirection:"row"}]}>
            <View>
                        <Image style={{width:50,height:50,borderRadius:5}} source={{uri:"https://storage.googleapis.com/the-route-images/Screenshot%20from%202024-06-20%2021-13-51.png"}}/>
                    </View>
            <View style={{width:"85%",height:"50%",backgroundColor:"#61edae",justifyContent:"center",alignItems:"flex-start",borderRadius:2,padding:4}}>
                <AntDesign name="search1" size={20} color="black" />

            </View>
        </View>
    )
}