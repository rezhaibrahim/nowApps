import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Right,
  Body,
  Icon,
  Text,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Badge,
  Form,
  Input
} from 'native-base';

import {StatusBar,View} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor('#075E54');
    }, 100);
  }
  render() {
    const {navigation} = this.props
    return (
      <Container style={{backgroundColor:'#454241'}}>
        <Header noShadow style={{backgroundColor:'#454241'}}>
          <View style={{marginLeft:80,marginTop:15}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Enter your phone number</Text>
          </View>
          <Right>
            <Button icon transparent>
              <Icon type="MaterialIcons" name="more-vert" />
            </Button>
          </Right>
        </Header>
        <View style={{padding:30}}>
          <Text style={{color:'white'}}>NowApp will send a SMS message to verify your phone number.What's my number</Text>
        </View>
        <View style={{flex:3,justifyContent:'center',alignItems:'center'}} >

        <Form style={{backgroundColor:'white',height:50,width:150}} >
          <Input placeholder="Country"/>
        </Form>
        <Form style={{backgroundColor:'white',height:50,width:150,margin:10}} >
          <Input placeholder="Phone number"/>
        </Form>
        
        </View>
        <View style={{flex:2,justifyContent:'center',alignItems:'center'}} >

        <Body>
          <Button onPress={() => navigation.navigate('Chats')}>
          <Text>Next</Text>
          </Button>
        </Body>

</View>
        
      </Container>
    );
  }
}