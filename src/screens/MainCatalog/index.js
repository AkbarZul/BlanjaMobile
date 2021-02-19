import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {ImgNotProduct} from '../../assets/images/no-product-found.png';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {API_URL} from '@env';
import ActionSheet from 'react-native-actions-sheet';

const actionSheetRef = createRef();

const MainCatalogScreen = ({navigation, route}) => {
  let {card, search, pickColor, pickCategory, pickSize} = route.params;
  const [isProducts, setIsProducts] = useState([]);
  const [isSearching, setIsSearching] = useState([]);
  const [isFilter, setIsFilter] = useState([]);
  const [isNotFoundFilter, setIsNotFoundFilter] = useState(false);
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);

  console.log('ini products', isProducts);
  console.log('ini isSearching', isSearching);
  console.log('ini isFilter', isFilter);

  const handleFilter = () => {
    axios
      .get(
        `${API_URL}/products/filter?category=${pickCategory}&size=${pickSize}&color=${pickColor}`,
      )
      .then((res) => {
        const filter = res.data.data;
        if (filter.length == 0) {
          setIsNotFoundFilter(true);
        } else {
          setIsFilter(filter);
          setIsNotFoundFilter(false);
        }
        // console.log('cek filter', filter);
      })
      .catch((err) => {
        setIsNotFoundFilter(true);
        setIsNotFoundSearch(false);
        console.log(err);
      });
  };

  const searching = () => {
    axios
      .get(`${API_URL}/search?keyword=${search}`)
      .then((res) => {
        const products = res.data.data;
        setIsSearching(products);
        // console.log('data search', products);
      })
      .catch((err) => {
        setIsNotFoundSearch(true);
        setIsNotFoundFilter(false);
        console.log(err);
      });
  };

  const getNew = async () => {
    await axios
      .get(`${API_URL}/products?keyword=created_at DESC&limit=100`)
      .then((res) => {
        const products = res.data.data.products;
        setIsProducts(products);
      })
      .catch((err) => {
        setIsNotFoundFilter(true);
        setIsNotFoundSearch(true);
        console.log(err);
      });
  };

  // const getPopular = async () => {
  //   await axios
  //     .get(`${API_URL}/products?keyword=rating DESC&limit=100`)
  //     .then((res) => {
  //       const cardTwo = res.data.data.products;
  //       // console.log('DataPopular', cardTwo);
  //       setCardTwo(cardTwo);
  //     })
  //     .catch((err) => {
  //       setIsNotFound(true);
  //       console.log(err);
  //     });
  // };

  // const getProduct = () => {
  //   setIsProducts(card);
  // }

  useEffect(() => {
    handleFilter(pickCategory, pickColor, pickSize);
  }, [pickCategory, pickColor, pickSize]);

  useEffect(() => {
    searching(search);
  }, [search]);

  useEffect(() => {
    getNew();
  }, []);
  // useEffect(() => {
  //   getPopular();
  // }, []);

  return (
    <>
      {search !== undefined &&
      pickCategory === undefined &&
      pickColor === undefined &&
      pickSize === undefined &&
      isNotFoundSearch === false ? (
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
                  source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                  style={{borderRadius: 10, width: '100%', height: 100}}
                  resizeMode="contain"
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemCode}>{item.product_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : search === undefined &&
        pickCategory !== undefined &&
        pickColor !== undefined &&
        pickSize !== undefined &&
        isNotFoundFilter === false ? (
        <FlatGrid
          itemDimension={130}
          data={isFilter}
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
                  source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                  style={{borderRadius: 10, width: '100%', height: 100}}
                  resizeMode="contain"
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemCode}>{item.product_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : search === undefined &&
        pickCategory === undefined &&
        pickColor === undefined &&
        pickSize === undefined ? (
        <FlatGrid
          itemDimension={130}
          data={isProducts}
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
                  source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                  style={{borderRadius: 10, width: '100%', height: 100}}
                  resizeMode="contain"
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemCode}>{item.product_price}</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
});

export default MainCatalogScreen;
