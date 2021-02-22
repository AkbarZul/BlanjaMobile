import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Switch, ScrollView} from 'react-native';
import OutlineInput from 'react-native-outline-input';
import {Text} from '../../../components';
import {colors} from '../../../utils';

const Settings = () => {
  const [fullname, setFullname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');

  const [isEnabledSales, setIsEnabledSales] = useState(false);
  const [isEnabledNewArivals, setIsEnabledNewArivals] = useState(false);
  const [isEnabledDelivery, setIsEnabledDelivey] = useState(false);

  const toggleSwitchSales = () => setIsEnabledSales(previousState => !previousState);
  const toggleSwitchNewArivals = () => setIsEnabledNewArivals(previousState => !previousState);
  const toggleSwitchDelivery = () => setIsEnabledDelivey(previousState => !previousState);


  return (
    <ScrollView style={styles.container}>
      <Text
        children="Settings"
        size="xl3"
        style={{marginTop: 20, marginBottom: 40}}
      />
      <Text children="Personal information" size="xl" />
      <View style={{marginVertical: 10}}>
        <OutlineInput
          value={fullname}
          onChangeText={(fullname) => setFullname(fullname)}
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
      </View>
      <View style={{marginVertical: 10}}>
        <OutlineInput
          value={dateOfBirth}
          onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
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
      <View style={{width: '100%', marginTop: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text children="Password" size="l" />
          <Text children="Change" size="l" />
        </View>
        <View style={{marginVertical: 10}}>
          <OutlineInput
            value={password}
            onChangeText={(password) => setPassword(password)}
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
        <Text children="Notifications" size="l" style={styles.styleNotif} />
        <View style={styles.styleSwitchNotif}>
          <Text children="Sales" size="m" style={styles.styleNotif} />
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={isEnabledSales ? '#2AA952' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSales}
            value={isEnabledSales}
          />
        </View>
        <View style={styles.styleSwitchNotif}>
          <Text children="New arivals" size="m" style={styles.styleNotif} />
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={isEnabledNewArivals ? '#2AA952' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNewArivals}
            value={isEnabledNewArivals}
          />
        </View>
        <View style={styles.styleSwitchNotif}>
          <Text
            children="Delivery status changes"
            size="m"
            style={styles.styleNotif}
          />
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={isEnabledDelivery ? '#2AA952' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchDelivery}
            value={isEnabledDelivery}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  formInput: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 10,
    borderRadius: 20,
  },
  styleNotif: {
    marginVertical: 10,
  },
  styleSwitchNotif: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default Settings;