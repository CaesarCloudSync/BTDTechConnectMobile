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

export default function QualificationsScreen() {
  const chosen_career = "Game Development"
  const router = useRouter();
  const careers_info = {"filters":[{"label":"Game Development","value":"game_development"},{"label":"Python","value":"python"},{"label":"C#","value":"c#"},{"label":"Angular","value":"angular"},{"label":"C++","value":"cpp"},{"label":"Vue","value":"vue"},{"label":"Vite","value":"vite"}]}
  const [qualifications,setQualifications] = useState([]);
  const [user_interests,setUserInterests] = useState<any>(null);
  const [pagenum,setPageNum] = useState(1);
  const [pagecarousel,setPageCarousel] = useState([0,1,2,3]);
  const[pagechanged,setPageChanged] = useState(false);
  const [atend,setAtEnd] = useState(false);
  const getqualifications =async () => {

  console.log(pagenum)
    let offset = pagenum === 1 ? 1 : pagenum * 8 
    const response= await axios.get(`http://192.168.0.12:8080/api/v1/getqualifications?offset=${offset}`)
    let result = response.data
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

  useEffect(() =>{
    getqualifications()
  },[pagechanged])
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
  //const qualifications = [{"qual_name":"Game Development","link":"https://croydon.ac.uk/","description":description,"qual_icon":"https://qual_icon","qualuuid":"qual-1234","institution":"Croydon College","online_freq":"Online 2 days a week","in_person_freq":"In Person 1 day a week","course_length":"2 years study","earning_potential_lower":"60k","earning_potential_upper":"180K","earning_potential_description":"no experience needed"},{"qualuuid":"qual-1234","institution":"GAMES ARE US","link":"https://www.universitygames.com/","description":description,"online_freq":"Online 4 days a week","in_person_freq":"","course_length":"18 months study","qual_name":"Game Designer","qual_icon":"https://qual_icon","earning_potential_lower":"75k","earning_potential_upper":"120K","earning_potential_description":"3 months training provided before job offer"},{"qualuuid":"qual-1234","institution":"GAMES . STUDY","link":"https://classmaster.io/learning-games/online-games-for-studying/","description":description,"online_freq":"2 days a week","in_person_freq":"In person 3 days a week","course_length":"18 months study","qual_name":"Game Content Creator","qual_icon":"https://qual_icon","earning_potential_lower":"60k","earning_potential_upper":"80K","earning_potential_description":"full stack developer"}]
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
      {qualifications.length !== 0 &&<Search style={{flex: 0.3, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 && <FilterCarousel careers={careers_info.filters} style={{flex: 0.20, backgroundColor: 'white'}} />}

            {qualifications.length !== 0 && 
      <View style={{flex:0.15,justifyContent:"center",alignItems:"center",marginTop:10}} >
        <View style={{flexDirection:"row",gap:20}}>
          <TouchableOpacity style={{top:5,width:30}} onPress={() =>{navleft()}}>
          <Feather name="arrow-left" size={18} color="black" />
          </TouchableOpacity>
          {pagecarousel.map((index) =>{
                      return( <TouchableOpacity onPress={() =>{navpick(index+ pagenum)}} style={{backgroundColor:index+ pagenum === pagenum ? "#61edae" :"transparent",borderRadius:3,padding:5}}>
                        <Text style={{fontWeight:"bold"}}>
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
      {qualifications.length !== 0 &&<NavFooter currentpage={"home"} style={{flex:0.13}}/>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});