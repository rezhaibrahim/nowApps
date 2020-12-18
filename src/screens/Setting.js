import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import profile from '../assets/profile.png';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
const Setting = ({navigation}) => {
  const user = useSelector((state) => state.user.profile);
  console.log(user);
  const {name, phone, picture, info} = user;
  return (
    <View style={styles.parent}>
      <ScrollView>
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyProfile')}
            style={styles.viewProfile}>
            <View style={styles.viewPhotoProfile}>
              <Image
                style={styles.photoProfile}
                source={picture !== null ? {uri: API_URL + picture} : profile}
              />
            </View>

            <View style={styles.viewDescProfile}>
              <Text style={styles.txtName}>{name === null ? phone : name}</Text>
              <Text style={styles.txtStatus}>{info === null ? '-' : info}</Text>
            </View>

            <TouchableOpacity style={styles.btnBarcode}>
              <Icon name="qrcode" size={30} color="#004d40" />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.opsi}>
            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Icon
                  style={styles.icon}
                  name="key"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsi}>
                <Text style={styles.title}>Akun</Text>
                <Text style={styles.subtitle}>
                  Privasi, keamanan, ganti nomor
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Material
                  style={styles.icon}
                  name="chat"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsi}>
                <Text style={styles.title}>Chat</Text>
                <Text style={styles.subtitle}>
                  Tema, wallpaper, riwayat chat
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Material
                  style={styles.icon}
                  name="notifications"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsi}>
                <Text style={styles.title}>Notifikasi</Text>
                <Text style={styles.subtitle}>
                  Pesan, grup dan nada dering panggilan
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Icon
                  style={styles.icon}
                  name="circle"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsi}>
                <Text style={styles.title}>Data dan penyesuaian</Text>
                <Text style={styles.subtitle}>
                  Penggunaan jaringan, unduh otomatis
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Material
                  style={styles.icon}
                  name="help"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsi}>
                <Text style={styles.title}>Bantuan</Text>
                <Text style={styles.subtitle}>
                  Pusat Bantuan, hubungi kami, kebijakan privasi
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOpsi}>
              <View style={styles.viewIcon}>
                <Material
                  style={styles.icon}
                  name="group"
                  size={30}
                  color="#004d40"
                />
              </View>

              <View style={styles.viewDescOpsiInvite}>
                <Text style={styles.title}>Undang teman</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.viewFooter}>
              <Text style={styles.from}>from</Text>

              <Text style={styles.facebook}>Crocode</Text>
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10,
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 90,
  },
  viewPhotoProfile: {
    width: 70,
    height: 60,
    justifyContent: 'center',
  },
  photoProfile: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  viewDescProfile: {
    flex: 1,
  },
  txtName: {
    fontWeight: '900',
    fontSize: 20,
    color: 'black',
  },
  txtStatus: {
    fontSize: 15,
    color: '#424242',
  },
  opsi: {
    flex: 1,
  },
  btnOpsi: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  viewIcon: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDescOpsi: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: '900',
  },
  subtitle: {
    color: '#424242',
    fontSize: 15,
    fontWeight: '900',
  },
  viewDescOpsiInvite: {
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    flex: 1,
    height: 70,
    justifyContent: 'center',
  },
  viewFooter: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  from: {
    color: 'grey',
    fontSize: 15,
  },
  facebook: {
    color: 'black',
    letterSpacing: 2,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default Setting;
