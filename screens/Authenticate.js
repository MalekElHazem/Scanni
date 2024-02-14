import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { ImageBackground } from 'react-native';
import { getUser } from '../data/Database';
import { MaterialIcons } from '@expo/vector-icons';


const Authenticate = ({navigation,router}) => {
    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
    const [fingerprint, setFingerprint] = useState(false)

    useEffect(() => {
        (async () => {
            
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            const enroll =await LocalAuthentication.isEnrolledAsync()
            if(enroll){
                setFingerprint(true)
            }
        })();
    },[]);


    const [userData, setUserData] = useState(null);

  useEffect(() => {
    // getUser((userData) => {
    //   setUserData(userData);
    // });
  }, []);

  
    const handle = async()=>{
        try {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics',
                disableDeviceFallback: true,
                cancelLabel: 'Cancel'
            });
            if(biometricAuth.success){
                navigation.navigate("TabNavigation")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.start}>
            
            <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
                {isBiometricSupported && fingerprint?(
                    <TouchableOpacity style={styles.login} onPress={handle} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="login" size={30} color="#fff" />
                        <Text style={styles.text}>Login</Text>
                        </View>
                      </TouchableOpacity>
                ):(<View><Text>fingerprint not supported/ allocated</Text></View>)}
            </View>
            
            {/* <View style={styles.row}>
                <Text style={styles.cell}>{userData.id}</Text>
                <Text style={styles.cell}>{userData.firstName}</Text>
                <Text style={styles.cell}>{userData.lastName}</Text>
                <Text style={styles.cell}>{userData.email}</Text>
            </View> */}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    heading:{
        height:300,
        alignItems:"center",
        justifyContent:"center",
    },
    emoji:{
        alignItems:"center",
        justifyContent:"center",
    },
    headingtext:{
        fontSize:40,
    },
    start:{
        flex:1,
        color:"black",
        backgroundColor:"black"
    },
    button:{
        fontSize:23,
        color:"#fff",
        backgroundColor:"#03bafc",
        height:50,
        width:200,
        borderRadius:20,
        textAlign:"center",
        textAlignVertical:"center",
        fontFamily:"Roboto",
    },
    login: {
        borderRadius: 20,
        backgroundColor: '#0080ff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      },
      text: {
        color: '#fff',
        fontSize: 17,
        // text bold
        fontWeight: 'bold',
        marginLeft: 10, 
      },
})

export default Authenticate