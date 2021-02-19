import React, {Component, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';

import Text from '../../../components/Text';
import {
  FormInput,
  ButtonSubmit,
  OutlineFormInput,
} from '../../../components/index';
import AwesomeAlert from 'react-native-awesome-alerts';
import OutlineInput from 'react-native-outline-input';
import {API_URL} from '@env';

// redux
import {connect} from 'react-redux';
import {login} from '../../../utils/redux/action/authAction';

const LoginScreen = ({navigation, login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState(1);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = () => {
    const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email === '') {
      setErrMsg('Harap isi email terlebih dahulu');
    } else if (password === '') {
      setErrMsg('Harap isi password terlebih dahulu');
    } else if (!email.match(emailFormat)) {
      setErrMsg(`Invalid Format email ['@', '.', 'domain']`);
      // } else if (email !== level) {
      //   setErrMsg('Email/Password Salah');
    } else {
      const data = {
        email: email,
        password: password,
        level_id: level,
      };
      axios
        .post(`${API_URL}/auth/login`, data)
        .then(async (res) => {
          console.log('Token ', res.data.data.token);
          console.log('ID ', res.data.data.user_id);
          console.log('FullName ', res.data.data.full_name);
          console.log('Email ', res.data.data.email);
          console.log('Level ', res.data.data.level);
          const token = res.data.data.token;
          const user_id = res.data.data.user_id;
          const fullname = res.data.data.full_name;
          login(token, user_id, level, fullname, email);
          console.log('done');
          navigation.navigate('Main');
        })
        .catch((err) => {
          console.log(err.response.config.data);
          if (err.response.data.message.msg === 'User Not Found') {
            setErrMsg('Email/Password Salah');
          }
          if (err.response.data.message.msg === 'Wrong Password') {
            setErrMsg('Email/Password Salah');
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <View style={styles.container}>
        <Text size="xl3" children="Login" type="Bold" style={styles.title} />
        <View style={styles.FormInput}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 60,
            }}>
            <View
              style={{
                width: '50%',
                overflow: 'hidden',
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#DB3022',
                flexDirection: 'row',
                marginRight: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={(level) => setLevel(1)}
                style={{
                  width: '50%',
                  backgroundColor: level === 1 ? '#DB3022' : '#fff',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: level === 1 ? '#fff' : '#DB3022',
                    fontSize: 15,
                  }}>
                  Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(level) => setLevel(2)}
                style={{
                  width: '50%',
                  backgroundColor: level === 2 ? '#DB3022' : '#fff',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: level === 2 ? '#fff' : '#DB3022',
                    fontSize: 15,
                  }}>
                  Seller
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              marginBottom: 10,
              color: 'red',
              paddingRight: 10,
              fontSize: 15,
              textAlign: 'center',
            }}>
            {errMsg}
          </Text>
          <View style={styles.pass}>
            <OutlineInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              label="Email"
              activeValueColor="black"
              activeBorderColor="green"
              activeLabelColor="green"
              passiveBorderColor="black"
              passiveLabelColor="black"
              passiveValueColor="black"
              // keyboardType="email-address"
              // autoCompleteType=
            />
          </View>
          <OutlineInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            label="Password"
            activeValueColor="black"
            activeBorderColor="green"
            activeLabelColor="green"
            passiveBorderColor="black"
            passiveLabelColor="black"
            passiveValueColor="black"
            secureTextEntry
            // style={{marginTop: 8}}
          />
          <TouchableOpacity>
            <View style={styles.forgot}>
              <Image
                source={require('../../../assets/image/Vector.png')}
                style={{marginTop: 5, marginLeft: 5, paddingHorizontal: 10}}
              />
              <Text
                size="s"
                children="Forgot Your Password?"
                type="Bold"
                style={{fontWeight: 'bold'}}
              />
            </View>
          </TouchableOpacity>

          <ButtonSubmit title="Login" bg="red" onPress={handleSubmit} />
        </View>
        {/* {alert ? showAlert() : null} */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 60,
  },
  FormInput: {
    justifyContent: 'center',
    height: '50%',
  },
  formI: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },

  forgot: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  pass: {
    marginBottom: 15,
    marginTop: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token, user_id, level, fullname, email) =>
      dispatch(login(token, user_id, level, fullname, email)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
