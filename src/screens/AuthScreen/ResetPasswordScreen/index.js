import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/Text';
import {ButtonSubmit} from '../../../components/index';
import FormInput from 'react-native-outline-input';

export default class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmationNewPassword: '',
  };
  handleChange(text) {
    this.setState({
      newPassword: text,
    });
  }
  handlerChange(password) {
    this.setState({
      confirmationNewPassword: password,
    });
  }
  render() {
    const {newPassword, confirmationNewPassword} = this.state;
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
          <View style={styles.input}>
            <FormInput
              value={newPassword}
              onChangeText={(text) => this.handleChange(text)}
              label="New Password"
              passiveBorderColor="black"
              style={styles.form1}
              secureTextEntry
            />
          </View>
          <FormInput
            value={confirmationNewPassword}
            onChangeText={(password) => this.handlerChange(password)}
            label="Confirmation New Password"
            passiveBorderColor="black"
            style={styles.form2}
            secureTextEntry
          />

          <ButtonSubmit title="Reset Password" bg="red" rippleColor="white" />
        </View>
      </View>
    );
  }
}

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
