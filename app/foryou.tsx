import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native'
import NavFooter from '@/components/navfooter/navfooter';
import Header from '@/components/qualificationscomponents/header';
import MainBody from '@/components/qualificationscomponents/mainbody';
import FilterCarousel from '@/components/qualificationscomponents/filtercarousel';
import Search from '@/components/qualificationscomponents/search';
import { description } from '@/components/qualificationscomponents/desctiption_lorem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useNetInfo } from '@react-native-community/netinfo';
import TransitionPage from '@/components/transitionanimation/transitionpage';
export default function ForYou() {
  const chosen_career = "Game Development"
  const netInfo = useNetInfo();
  const router = useRouter();
  const [careers_info,setCareersInfo] = useState(null)
  const [qualifications,setQualifications] = useState([]);
  const [user_interests,setUserInterests] = useState<any>(null);
  const [pagenum,setPageNum] = useState(1);
  const [pagecarousel,setPageCarousel] = useState([0,1,2,3]);
  const[pagechanged,setPageChanged] = useState(false);
  const [atend,setAtEnd] = useState(false);
  const [searchtext,setSearchText] = useState("");
  const getqualifications =async () => {

  const access_token = await AsyncStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
};
    let offset = pagenum === 1 ? 1 : pagenum * 8 
    const response= await axios.get(`https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getuserinterestqualifications?offset=${offset}`,config)
    let result = response.data
    //console.log(result)
    if ("qualifications" in result){
      setQualifications(result["qualifications"])
    }
    else if ("error" in result){
      if (result.error.includes("no qualifications exist in the database.")){
        const response= await axios.get(`https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getqualifications?offset=${offset}`)
        let result = response.data
        setQualifications(result["qualifications"])

      }
      else{
        Alert.alert(result.error)
      }
    }
    else if ("offsetend" in result){
      setAtEnd(true)
    }

  }
  const getfiltercareers =async (industry="") => {
    let offset = pagenum === 1 ? 1 : pagenum * 8 
    const query = industry !== "" ? industry : user_interests.industry
    const response= await axios.get(`https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getcareerfilter?offset=${offset}&industry=${query}`) //  // ${user_interests.careers_label} software
    let result = response.data
    if ("filters" in result){
      //console.log(result)
      setCareersInfo(result["filters"])
    }
    else if ("error" in result){
      Alert.alert(result.error)
    }
    else if ("offsetend" in result){
      setAtEnd(true)
    }
    
    
  }
  const searchqualifications =async () => {
    let offset = pagenum === 1 ? 1 : pagenum * 8 
    const response= await axios.get(`https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/searchqualifications?text=${searchtext}&offset=${offset}`)
    let result = response.data
    //console.log(result)
    if ("qualifications" in result){
      setQualifications(result["qualifications"])
    }
    else if ("error" in result){
      Alert.alert(result.error)
    }
    else if ("offsetend" in result){
      setAtEnd(true)
    }

    
  }
  const getuserinterests =async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${access_token}` }
  };
    const responseinterests = await axios.get("https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getuserinterests",config)
    let resultinterests = responseinterests.data
    getfiltercareers(resultinterests.industry)
    setUserInterests(resultinterests)
  }
  useEffect(() =>{
    if (netInfo.isInternetReachable === true){
      getuserinterests()
    }
   
  },[netInfo])
  useEffect(() =>{
    if (netInfo.isInternetReachable === true){
      if (searchtext.length === 0){

        const timer = setTimeout(() =>{
          getqualifications()
          console.log(user_interests)
          if (user_interests !== null){
            getfiltercareers()
          }
          },300)
          return () => clearTimeout(timer);
        
      }
      else{
        const timer = setTimeout(() =>{
          searchqualifications()
        },500)
        return () => clearTimeout(timer);
      }
    }

  },[searchtext,pagechanged,netInfo])

    const changepage = () =>{
      if (pagechanged === true){
        setPageChanged(false)
      }
      else{
        setPageChanged(true)
      }
    }

    const navleft = () =>{
      if (pagenum !== 1){
          setPageNum(pagenum-1)
          changepage()
          setAtEnd(false)

      }

  }
  const navright = () =>{
      //console.log("hi",pagenum)
      if (atend === false){
        setPageNum(pagenum+1)
        changepage()
      }



  }
  const navpick = (index:number) =>{
      if (pagenum !== index){
          //console.log("ho",index)
          setPageNum(index)
          changepage()
      }


  }
  if (netInfo.isInternetReachable === true && qualifications.length === 0){
    return(
      <TransitionPage currentpage={"foryou"}/>
      
    )
  }
  //const qualifications = [{"qual_name":"Game Development","link":"https://croydon.ac.uk/","description":description,"qual_icon":"https://qual_icon","qualuuid":"qual-1234","institution":"Croydon College","online_freq":"Online 2 days a week","in_person_freq":"In Person 1 day a week","course_length":"2 years study","earning_potential_lower":"60k","earning_potential_upper":"180K","earning_potential_description":"no experience needed"},{"qualuuid":"qual-1234","institution":"GAMES ARE US","link":"https://www.universitygames.com/","description":description,"online_freq":"Online 4 days a week","in_person_freq":"","course_length":"18 months study","qual_name":"Game Designer","qual_icon":"https://qual_icon","earning_potential_lower":"75k","earning_potential_upper":"120K","earning_potential_description":"3 months training provided before job offer"},{"qualuuid":"qual-1234","institution":"GAMES . STUDY","link":"https://classmaster.io/learning-games/online-games-for-studying/","description":description,"online_freq":"2 days a week","in_person_freq":"In person 3 days a week","course_length":"18 months study","qual_name":"Game Content Creator","qual_icon":"https://qual_icon","earning_potential_lower":"60k","earning_potential_upper":"80K","earning_potential_description":"full stack developer"}]
  if (netInfo.isInternetReachable === true){
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
          backgroundColor: 'white'
        },
      ]}>
      {qualifications.length !== 0 &&<Search setSearchText={setSearchText} searchqualifications={searchqualifications} style={{flex: 0.3, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 && careers_info !== null &&<FilterCarousel careers={careers_info} setQualifications={setQualifications} style={{flex: 0.20, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 && user_interests !== null &&
                <View style={{flex:0.23,marginTop:10}} >
                  <Text style={{fontWeight:"bold",fontSize:20}}>{user_interests.careers_label}</Text>
                  <Text style={{fontWeight:"bold",fontSize:15}}>{user_interests.industry_label}</Text>
  
              </View>
                  }
            {qualifications.length !== 0 && user_interests !== null &&
      <View style={{flex:0.15,justifyContent:"center",alignItems:"center",marginTop:10}} >
        <View style={{flexDirection:"row",gap:20}}>
          <TouchableOpacity style={{top:5,width:30}} onPress={() =>{navleft()}}>
          <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          {pagecarousel.map((index) =>{
                      return( <TouchableOpacity key={index}  onPress={() =>{navpick(index+ pagenum)}} style={{backgroundColor:index+ pagenum === pagenum ? "#61edae" :"transparent",borderRadius:3,padding:5}}>
                        <Text>
                        {index + pagenum}
                        </Text></TouchableOpacity>)
                  }) }
            <TouchableOpacity style={{top:5,width:30}} onPress={() =>{navright()}}>
              <Feather name="arrow-right" size={18} color="black" />
            </TouchableOpacity>
        </View>
    </View>
                  }
      {qualifications.length !== 0 && <MainBody qualifications={qualifications} style={{flex: 3, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 &&<NavFooter currentpage={"foryou"} style={{flex:0.13}}/>}
    </View>
  );}
  else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}

            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"black"}}>No Internet Connection</Text>
                <Text>Please connect to enjoy your journey</Text>

            </View>
            



            {/*Navigation Footer*/}
            <NavFooter currentpage={"foryou"}/>

        </View>
    )
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});