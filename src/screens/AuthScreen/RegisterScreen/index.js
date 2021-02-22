import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Text from '../../../components/Text';
import {
  FormInput,
  ButtonSubmit,
  OutlineFormInput,
} from '../../../components/index';
import {API_URL} from '@env';
import OutlineInput from 'react-native-outline-input';
import {connect} from 'react-redux';
import {register} from '../../../utils/redux/action/authAction';
import {colors} from '../../../utils';
import {color} from 'react-native-reanimated';

const Register = ({navigation, register}) => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState(1);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = () => {
    const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (username === '') {
      setErrMsg('Harap isi username terlebih dahulu');
    } else if (fullname === '') {
      setErrMsg('Harap isi Nama anda terlebih dahulu');
    } else if (email === '') {
      setErrMsg('Harap isi email terlebih dahulu');
    } else if (password === '') {
      setErrMsg('Harap isi password terlebih dahulu');
    } else if (!email.match(emailFormat)) {
      setErrMsg(`Invalid Format email ['@', '.', 'domain']`);
    } else {
      const data = {
        username: username,
        full_name: fullname,
        email: email,
        password: password,
        level_id: level,
      };
      axios
        .post(`${API_URL}/auth/register`, data)
        .then(async (res) => {
          register(username, fullname, email, level);
          navigation.navigate('Login');
          console.log('RESPONSE', res);
          console.log('RESPONSE', username);
          console.log('RESPONSE', email);
          console.log('Level', level);
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.error === 'email already exists') {
            Alert.alert('Failed register', 'email already exists');
            setEmail({
              email: '',
            });
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text size="xl3" children="Sign up" type="Bold" style={styles.title} />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 50,
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
            }}>
            <TouchableOpacity
              onPress={(level) => setLevel(1)}
              style={{
                width: '56%',
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
                width: '44%',
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

        <View style={styles.FormInput}>
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              marginVertical: 15,
            }}>
            {/* {level === '2' ? (
              <Text children="Sign Up For Seller" size="l" />
            ) : (
              <Text children="Sign Up For Customer" size="l" />
            )} */}
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
          </View>

          <View style={styles.pass}>
            <OutlineInput
              value={username}
              onChangeText={(username) => setUsername(username)}
              label="Username"
              activeValueColor={username === 'username empty' ? 'red' : 'black'}
              activeBorderColor={
                username === 'username empty' ? 'red' : 'green'
              }
              activeLabelColor={username === 'username empty' ? 'red' : 'green'}
              passiveBorderColor={
                username === 'username empty' ? 'red' : 'black'
              }
              passiveLabelColor={
                username === 'username empty' ? 'red' : 'black'
              }
              passiveValueColor={
                username === 'username empty' ? 'red' : 'black'
              }
            />
          </View>
          <View style={styles.pass}>
            <OutlineInput
              value={fullname}
              onChangeText={(fullname) => setFullname(fullname)}
              label="Full Name"
              activeValueColor={fullname === 'fullname empty' ? 'red' : 'black'}
              activeBorderColor={
                fullname === 'fullname empty' ? 'red' : 'green'
              }
              activeLabelColor={fullname === 'fullname empty' ? 'red' : 'green'}
              passiveBorderColor={
                fullname === 'fullname empty' ? 'red' : 'black'
              }
              passiveLabelColor={
                fullname === 'fullname empty' ? 'red' : 'black'
              }
              passiveValueColor={
                fullname === 'fullname empty' ? 'red' : 'black'
              }
            />
          </View>
          <View style={styles.pass}>
            <OutlineInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              label="Email"
              activeValueColor={email === 'email empty' ? 'red' : 'black'}
              activeBorderColor={email === 'email empty' ? 'red' : 'green'}
              activeLabelColor={email === 'email empty' ? 'red' : 'green'}
              passiveBorderColor={email === 'email empty' ? 'red' : 'black'}
              passiveLabelColor={email === 'email empty' ? 'red' : 'black'}
              passiveValueColor={email === 'email empty' ? 'red' : 'black'}
              keyboardType="email-address"
              autoCompleteType="email"
            />
          </View>
          <OutlineInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            label="Password"
            activeValueColor={password === 'password empty' ? 'red' : 'black'}
            activeBorderColor={password === 'password empty' ? 'red' : 'green'}
            activeLabelColor={password === 'password empty' ? 'red' : 'green'}
            passiveBorderColor={password === 'password empty' ? 'red' : 'black'}
            passiveLabelColor={password === 'password empty' ? 'red' : 'black'}
            passiveValueColor={password === 'password empty' ? 'red' : 'black'}
            secureTextEntry
            // style={{marginTop: 8}}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.forgot}>
              <Image
                source={require('../../../assets/image/Vector.png')}
                style={{marginTop: 5, marginLeft: 5, paddingHorizontal: 10}}
              />
              <Text
                size="s"
                children="Already have an account?"
                type="Bold"
                style={{fontWeight: 'bold'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSignup} onPress={handleSubmit}>
            <Text size="xl" color="white">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  btnUser: {
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 90,
    alignItems: 'center',
  },
  levelid: {
    backfaceVisibility: 'hidden',
  },
  FormInput: {
    // justifyContent: 'center',
    // height: '80%',
    marginTop: 30,
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
  btnSignup: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
  },
  pass: {
    marginBottom: 15,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, fullname, email, password, level) =>
      dispatch(register(username, fullname, email, password, level)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
