import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StatusBar, View,StyleSheet,Text,TouchableOpacity,TextInput,ImageBackground,Alert} from 'react-native';
import background from '../assets/background.jpg';
import {connect} from 'react-redux';
import loginAction from '../redux/actions/auth';
 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
       phone: '',
    };
 }

 Login = (e) => {
  e.preventDefault();
  const {phone} = this.state;
  const data = {phone};
  console.log(phone,data);
  this.props.doLogin(data);
}
showAlert = () => {
  const {alertMsg} = this.props.auth;
  if (alertMsg !== this.state.alertMsg) {
    this.setState({alertMsg});
    Alert.alert(alertMsg);
  }
};

componentWillUnmount() {
  this.showAlert();
}
  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor('#2f2f2f');
    }, 100);
  }
  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground source={background} style={styles.image}>

      <View style={styles.wrapper}>
         <View style={styles.viewHeader}>
         <TouchableOpacity style={styles.icon}>
               <Icon name="arrow-left" size={20} color="grey" onPress={() => navigation.navigate('WelcomeAuth')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon2}>
               <Icon name="ellipsis-v" size={20} color="grey" />
            </TouchableOpacity>
         </View>

        

         <View style={styles.inputGrup}>
            <TouchableOpacity style={styles.selectCountry}>
               <Text style={styles.txtCountry}>
                  Indonesia
               </Text>
               <Icon name="sort-down" size={20} color="#004d40" style={styles.iconCountry} />
            </TouchableOpacity>
         </View>

         <View style={styles.inputGrup}>
            <View style={styles.viewInitialPhone}>
               <Text style={styles.txtPlush}>+</Text>
               <TextInput style={styles.txtInitialPhone} value="62" maxLength={3}  />
            </View>
            <TextInput style={styles.inputPhone} onChangeText={phone => this.setState({phone})} placeholder="Phone number" />
         </View>

         <View style={styles.viewInfo}>
            <Text style={styles.txtInfo}>
            Enter the registered telephone number
            </Text>
         </View>

      </View>

      {/* footer */}
      <View style={styles.footer}>
         <TouchableOpacity style={styles.btnFooter} onPress={this.Login}>
            <Text style={styles.txtBtn}>Login</Text>
         </TouchableOpacity>
      </View>
  </ImageBackground>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  doLogin: loginAction.login
};  

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
     flex: 1,
  },
  viewHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     height: 50,
  },
  txtHeader: {
     flex: 12,
     justifyContent: 'center',
     textAlign: 'center',
     color: 'white',
     fontSize: 18,
     fontWeight: '900',
  },
  icon: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    margin:30
  },
  icon2: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    margin:30
  },
  viewTxtDesc: {
     height: 60,
     justifyContent: 'center',
  },
  txtDesc: {
     fontSize: 15,
     lineHeight: 25,
     textAlign: 'center',
  },
 
  inputGrup: {
     // borderWidth: 1,
     height: 50,
     width: 300,
     alignSelf: 'center',
     marginVertical: 10,
     flexDirection: 'row',
  },
  selectCountry: {
     flexDirection: 'row',
     borderBottomColor: '#004d40',
     borderBottomWidth: 1,
     height: 30,
     width: 300,
     alignItems: 'center',
     alignSelf: 'center',
     justifyContent: 'center',
  },
  txtCountry: {
     flex: 10,
     textAlign: 'center',
     fontSize: 17,
     color:'gray'
  },
  iconCountry: {
     flex: 1,
  },
  viewInitialPhone: {
     flexDirection: 'row',
     borderBottomWidth: 1,
     borderBottomColor: '#004d40',
     width: 60,
     alignItems: 'center',
     justifyContent: 'space-around',
     color:'gray' 
  },
  txtPlush: {
     color: 'grey',
     fontSize: 20,
  },
  txtInitialPhone: {
     fontSize: 20,
     color: 'grey',
  },
  inputPhone: {
     marginLeft: 10,
     borderBottomWidth: 2,
     borderBottomColor: '#004d40',
     flex: 1,
     fontSize: 19,
     color:'gray'
  },
  viewInfo: {
     marginVertical: 10,
     alignItems: 'center',
  },
  txtInfo: {
     color: 'grey',
     fontSize: 15,
     fontWeight: '900',
  },

  // footer
  footer: {
     alignItems: 'center',
     height: 50,
  },
  btnFooter: {
     backgroundColor: '#004d40',
     width: 100,
     height: 40,
     borderRadius:30,
     alignItems: 'center',
     justifyContent: 'center',
  },
  txtBtn: {
     color: 'white',
     fontSize: 15,
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(Login);