import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/Text';
import {ButtonSubmit} from '../../../components/index';
import FormInput from 'react-native-outline-input';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';

const ResetPassword = ({navigation}) => {
  // const API_URL = 'http://192.168.1.2:8007';
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const email = useSelector((state) => state.authReducer.email);

  const handleSubmit = () => {
    const checkPass = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
    if (pass !== pass2) {
      setErrMsg('password does not match');
    } else if (!checkPass.test(pass)) {
      setErrMsg(
        'Password must contain at least 1 number, and be longer than 8 character',
      );
    } else {
      const data = {
        email: email,
        password: pass,
      };
      axios
        .patch(API_URL + `/auth/reset`, data)
        .then((res) => {
          console.log('bisaa reset', res);
          navigation.push('Login');
        })
        .catch(({response}) => {
          setErrMsg(response.data.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text
        size="xl3"
        children="Reset Password"
        type="Bold"
        style={styles.title}
      />
      <View style={styles.FormInput}>
        <Text
          color="red"
          size="xl"
          type="Bold"
          children="You need to change your password to activate your account"
          style={styles.text}
        />
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
        <View style={styles.input}>
          <FormInput
            value={pass}
            onChangeText={(pass) => setPass(pass)}
            label="New Password"
            passiveBorderColor="black"
            style={styles.form1}
            secureTextEntry
          />
        </View>
        <FormInput
          value={pass2}
          onChangeText={(pass2) => setPass2(pass2)}
          label="Confirmation New Password"
          passiveBorderColor="black"
          style={styles.form2}
          secureTextEntry
        />

        <ButtonSubmit
          title="Reset Password"
          bg="red"
          rippleColor="white"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 60,
  },
  FormInput: {
    justifyContent: 'center',
    height: '60%',
  },
  input: {
    marginVertical: 10,
    marginTop: 30,
  },
  form1: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  form2: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});

export default ResetPassword;
