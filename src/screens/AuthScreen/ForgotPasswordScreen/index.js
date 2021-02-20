import React, {useState} from 'react';
import OutlineInput from 'react-native-outline-input';
import axios from 'axios';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Text,
  FormInput,
  ButtonSubmit,
  OutlineFormInput,
} from '../../../components/index';
// import {API_URL} from '@env';
import {colors} from '../../../utils';

//redux
import { connect } from 'react-redux';
import { setEmailForgot } from '../../../utils/redux/action/authAction';

const ForgotPassword = ({navigation, setEmailForgot}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = () => {
    const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (email === '') {
      setErr('plis input email first!!');
    } else if (!email.match(emailFormat)) {
      setErr(`Invalid Format email ['@', '.', 'domain']`);
    } else {
      const data = {
        email: email,
      };
      axios
        .post(`${API_URL}/auth/forgot`, data)
        .then(async (res) => {
          setEmailForgot(email);
          navigation.push('Otp');
          console.log('forgot done', res);
        })
        .catch((err) => {
          if (err.response.data.message.message === 'Internal server err') {
            setErr('Email Wrong');
          }
          console.log(err.response.data);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text size="xl" type="Bold" style={styles.forgotText}>
        FORGOT PASSWORD
      </Text>
      <View style={styles.form}>
        <Text
          size="l"
          children="Please, enter your email address. You will receive a link to create a new password via email"
          style={styles.forgotInfo}
        />
        <Text
          style={{
            marginBottom: 10,
            color: 'red',
            paddingRight: 10,
            fontSize: 15,
            textAlign: 'center',
          }}>
          {err}
        </Text>
        <OutlineInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          label="Email"
          activeValueColor={colors.black}
          activeBorderColor={colors.green}
          activeLabelColor={colors.green}
          passiveBorderColor={colors.black}
          passiveLabelColor={colors.black}
          passiveValueColor={colors.black}
          autoCompleteType="email"
          keyboardType="email-address"
          style={styles.formInput}
        />
        <ButtonSubmit
          onPress={handleSubmit}
          title="SEND"
          bg="red"
          size="l"
          style={styles.btnSend}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  form: {
    height: '80%',
    justifyContent: 'center',
  },
  forgotText: {
    fontWeight: 'bold',
    marginBottom: 50,
  },
  forgotInfo: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#9B9B9B',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  btnSend: {
    // borderRadius: 50,
  },
  formInput: {
    marginBottom: 5,
    borderWidth: 10,
  },
  alertEmail: {
    marginTop: 4,
    marginBottom: 25,
    marginHorizontal: 15,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setEmailForgot: (email) => 
    dispatch(setEmailForgot(email)),
  }
}

export default connect(null, mapDispatchToProps)(ForgotPassword);
