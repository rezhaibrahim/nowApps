import React, {Component} from 'react';
import {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Content,
  Text,
  Container,
  Fab,
  Icon,
  Button,
} from 'native-base';
import {StyleSheet} from 'react-native';
export default class StatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <ListItem avatar noBorder>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://image.flaticon.com/icons/png/512/147/147144.png',
                }}
              />
              <Icon
                type="MaterialIcons"
                name="add-circle"
                style={appStyles.addStatusIcon}
              />
            </Left>
            <Body>
              <Text>My Status</Text>
              <Text note>4 mintues ago</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider style={appStyles.listItemDivider}>
            <Text note style={{fontSize: 12}}>
              Recent Updates
            </Text>
          </ListItem>
        
        </Content>
        <Fab
          style={appStyles.fabColor}
          active={true}
          direction="up"
          position="bottomRight">
          <Icon type="MaterialIcons" name="photo-camera" />
          <Button style={{backgroundColor: '#F5F5F5'}}>
            <Icon type="MaterialIcons" name="edit" style={{color: '#075E54'}} />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const appStyles = StyleSheet.create({
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
