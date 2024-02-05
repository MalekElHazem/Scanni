import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { ImageBackground } from 'react-native';


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
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.start}>
            
            <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
                {isBiometricSupported && fingerprint?(
                    <TouchableOpacity onPress={handle} ><Text style={styles.button}>Login</Text></TouchableOpacity>
                ):(<View><Text>fingerprint not supported/ allocated</Text></View>)}
            </View>

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
        color:"black",
        backgroundColor:"#03bafc",
        height:50,
        width:200,
        borderRadius:5,
        textAlign:"center",
        textAlignVertical:"center",
        fontFamily:"Roboto",
    },
})

export default Authenticate