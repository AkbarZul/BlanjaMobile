import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {API_URL} from '@env';
import Text from '../../components/Text';
import {FlatGrid} from 'react-native-super-grid';

const FilterScreen = ({navigation}) => {
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const [pickCategory, setPickCategory] = useState();
  const [pickSize, setPickSize] = useState();
  const [pickColor, setPickColor] = useState('');

  console.log('tes col', pickColor);
  console.log('tes size', pickSize);
  console.log('tes cat', pickCategory);
  console.log('gg filter', filter);
  console.log('tes nama color', pickColor);

  const handleSubmit = () => {
    axios
      .get(
        `${API_URL}/products/filter?category=${pickCategory}&size=${pickSize}&color=${pickColor}`,
      )
      .then((res) => {
        const filter = res.data.data;
        console.log('cek filter', filter);
        setFilter(filter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColors = () => {
    axios
      .get(`${API_URL}/colors`)
      .then((res) => {
        const colors = res.data.data;
        setColor(colors);
        console.log(colors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSizes = () => {
    axios
      .get(`${API_URL}/sizes`)
      .then((res) => {
        const sizes = res.data.data;
        setSize(sizes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        const categories = res.data.data;
        setCategory(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getColors();
    getSizes();
    getCategory();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.color}>
          <Text size="m" children="colors" style={styles.bold} />
        </View>
        <View style={styles.rec}>
          {color.map(({id, color_name, color_hexa}) => {
            return (
              <View key={id}>
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: 5,
                    borderRadius: 75,
                    // overflow: 'hidden',
                    backgroundColor: color_hexa,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                  onPress={() => setPickColor(id)}></TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.sizes}>
          <Text size="m" children="sizes" style={styles.bold} />
        </View>
        <ScrollView horizontal style={styles.rec2}>
          {size.map(({id, size}) => {
            return (
              <TouchableOpacity onPress={() => setPickSize(id)} key={id}>
                <View style={styles.xs}>
                  <Text size="m" children={size} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sizes}>
          <Text size="m" children="category" style={styles.bold} />
        </View>
        <ScrollView horizontal style={styles.rec3}>
          {category.map(({id_categories, category_name}) => {
            return (
              <TouchableOpacity
                onPress={() => setPickCategory(id_categories)}
                key={id_categories}>
                <View style={styles.all}>
                  <Text size="m" children={category_name} style={styles.xs2} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      <View style={styles.rec4}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.bt}>
            <Text size="m" children="Discard" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Catalog', {pickColor: pickColor, pickCategory: pickCategory, pickSize: pickSize})}>
          <View style={styles.bt}>
            <Text size="m" children="Apply" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    // paddingHorizontal: 10,
    // marginVertical: 20,
  },

  color: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    // marginTop: 10,
    elevation: 8,
    height: 45,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  pickColor: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    // backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
  },

  rec: {
    backgroundColor: '#e5e5e5',
    // height: 90,
    marginVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sizes: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    // marginTop: 10,
    elevation: 8,
    height: 45,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  rec2: {
    backgroundColor: '#e5e5e5',
    width: '100%',
    // height: 90,
    marginVertical: 20,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  rec3: {
    backgroundColor: '#e5e5e5',
    marginVertical: 20,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    // elevation: 8,
    // width: '100%',
    // bottom: 0,
    // position: 'absolute',
    // justifyContent: 'space-between',
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

  xs: {
    // position: 'absolute',
    // bottom: 10,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    // border: 'none',
    width: 40,
    height: 40,
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  all: {
    // position: 'absolute',
    // bottom: 10,
    // left: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    // border: 'none',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 25,
    marginLeft: 10,
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
