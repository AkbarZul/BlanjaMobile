import React, {Component} from 'react';
import OutlineInput from 'react-native-outline-input';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Text,
  FormInput,
  ButtonSubmit,
  OutlineFormInput,
} from '../../../components/index';

import {colors} from '../../../utils';

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    this.setState.email;
  }

  handleChange(text) {
    this.setState({email: text});
  }
  render() {
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
          {/* <View style={styles.input}>
          <Text children="Email" style={styles.label} />
          <FormInput
            keyboardType="email-address"
            placeholder="Email"
            style={styles.formInput}
          />
        </View> */}
          <OutlineInput
            value={this.state.email}
            onChangeText={(text) => this.handleChange(text)}
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

          <Text
            children="Not a valid email address. Should be your@email.com"
            color="red"
            style={styles.alertEmail}
          />
          <ButtonSubmit
            onPress={() => Alert.alert('Success')}
            title="SEND"
            bg="red"
            size="l"
            style={styles.btnSend}
          />
        </View>
      </ScrollView>
    );
  }
}

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

export default ForgotPassword;
