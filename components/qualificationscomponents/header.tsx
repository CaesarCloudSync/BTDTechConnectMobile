import { View,Text,Image } from "react-native"
export default function Header({style}:any){
    return(
        <View style={style}>
            <View style={{flex:1,alignItems:"flex-end",}}>
                <View style={{flex:3}}>
                    <View>
                        <Image style={{width:110,height:50}} source={{uri:"https://btdmembership.com/wp-content/uploads/2024/03/BTD-Logo-3-1024x446.png"}}/>
                    </View>
                </View>
                
             
            </View>

        </View>
    )
}