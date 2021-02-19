import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
// import FormInput from '../../components/FormInput';
import axios from 'axios';
import {API_URL} from '@env';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../utils';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  const BASE_URL = `${API_URL}/search`;

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
        <View style={styles.Search}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Catalog', {search: search});
            }}>
            <Icon name="search" color={colors.black} size={30} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(search) => setSearch(search)}
            style={styles.form}
            onSubmitEditing={() => {
              navigation.navigate('Catalog', {search: search});
            }}
          />
        </View>

        {/* {search !== null ? listSearch() : null} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: '100%',
    paddingHorizontal: 20,
  },
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  form: {
    width: '100%',
  },
});

export default Search;
