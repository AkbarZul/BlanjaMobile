import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import OutlineInput from 'react-native-outline-input';
import {Text} from '../../../components';
import {colors} from '../../../utils';

class Settings extends Component {
  state = {
    fullname: '',
    dateOfBirth: '',
    password: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text children="Settings" size="xl3" />
        <Text children="Personal information" size="xl" />
        <View>
          <OutlineInput
            value={this.state.fullname}
            onChangeText={(text) => this.handleChange(text)}
            label="Full name"
            activeValueColor={colors.black}
            activeBorderColor={colors.green}
            activeLabelColor={colors.green}
            passiveBorderColor={colors.white}
            passiveLabelColor={colors.black}
            passiveValueColor={colors.black}
            autoCompleteType="email"
            keyboardType="email-address"
            style={styles.formInput}
          />
          <OutlineInput
            value={this.state.dateOfBirth}
            onChangeText={(text) => this.handleChange(text)}
            label="Date of birth"
            activeValueColor={colors.black}
            activeBorderColor={colors.green}
            activeLabelColor={colors.green}
            passiveBorderColor={colors.white}
            passiveLabelColor={colors.black}
            passiveValueColor={colors.black}
            autoCompleteType="email"
            keyboardType="email-address"
            style={styles.formInput}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text children="Password" size="l" />
            <Text children="Change" size="l" />
          </View>
          <View>
            <OutlineInput
              value={this.state.password}
              onChangeText={(text) => this.handleChange(text)}
              label="Password"
              activeValueColor={colors.black}
              activeBorderColor={colors.green}
              activeLabelColor={colors.green}
              passiveBorderColor={colors.white}
              passiveLabelColor={colors.black}
              passiveValueColor={colors.black}
              autoCompleteType="email"
              keyboardType="email-address"
              style={styles.formInput}
            />
          </View>
        </View>
        <View>
          <Text children="Notifications" />
          <View>
            <Text children="Sales" />
          </View>
          <View>
            <Text children="New arivals" />
          </View>
          <View>
            <Text children="Delivery status changes" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  formInput: {
    marginBottom: 15,
    borderWidth: 10,
    borderRadius: 20,
  },
});

export default Settings;
