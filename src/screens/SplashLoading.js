import React, {useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Spinner} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import background from '../assets/background.jpg';
const SplashScreenLoading = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splash');
    }, 5000);
  });
  return (
    <>
      <View style={style.container}>
        <ImageBackground source={background} style={style.image}>
          <Icon
            name="whatsapp"
            size={100}
            color="white"
            style={style.reverse}
          />
          <Text style={style.text}>NowApp</Text>
          
        </ImageBackground>
      </View>
      <View style={style.container2}>
        <ImageBackground source={background} style={style.image}>
        <Spinner />
          <Text style={{color: 'gray', marginTop: 10}}>
            Create by Rezha Maulana Jaya
          </Text>
        </ImageBackground>
      </View>
    </>
  );
};

export default SplashScreenLoading;

const style = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight:'bold',
    fontSize:20
  },
  reverse: {
    transform: [{rotate: '135deg'}],
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
});
