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
  // const API_URL = 'http://192.168.1.2:8007';
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState([]);
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);

  // const BASE_URL = `${API_URL}/search`;

  const searching = () => {
    axios
      .get(`${API_URL}/search?keyword=${search}`)
      .then((res) => {
        const products = res.data.data;
        setIsSearching(products);
        setIsNotFoundSearch(false);
        // console.log('data search', products);
      })
      .catch((err) => {
        setIsNotFoundSearch(true);
        // setIsNotFoundFilter(false);
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     searching(search);
  //   });
  //   return unsubscribe;
  // }, [search]);

  // useEffect(() => {
  //   searching();
  // }, [search]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.Search}>
          <TouchableOpacity
            onPress={() => {
              searching();
            }}>
            <Icon name="search" color={colors.black} size={30} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(search) => setSearch(search)}
            style={styles.form}
            onSubmitEditing={() => {
              searching();
            }}
          />
        </View>
        {isNotFoundSearch === false ? (
          <FlatGrid
            itemDimension={130}
            data={isSearching}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailProduct', {
                    itemId: item.id,
                    categories: item.category_name,
                  })
                }>
                <View
                  style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
                  <Image
                    source={{
                      uri: `${API_URL}${JSON.parse(
                        item.product_photo,
                      ).shift()}`,
                    }}
                    style={{borderRadius: 10, width: '100%', height: 100}}
                    resizeMode="contain"
                  />
                  <View style={{marginVertical: 5}}>
                    <Text numberOfLine={2} style={styles.itemName}>
                      {item.product_name}
                    </Text>
                    <Text style={styles.itemCode}>
                      Rp. {item.product_price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/no-product-found.png')}
              style={{width: 150, height: 150}}
            />
            <Text style={{fontSize: 20}}>Oops, your product not found!</Text>
          </View>
        )}
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
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  form: {
    width: '100%',
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
    height: 180,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
});

export default Search;