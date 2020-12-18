import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
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
  const [choice, setChoice] = React.useState(false);
  const user = useSelector((state) => state.user.profile);
  // const { update } = useSelector((state) => state.user)
  const {name, info, phone, picture} = user;
  console.log(user);
  const Event = React.useRef();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Please insert your name')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    // info: Yup.string().required('Please insert your Info'),
  });

  // let options ={
  //   maxWidth:300,
  //   maxHeight:300,
  //   mediaType:'photo',
  //   noData:true,
  //   storageOptions:{
  //     skipBackup:true,
  //   }
  // }
  // const pictureProfil =() =>{
  //   ImagePicker.launchImageLibrary(options, async (response) => {
  //         console.log(response);
  //         if (response.didCancel) {
            
  //         }else if(response.fileSize > 2 * 1024 *1024){
  //           Alert.alert('failed pick picture','Picture Over size ')
  //         } else {
  //           setProfil(response.uri);
  //           await setImage({
  //             uri: response.uri,
  //             name: response.fileName,
  //             type: response.type,
  //           })
  //         }
  //     })
  // }
  const getData = async () => {
    await dispatch(userGetAction.profile(token));
  };
  const updateName = async (body) => {
    console.log(body);
    Event.current.close();
    await dispatch(userGetAction.updateProfil(token, body));
    getData()
  }

  // React.useEffect(() => {
  //   dispatch(userGetAction.profile(token))
  // }, [dispatch])

  // React.useEffect(() => {
  //   if(update){
  //     dispatch(userGetAction.profile(token))
  //     Alert.alert('Success','Update Profile')
  //   }
  // });

  const isSignOut = () => {
    dispatch(authAction.logout());
  };

  const isEditName = () => {
    Event.current.open();
  };
  const isEditInfo = () => {
    Event.current.open();
  };

  // const selectImage = async () => {
  //   const options = {
  //     title: 'Select Image',
  //     maxWidth: 256,
  //     maxHeight: 256,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'picture',
  //     },
  //     noData: true,
  //     mediaType: 'photo',
  //     cameraType: 'front',
  //   };

  //   ImagePicker.showImagePicker(options, async (response) => {
  //     console.log("response=",response);
  //     if (response.error) {
  //       toast('Coba lagi nanti!');
  //     } else if (response.fileSize > 2 * 1024 *1024 ) {
  //       toast('Ukuran file terlalu besar');
  //     } else if (response.didCancel) {
  //       toast('Tidak ada gambar terpilih');
  //     } else {
  //       const form = new FormData();

  //       form.append('avatar', {
  //         uri: response.uri,
  //         name: response.fileName,
  //         type: response.type,
  //       });

  //       await dispatch(userGetAction.updatePicture(token, form));
  //       getData();
  //     }
  //   });
  // };
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  const optionsCamera = {
    mediaType: 'photo',
    quality: 0,
    saveToPhotos: false,
  };
  
  const imagePicker = (callback) => {
    return ImagePicker.launchImageLibrary(options, (response) => {
      callback(response);
    });
  };
  
  const imageCapture = (callback) => {
    return ImagePicker.launchCamera(optionsCamera, (response) => {
      console.log(response);
      callback(response);
    });
  };


  const _handleUploadImage = (response) => {
    console.log(response);
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
      formData.append('photo', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });
      const data = {photo: formData, token};
      _uploadImage(data);
    }
    // });
  };

  const _uploadImage = (data) => {
    setLoading(true);
    const _callbackUploadImage = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }

        return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      }
    };
    
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity>
            <Image
              style={{height: 150, width: 150, borderRadius: 100}}
              source={picture !== null ? {uri: API_URL + picture} : profile}
            />
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', marginTop: 130, marginLeft: 220}}>
          <View
            style={{
              backgroundColor: '#135e39',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
              borderRadius: 50,
            }}>
            <TouchableOpacity onPress={() => imageCapture(_handleUploadImage)}>
              <Icon name="camera" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 30, zIndex: 0}}>
          <View style={{flexDirection: 'row', zIndex: 1}}>
            <View style={{position: 'absolute', marginTop: 30, marginLeft: 25}}>
              <Icon name="user" color="#135e39" size={20} />
            </View>
            <View style={{marginRight: 15, marginTop: 20, marginLeft: 70}}>
              <Text style={{color: 'gray', fontSize: 12}}>Name</Text>
              <Text style={{color: '#135e39', fontSize: 20}}>
                {name === null ? '-------' : name}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                marginTop: 35,
                marginLeft: 310,
                zIndex: 2,
              }}>
              <TouchableOpacity onPress={() => isEditInfo()}>
                <Icon name="pencil" color="gray" size={17} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: 245,
              marginTop: 15,
              marginLeft: 70,
              marginBottom: 15,
            }}>
            <Text style={{fontSize: 12, color: 'gray'}}>
              Ini bukan nama pengguna atau PIN Anda. Nama ini akan terlihat oleh
              kontak NowApps Anda
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#d6d6d6',
            borderBottomWidth: 2,
            marginLeft: 65,
            width: 300,
          }}
        />

        <View style={{marginBottom: 15}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{position: 'absolute', marginTop: 30, marginLeft: 25}}>
              <Icon name="info-circle" color="#135e39" size={20} />
            </View>
            <View style={{marginRight: 15, marginTop: 20, marginLeft: 70}}>
              <Text style={{color: 'gray', fontSize: 12}}>Info</Text>
              <Text style={{color: '#135e39', fontSize: 20}}>
                {info === null ? '-----' : info}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                marginTop: 35,
                marginLeft: 310,
                zIndex: 2,
              }}>
              <TouchableOpacity onPress={() => isEditIcon()}>
                <Icon name="pencil" color="gray" size={17} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#d6d6d6',
            borderBottomWidth: 2,
            marginLeft: 65,
            width: 300,
          }}
        />

        <View style={{marginTop: 0}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{position: 'absolute', marginTop: 30, marginLeft: 25}}>
              <Icon name="phone" color="#135e39" size={20} />
            </View>
            <View style={{marginRight: 15, marginTop: 20, marginLeft: 70}}>
              <Text style={{color: 'gray', fontSize: 12}}>Telpon</Text>
              <Text style={{color: '#135e39', fontSize: 20}}>+62 {phone} </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 0}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{position: 'absolute', marginTop: 30, marginLeft: 25}}>
              <Icon name="sign-out" color="red" size={20} />
            </View>
            <TouchableOpacity onPress={() => isSignOut()}>
              <View style={{marginRight: 15, marginTop: 25, marginLeft: 70}}>
                <Text style={{color: 'red', fontSize: 20}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomSheet
        ref={Event}
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
        validationSchema={schema} 
        initialValues={{name: name}} 
        onSubmit={(values) => updateName(values)} 
        >
          {({handleBlur, handleChange, handleSubmit, values}) => (
            <View>
              <Text style={{marginLeft: 40, color: '#135e39', fontSize: 16}}>
                Masukkan Info Anda
              </Text>

              <View style={{marginLeft: 40, flexDirection: 'row'}}>
                <TextInput
                  style={{
                    borderBottomColor: '#135e39',
                    borderBottomWidth: 2,
                    width: 250,
                  }}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onSubmitEditing={handleSubmit}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  value={values.name}
                />
                <Text
                  style={{
                    position: 'absolute',
                    marginLeft: 230,
                    marginTop: 25,
                  }}>
                  20
                </Text>
                <Icon2
                  name="laugh"
                  size={20}
                  style={{position: 'absolute', marginLeft: 270, marginTop: 25}}
                />
              </View>
              <View style={{flexDirection: 'row-reverse'}}>
                <TouchableOpacity onPress={() => Event.current.close()}>
                  <Text
                    style={{
                      color: '#135e39',
                      marginTop: 20,
                      marginRight: 40,
                      fontSize: 16,
                    }}>
                    Batal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={{
                      color: '#135e39',
                      marginTop: 20,
                      marginRight: 40,
                      fontSize: 16,
                    }}>
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

export default MyProfile;
