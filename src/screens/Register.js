import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconVector from 'react-native-vector-icons/FontAwesome';
import {Alert, Text, View, StyleSheet} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  H1,
  Input,
  Item,
  Label,
} from 'native-base';

import {TouchableOpacity} from 'react-native-gesture-handler';

class Signup extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={style.parent}>
            <View style={style.title}>
              <IconVector
                style={{paddingBottom: 10}}
                name="chevron-left"
                onPress={() => this.props.navigation.navigate('WelcomeAuth')}
                size={25}
                color="black"
              />
              <Text style={style.titleText}>Signup</Text>
            </View>
            <Form>
              <Card style={style.inputCard}>
                <CardItem>
                  <Body>
                    <Item style={style.inputWrapper} floatingLabel>
                      <Label style={style.label}>Name</Label>
                      <Input style={style.input} />
                    </Item>
                  </Body>
                </CardItem>
              </Card>
              <Card style={style.inputCard}>
                <CardItem>
                  <Body>
                    <Item style={style.inputWrapper} floatingLabel>
                      <Label style={style.label}>Email</Label>
                      <Input style={style.input} />
                    </Item>
                  </Body>
                </CardItem>
              </Card>
              <Card style={style.inputCard}>
                <CardItem>
                  <Body>
                    <Item style={style.inputWrapper} floatingLabel>
                      <Label style={style.label}>Password</Label>
                      <Input style={style.input} secureTextEntry />
                    </Item>
                  </Body>
                </CardItem>
              </Card>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                style={style.linkWrapper}>
                <Text style={style.textLink}>Already have an account?</Text>
                <IconVector
                  style={style.iconLink}
                  name="long-arrow-right"
                  size={19}
                />
              </TouchableOpacity>
              <View style={style.btnWrapper}>
                <Button onPress={this.signup} style={style.btn}>
                  <Text style={style.btnText}>sign up</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: 25,
  },
  title: {
    marginTop: 25,
    marginBottom: 60,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 34,
  },
  inputCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  input: {
    color: 'black',
    fontSize: 19,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  textLink: {
    fontSize: 20,
  },
  iconLink: {
    color: '#DB3022',
    marginLeft: 5,
  },
  btnWrapper: {
    flex: 1,
    marginTop: 15,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DB3022',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default Signup;
