import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/EvilIcons';
import CheckBox from '@react-native-community/checkbox';

import {colors} from '../../utils';

export default class ListScreen extends Component {
  state = {
    check: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  };

  handleCheckBox() {
    this.setState({
      check: !this.state.check,
    });
  }

  handleCheckBox2() {
    this.setState({
      check2: !this.state.check2,
    });
  }

  handleCheckBox3() {
    this.setState({
      check3: !this.state.check3,
    });
  }

  handleCheckBox4() {
    this.setState({
      check4: !this.state.check4,
    });
  }

  handleCheckBox5() {
    this.setState({
      check5: !this.state.check5,
    });
  }

  handleCheckBox6() {
    this.setState({
      check6: !this.state.check6,
    });
  }
  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
          <View style={styles.Search}>
            <TextInput placeholder="Search" style={styles.form} />
            <Icon name="search" color="gray" size={30} style={styles.icon} />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="addidas" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check}
              onChange={() => this.handleCheckBox()}
            />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="addidas Originals" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check2}
              onChange={() => this.handleCheckBox2()}
            />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="nike" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check3}
              onChange={() => this.handleCheckBox3()}
            />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="vans" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check4}
              onChange={() => this.handleCheckBox4()}
            />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="rebook" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check5}
              onChange={() => this.handleCheckBox5()}
            />
          </View>
          <View style={styles.checkboxcontainer}>
            <Text size="l" children="converse" />
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={this.state.check6}
              onChange={() => this.handleCheckBox6()}
            />
          </View>
        </ScrollView>
        <View style={styles.rec4}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DB3022"
            onPress={() => alert('Pressed!')}
            style={styles.bt}>
            <Text size="m" children="Discard" />
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DB3022"
            onPress={() => alert('Pressed!')}
            style={styles.bt}>
            <Text size="m" children="Apply" />
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
  },

  Search: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 15,
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 50,
    borderWidth: 0,
    borderRadius: 23,
    justifyContent: 'center',
    // marginHorizontal: 30,
  },
  icon: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 35,
  },

  checkboxcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 30,
  },

  rec4: {
    backgroundColor: '#f9f9f9',
    height: 104,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 20,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  bt: {
    // position: 'absolute',
    // bottom: 10,
    // left: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    // border: 'none',
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 10,
  },
});
