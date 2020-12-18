import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Header, Item, Input, Button} from 'native-base';
import userGetAction from '../redux/actions/user';


export default function HeaderForContact({navigation}) {

  const [iconSearch, setIconSearch] = useState(false);
  const [Value, setValue] = useState('');
  const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const pageInfo = useSelector((state) => state.user.chatListPageInfo.count);
console.log("page",pageInfo);

  const searching = () => {
      if(Value.length > 0){
        setValue('');
          dispatch(userGetAction.search(token, Value))
        }
        dispatch(userGetAction.clear())
  }
  const backIn =()=>{
    dispatch(userGetAction.clear())
    setIconSearch(false)
  }
  return (
    <>
      {!iconSearch ? (
        <View style={styles.header}>
          <View style={styles.iconLeft}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}>
              <Material name="arrow-back" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.base}>
            <Text style={styles.title}>Cari User</Text>
            <Text style={styles.count}>{pageInfo} online</Text>
          </View>
          <View style={styles.baseRight}>
            <TouchableOpacity onPress={() => setIconSearch(true)}>
              <Icon style={styles.icon} name="search" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="ellipsis-v" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Item style={{position: 'relative'}}>
          <View style={styles.baseBack}>
            <TouchableOpacity onPress={() => backIn()}>
              <Material
                style={styles}
                name="arrow-back"
                size={25}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <Input
            style={styles.searchBar}
            placeholder="Cari...."
            onChangeText={(key) => setValue(key)}
            onSubmitEditing={searching}
          />
        </Item>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
    height: 70,
  },
  iconLeft: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 30,
  },
  baseRight: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  base: {
    flex: 4,
    height: 70,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  btnBack: {
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
  },
  count: {
    fontSize: 13,
    color: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 70,
    paddingLeft: 30,
  },
  baseBack: {
    backgroundColor: 'white',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  iconBack: {
    marginTop: 10,
  },
});
