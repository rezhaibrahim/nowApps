import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
// import {} from 'react-native-gesture-handler';
import authAction from '../redux/actions/auth';
import userGetAction from '../redux/actions/user';
import {useSelector, useDispatch} from 'react-redux';
import profile from '../assets/profile.png';
import {API_URL} from '@env';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';


const MyProfile = () => {
  const dispatch = useDispatch();
  const [editIcon, setEditIcon] = React.useState(false);
  const {token} = useSelector((state) => state.auth);
  const [profil,setProfil] = React.useState(null)
  const [image,setImage] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [choice, setChoice] = React.useState(false);
  const user = useSelector((state) => state.user.profile);
  // const { update } = useSelector((state) => state.user)
  const {name, info, phone, picture} = user;
  console.log(user);
  const EventName = React.useRef();
  const EventInfo = React.useRef();

  const schemaNama = Yup.object().shape({
    name: Yup.string()
      .required('Please insert your name')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    // info: Yup.string().required('Please insert your Info'),
  });
  const schemaInfo = Yup.object().shape({
    
    info: Yup.string().required('Please insert your Info'),
  });

  
  const getData = async () => {
    await dispatch(userGetAction.profile(token));
  };
  const updateName = async (body) => {
    console.log(body);
    EventName.current.close();
    await dispatch(userGetAction.updateProfil(token, body));
    getData()
  }
  const updateInfo = async (body) => {
    console.log("body",body);
    EventInfo.current.close();
    await dispatch(userGetAction.updateProfil(token, body));
    getData()
  }



  const isSignOut = () => {
    dispatch(authAction.logout());
  };

  const isEditName = () => {
    EventName.current.open();
  };
  const isEditInfo = () => {
    EventInfo.current.open();
  };

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'picture',
    },
  };
  
  const optionsCamera = {
    mediaType: 'image',
    quality: 0,
    saveToPhotos: false,
  };
  
  const imagePicker = (callback) => {
    // console.log('callback=',callback);
    return ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      callback(response);
    });
  };
  
  const imageCapture = (callback) => {
    // console.log('callback=',callback);
    return ImagePicker.launchCamera(optionsCamera, (response) => {
      console.log(response);
      callback(response);
    });
  };
 

  const _handleUploadImage = async (response) => {
    console.log("response",response);
    setChoice(false);
    // imagePicker((response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      const formData = new FormData();
      console.log(formData);
      formData.append('image', {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });

      await dispatch(userGetAction.updatePicture(token, formData))
      getData()
      // const data = {picture: formData, token};
      // _uploadImage(data);
    }
    // });
  };

  // const _uploadImage = async (data) => {
  //   console.log("data",data)
  //   setLoading(true);
  //   const _callbackUploadImage = (res, err) => {
  //     setLoading(false);
  //     if (err) {
  //       if (res) {
  //         return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
  //       }
  //       return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
  //     }
  //   };
    
  // };

  return (
    <>
     <Modal 
     animationType='slide'
     transparent={true}
     visible={modalVisible}
     onRequestClose={()=> setModalVisible(false)}
     >

       <View style={styles.modal}>
            <View style={styles.baseModal}>
              <TouchableOpacity onPress={() => imageCapture(_handleUploadImage)} >
                <Text>Open Camera</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => imagePicker(_handleUploadImage)}>
                <Text>Open Gallery</Text>
              </TouchableOpacity>
            </View>
       </View>

     </Modal>
     
      <View
        style={styles.parent}>
        <View
          style={styles.baseImg}>
          <TouchableOpacity>
            <Image
              style={styles.img}
              source={picture !== null ? {uri: API_URL + picture} : profile}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bacgroundIcon}>
          <View
            style={styles.iconCMR}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="camera" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.baseList}>
          <View style={styles.rowContent}>
            <View style={styles.iconUser}>
              <Icon name="user" color="#135e39" size={20} />
            </View>
            <View style={styles.name}>
              <Text style={styles.txtName}>Name</Text>
              <Text style={styles.nameUser}>
                {name === null ? '-------' : name}
              </Text>
            </View>
            <View
              style={styles.pencil}>
              <TouchableOpacity onPress={() => isEditName()}>
                <Icon name="pencil" color="gray" size={17} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={styles.desc}>
            <Text style={styles.descTxt}>
              Ini bukan nama pengguna atau PIN Anda. Nama ini akan terlihat oleh
              kontak NowApps Anda
            </Text>
          </View>
        </View>

        <View
          style={styles.hr}
        />

        <View style={styles.baseListInfo}>
          <View style={styles.baseListRow}>
            <View style={styles.iconInfo}>
              <Icon name="info-circle" color="#135e39" size={20} />
            </View>
            <View style={styles.info}>
              <Text style={styles.txtInfo}>Info</Text>
              <Text style={styles.valuesInfo}>
                {info === null ? '-----' : info}
              </Text>
            </View>
            <View
              style={styles.pencilInfo}>
               <TouchableOpacity onPress={() => isEditInfo()}>
                <Icon name="pencil" color="gray" size={17} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={styles.hr}
        />

        <View >
          <View style={styles.baseListRow}>
            <View style={styles.iconPhone}>
              <Icon name="phone" color="#135e39" size={20} />
            </View>
            <View style={styles.phoneTitle}>
              <Text style={styles.phoneTxt}>Telpon</Text>
              <Text style={styles.valuesPhone}>+62 {phone} </Text>
            </View>
          </View>
        </View>
        <View >
          <View style={styles.baseListRow}>
            <View style={styles.iconSignout}>
              <Icon name="sign-out" color="red" size={20} />
            </View>
            <TouchableOpacity onPress={() => isSignOut()}>
              <View style={styles.baseTxt}>
                <Text style={styles.txt}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomSheet
        ref={EventName}
        closeOnDragDown={true}
        closeOnPressMask
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          },
          draggableIcon: {
            backgroundColor: 'gray',
          },
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 2,
          },
        }}
        height={150}>
        <Formik 
        validationSchema={schemaNama} 
        initialValues={{name: name}} 
        onSubmit={(values) => updateName(values)} 
        >
          {({handleBlur, handleChange, handleSubmit, values}) => (
            <View>
              <Text style={styles.baseBtm}>
                Masukkan nama Anda
              </Text>

              <View style={styles.btmRow}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onSubmitEditing={handleSubmit}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  value={values.name}
                />
                <Text
                  style={styles.btmAcc}>
                  20
                </Text>
                <Icon2
                  name="laugh"
                  size={20}
                  style={styles.emoji}
                />
              </View>
              <View style={styles.baseReverse}>
                <TouchableOpacity onPress={() => EventName.current.close()}>
                  <Text
                    style={styles.btn}>
                    Batal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={styles.btn}>
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </BottomSheet>

      <BottomSheet
        ref={EventInfo}
        closeOnDragDown={true}
        closeOnPressMask
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          },
          draggableIcon: {
            backgroundColor: 'gray',
          },
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 2,
          },
        }}
        height={150}>
        <Formik 
        validationSchema={schemaInfo} 
        initialValues={{info: info}} 
        onSubmit={(values) => updateInfo(values)} 
        >
          {({handleBlur, handleChange, handleSubmit, values}) => (
            <View>
              <Text style={styles.baseBtm}>
                Masukkan Info Anda
              </Text>

              <View style={styles.btmRow}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('info')}
                  onBlur={handleBlur('info')}
                  onSubmitEditing={handleSubmit}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  value={values.info}
                />
                <Text
                  style={styles.btmAcc}>
                  20
                </Text>
                <Icon2
                  name="laugh"
                  size={20}
                  style={styles.emoji}
                />
              </View>
              <View style={styles.baseReverse}>
                <TouchableOpacity onPress={() => EventInfo.current.close()}>
                  <Text
                    style={styles.btn}>
                    Batal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={styles.btn}>
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  parent:{
    flex: 1,
    backgroundColor: 'white',
  },
  baseImg:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  img:{
    height: 150, 
    width: 150, 
    borderRadius: 100
  },
  iconCMR:{
    backgroundColor: '#135e39',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  baseList:{
    marginTop: 30,
     zIndex: 0
    },
    rowContent:{
      flexDirection: 'row', 
      zIndex: 1
    },
    iconUser:{
      position: 'absolute', 
      marginTop: 30, 
      marginLeft: 25
    },
    name:{
      marginRight: 15, 
      marginTop: 20, 
      marginLeft: 70
    },
    txtName:{
      color: 'gray', 
      fontSize: 12
    },
    nameUser:{color: '#135e39', fontSize: 20},
    pencil:{
      position: 'absolute',
      marginTop: 35,
      marginLeft: 310,
      zIndex: 2,
    },
    desc:{
      width: 245,
      marginTop: 15,
      marginLeft: 70,
      marginBottom: 15,
    },
    descTxt:{fontSize: 12, color: 'gray'},
    hr:{
      borderBottomColor: '#d6d6d6',
      borderBottomWidth: 2,
      marginLeft: 65,
      width: 300,
    },
    baseListInfo:{marginBottom: 15},
    baseListRow:{flexDirection: 'row'},
    iconInfo:{position: 'absolute', marginTop: 30, marginLeft: 25},
    info:{marginRight: 15, marginTop: 20, marginLeft: 70},
    txtInfo:{color: 'gray', fontSize: 12},
    valuesInfo:{color: '#135e39', fontSize: 20},
    pencilInfo:{
      position: 'absolute',
      marginTop: 35,
      marginLeft: 310,
      zIndex: 2,
    },
    iconPhone:{position: 'absolute', marginTop: 30, marginLeft: 25},
    phoneTitle:{marginRight: 15, marginTop: 20, marginLeft: 70},
    phoneTxt:{color: 'gray', fontSize: 12},
    valuesPhone:{color: '#135e39', fontSize: 20},
    iconSignout:{position: 'absolute', marginTop: 30, marginLeft: 25},
    baseTxt:{marginRight: 15, marginTop: 25, marginLeft: 70},
    txt:{color: 'red', fontSize: 20},
    baseBtm:{marginLeft: 40, color: '#135e39', fontSize: 16},
    btmRow:{marginLeft: 40, flexDirection: 'row'},
    input:{
      borderBottomColor: '#135e39',
      borderBottomWidth: 2,
      width: 250,
    },
    btmAcc:{
      position: 'absolute',
      marginLeft: 230,
      marginTop: 25,
    },
    emoji:{position: 'absolute', marginLeft: 270, marginTop: 25},
    baseReverse:{flexDirection: 'row-reverse'},
    btn:{
      color: '#135e39',
      marginTop: 20,
      marginRight: 40,
      fontSize: 16,
    },
    modal:{
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'white', 
      width: 150,
      height:100,
      marginLeft:100,
      marginTop:220,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5
    },
    
    baseModal:{
      borderBottomColor: '#135e39',
      borderBottomWidth: 3,
    },
    bacgroundIcon:{position: 'absolute', marginTop: 130, marginLeft: 220},








})

export default MyProfile;
