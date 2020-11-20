import React, {Component} from 'react';
import {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Content,
  Text,
  Badge,
  Container,
  Fab,
  Icon,
} from 'native-base';
import {StyleSheet} from 'react-native'

export default class ChatScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg',
                }}
              />
            </Left>
            <Body>
              <Text>Er Gulshan</Text>
              <Text note>How are you Harinder?</Text>
            </Body>
            <Right>
              <Text note style={{color: '#25D366'}}>
                3:43 pm
              </Text>
              <Badge style={style.badgeChats}>
                <Text style={style.badgeTextChats}>1</Text>
              </Badge>
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/buddhasource/128.jpg',
                }}
              />
            </Left>
            <Body>
              <Text>Mohammad</Text>
              <Text note>How are you Harinder?</Text>
            </Body>
            <Right>
              <Text note style={{color: '#25D366'}}>
                3:43 pm
              </Text>
              <Badge style={style.badgeChats}>
                <Text style={style.badgeTextChats}>4</Text>
              </Badge>
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/vicivadeline/128.jpg',
                }}
              />
            </Left>
            <Body>
              <Text>Brian</Text>
              <Text note>How are you Harinder?</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/naitanamoreno/128.jpg',
                }}
              />
            </Left>
            <Body>
              <Text>Michael</Text>
              <Text note>How are you Harinder?</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        </Content>
        <Fab style={style.fabColor} position="bottomRight">
          <Icon type="MaterialIcons" name="chat" />
        </Fab>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  //Common Style
  appTitle: {
    fontSize: 22,
    color: 'snow',
  },
  headerBackgroundColor: {
    backgroundColor: '#075E54',
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
  },
  badge: {
    backgroundColor: '#ECE5DD',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  badgeText: {
    color: '#075E54',
    fontSize: 12,
  },
  tabsText: {fontSize: 14, fontWeight: 'bold'},
  //Chat Screen
  badgeChats: {
    backgroundColor: '#25D366',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    color: 'snow',
    fontSize: 12,
  },
  fabColor: {
    backgroundColor: '#25D366',
  },
  // Status Screen
  listItemDivider: {marginTop: 10, height: 10},
  addStatusIcon: {
    color: '#25D366',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginLeft: 40,
    bottom: -5,
    width: 20,
    fontSize: 20,
  },
  // Call Screen
  callIcon: {
    marginRight: 10,
    fontSize: 18,
  },
});