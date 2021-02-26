import axios from 'axios';
import React, {useEffect, useState, createRef} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import {ButtonSubmit} from '../../../components/index';
import FormInput from 'react-native-outline-input';
import {Picker} from 'native-base';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import Iconn from 'react-native-vector-icons/Ionicons';

import {API_URL} from '@env';

const sizeSheetRef = createRef();
const colorSheetRef = createRef();
const photoSheetRef = createRef();

const EditProduct = ({navigation, route}) => {
  // const API_URL='http://107.20.158.100:8007'
  const token = useSelector((state) => state.authReducer.token);

  const {itemId} = route.params;

  const [product, setProduct] = useState({});
  const [productPhoto, setProductPhoto] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [status, setStatus] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [fileCamera, setFileCamera] = useState({});
  const [filePath, setFilePath] = useState([]);

  const [ctg, setCtg] = useState();
  const [cnd, setCnd] = useState(1);
  const [sts, setSts] = useState(3);

  // console.log('Products ', product);

  const getProductsSellerById = async (itemId) => {
    await axios
      .get(`${API_URL}/products/${itemId}`)
      .then((res) => {
        const products = res.data.data;
        setProduct(products);
        setProductPhoto(JSON.parse(res.data.data.product_photo));
        setProductColors(restructureIsSelectedtrue(products.colors));
        setProductSizes(restructureIsSelectedtrue(products.sizes));
        setCtg(products.category_name);
        setCnd(products.condition_id);
        setSts(products.status_product_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = async () => {
    await axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        const categories = res.data.data;
        // console.log('category', categories);
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCondition = async () => {
    await axios
      .get(`${API_URL}/condition`)
      .then((res) => {
        const conditions = res.data.data;
        setConditions(conditions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatus = async () => {
    await axios
      .get(`${API_URL}/status`)
      .then((res) => {
        const status = res.data.data;
        setStatus(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColors = async () => {
    await axios
      .get(`${API_URL}/colors`)
      .then((res) => {
        const colors = res.data.data;
        setColors(restructureIsSelected(colors));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSizes = async () => {
    await axios
      .get(`${API_URL}/sizes`)
      .then((res) => {
        const sizes = res.data.data;
        setSizes(restructureIsSelected(sizes));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const restructureIsSelected = (data) => {
    const temp = data.map((data) => {
      data['is_selected'] = false;
      return data;
    });
    return temp;
  };

  const restructureIsSelectedtrue = (data) => {
    const temp = data.map((data) => {
      data['is_selected'] = true;
      return data;
    });
    return temp;
  };

  const addOrRemoveSelected = (id) => {
    const result = sizes.find((s) => s.id == id);
    if (result.is_selected) {
      const temp = sizes;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = false;
      setSizes([...temp]);
    } else {
      const temp = sizes;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = true;
      setSizes([...temp]);
    }
  };

  const addOrRemoveColorSelected = (id) => {
    const result = colors.find((c) => c.id == id);
    if (result.is_selected) {
      const temp = colors;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = false;
      setColors([...temp]);
    } else {
      const temp = colors;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = true;
      setColors([...temp]);
    }
  };

  const shouldCheckedOnStyle = (id) => {
    const result = sizes.find((s) => s.id == id && s.is_selected);
    return result ? styles.selectedItem : styles.notSelectedItem;
  };

  const shouldColorCheckedOnStyle = (id) => {
    const result = colors.find((c) => c.id == id && c.is_selected);
    return result ? styles.selectedItem : styles.notSelectedItem;
  };

  const formatDataSizeToSend = (dataSize) => {
    const selectedSizes = [];
    dataSize.forEach((s) => {
      if (s.is_selected) {
        selectedSizes.push(s.id);
      }
    });
    return selectedSizes;
  };

  const formatDataColorToSend = (dataColor) => {
    const selectedColors = [];
    dataColor.forEach((c) => {
      if (c.is_selected) {
        selectedColors.push(c.id);
      }
    });
    return selectedColors;
  };

  useEffect(() => {
    getProductsSellerById(itemId);
    getCategory();
    getCondition();
    getStatus();
    getColors();
    getSizes();
    // handleSizes();
    // handleColors();
  }, []);

  const handleSizes = (dataSize) => {
    const selectedSizes = [];
    dataSize.forEach((c) => {
      if (c.is_selected === true) {
        selectedSizes.push(c.size_id);
      }
    });
    return selectedSizes;
  };

  const handleColors = (dataColor) => {
    const selectedColors = [];
    dataColor.forEach((c) => {
      if (c.is_selected === true) {
        selectedColors.push(c.color_id);
      }
    });
    return selectedColors;
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        setFilePath(images);
      })
      .catch((err) => {
        console.log('ERRRRROR', err);
      });
  };

  const pickCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.5,
      mediaType: 'photo',
    })
      .then((images) => {
        setFileCamera(images);
      })
      .catch((err) => {
        console.log('errrrorrr', err);
      });
  };

  const handleUpdatePhoto = async () => {
    const data = new FormData();
    if (Object.keys(fileCamera).length > 0) {
      data.append('image', {
        name: fileCamera.path.split('/').pop(),
        type: fileCamera.mime,
        uri:
          Platform.OS === 'android'
            ? fileCamera.path
            : fileCamera.path.replace('file://', ''),
      });
    }

    if (filePath[0]) {
      for (let i = 0; i < filePath.length; i++) {
        data.append('image', {
          name: filePath[i].path.split('/').pop(),
          type: filePath[i].mime,
          uri:
            Platform.OS === 'android'
              ? filePath[i].path
              : filePath[i].path.replace('file://', ''),
        });
      }
    }
    await axios
      .put(API_URL + '/products/photo/' + itemId, data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        navigation.navigate('ProductSeller');
      })
      .catch((err) => {
        console.log('error disokin');
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    const data = new URLSearchParams();
    data.append('product_name', product.product_name);
    // data.append('sizes', JSON.stringify(formatDataSizeToSend(sizes)));
    if (formatDataSizeToSend(sizes).length > 0) {
      formatDataSizeToSend(sizes).map((element) => {
        data.append('sizes', element);
      });
    } else {
      handleSizes(productSizes).map((element) => {
        data.append('sizes', element);
      });
    }
    // data.append('colors', JSON.stringify(formatDataColorToSend(colors)));
    if (formatDataColorToSend(colors).length > 0) {
      formatDataColorToSend(colors).map((element) => {
        data.append('colors', element);
      });
    } else {
      handleColors(productColors).map((element) => {
        data.append('colors', element);
      });
    }

    data.append('category_id', ctg);
    data.append('condition_id', cnd);
    data.append('product_price', product.product_price);
    data.append('product_qty', product.product_qty);
    data.append('product_desc', product.product_desc);
    data.append('status_product_id', sts);

    console.log(data);

    await axios
      .put(API_URL + '/products/' + itemId, data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'yeah, success update product',
          visibilityTime: 4000,
          autoHide: true,
        });
        navigation.navigate('ProductSeller');
      })
      .catch((err) => {
        console.log('error disokin');
        console.log(err);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <ScrollView vertical={true}>
        <View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {filePath.length === 0
              ? productPhoto.map((photo) => {
                  return (
                    <Image
                      key={productPhoto.indexOf(photo)}
                      source={{
                        uri: productPhoto.length !== 0 ? API_URL + photo : ' ',
                      }}
                      style={styles.imgStyle}
                    />
                  );
                })
              : filePath.map((item) => {
                  return (
                    <Image
                      key={filePath.indexOf(item)}
                      source={{
                        uri: filePath.length !== 0 ? item.path : ' ',
                      }}
                      style={styles.imgStyle}
                    />
                  );
                })}
            <Image source={{uri: fileCamera.path}} style={styles.imgStyle} />
          </View>
        </View>
      </ScrollView>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            photoSheetRef.current?.setModalVisible();
          }}
          style={styles.button}>
          <Text style={styles.text}>Choose Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <FormInput
          value={product.product_name + ''}
          label="Name"
          //   secureTextEntry="true"
          onChangeText={(e) => setProduct({...product, product_name: e})}
          passiveBorderColor="white"
          activeBorderColor="black"
          //   activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View>
        <Text
          children="Current Color"
          size="l"
          style={{fontWeight: '700', marginLeft: 5}}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {productColors.map((data) => {
            return (
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: data.color_hexa,
                  margin: 5,
                  borderRadius: 25,
                }}
                key={data.id}></View>
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            elevation: 8,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 5,
            width: 100,
            margin: 5,
          }}
          onPress={() => {
            colorSheetRef.current?.setModalVisible();
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: 'bold',
              alignSelf: 'center',
              textTransform: 'uppercase',
            }}>
            Color
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text
          children="Current Size"
          size="l"
          style={{fontWeight: '700', marginLeft: 5}}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {productSizes.map((data) => {
            return (
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                  borderRadius: 75,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  margin: 5,
                  borderColor: 'red',
                }}
                key={data.id}>
                <Text
                  children={data.size}
                  style={{
                    marginHorizontal: 4,
                    fontSize: 10,
                    color: 'black',
                  }}
                />
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            elevation: 8,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 5,
            width: 100,
            margin: 5,
          }}
          onPress={() => {
            sizeSheetRef.current?.setModalVisible();
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: 'bold',
              alignSelf: 'center',
              textTransform: 'uppercase',
            }}>
            Size
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.picker}>
        <Text style={styles.label}>Category</Text>
        <View style={{margin: 10, elevation: 1, borderWidth: 1}}>
          <Picker
            style={{width: '100%'}}
            mode="dropdown"
            selectedValue={ctg}
            onValueChange={(itemValue) => {
              setCtg(itemValue);
            }}>
            {categories.map((data, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={data.category_name}
                  value={data.id_categories}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={styles.picker}>
        <Text style={styles.label}>Condition</Text>
        <View style={{margin: 10, elevation: 1, borderWidth: 1}}>
          <Picker
            style={{width: '100%'}}
            mode="dialog"
            selectedValue={cnd}
            onValueChange={(itemValue) => {
              setCnd(itemValue);
            }}>
            {conditions.map((data, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={data.conditions}
                  value={data.id}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={styles.input}>
        <FormInput
          value={product.product_price + ''}
          onChangeText={(e) => setProduct({...product, product_price: e})}
          label="Price"
          passiveBorderColor="white"
          activeBorderColor="black"
          //   activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View style={styles.input}>
        <FormInput
          value={product.product_qty + ''}
          onChangeText={(e) => setProduct({...product, product_qty: e})}
          label="Quantity"
          passiveBorderColor="white"
          activeBorderColor="black"
          //   activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View style={styles.input}>
        <FormInput
          value={product.product_desc + ''}
          onChangeText={(e) => setProduct({...product, product_desc: e})}
          label="Description"
          passiveBorderColor="white"
          activeBorderColor="black"
          //   activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View style={styles.picker}>
        <Text style={styles.label}>Status product</Text>
        <View style={{margin: 10, elevation: 1, borderWidth: 1}}>
          <Picker
            style={{width: '100%'}}
            mode="dialog"
            selectedValue={sts}
            onValueChange={(itemValue) => {
              setSts(itemValue);
            }}>
            {status.map((data, index) => {
              return (
                <Picker.Item key={index} label={data.name} value={data.id} />
              );
            })}
          </Picker>
        </View>
      </View>

      <ActionSheet gestureEnabled ref={colorSheetRef}>
        <ScrollView>
          <View style={{justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
                COLOR
              </Text>
              {colors.map(({id, color_name}) => {
                return (
                  <View
                    key={id.toString()}
                    style={shouldColorCheckedOnStyle(id)}>
                    <TouchableOpacity
                      onPress={() => addOrRemoveColorSelected(id)}>
                      <View key={id} label={color_name} value={id}>
                        <Text>{color_name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </ActionSheet>

      <ActionSheet gestureEnabled ref={sizeSheetRef}>
        <ScrollView>
          <View style={{justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
                SIZES
              </Text>
              {sizes.map(({id, size}) => {
                return (
                  <View key={id.toString()} style={shouldCheckedOnStyle(id)}>
                    <TouchableOpacity onPress={() => addOrRemoveSelected(id)}>
                      <View key={id} label={size} value={id}>
                        <Text>{size}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </ActionSheet>

      <ActionSheet gestureEnabled ref={photoSheetRef}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
            Select Photo With
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                justifyContent: 'center',
                width: '40%',
                height: 100,
                padding: 5,
              }}>
              <TouchableOpacity onPress={pickCamera}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Iconn name="camera-outline" size={40} color="gray" />
                  <Text style={{fontSize: 20, color: 'black'}}>Camera</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                width: '40%',
                height: 100,
                padding: 5,
              }}>
              <TouchableOpacity onPress={pickMultiple}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Iconn name="md-image-outline" size={40} color="gray" />
                  <Text style={{fontSize: 20, color: 'black'}}>Galerry</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>

      <ButtonSubmit
        title="SAVE PRODUCT"
        bg="red"
        rippleColor="white"
        onPress={() => {
          handleUpdate();
          handleUpdatePhoto();
        }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  selectedItem: {
    padding: 4,
    margin: 4,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 2,
  },
  notSelectedItem: {
    margin: 4,
    padding: 4,
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 15,
  },
  button: {
    backgroundColor: 'red',
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 15,
  },
  imgStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  picker: {
    backgroundColor: 'white',
    marginVertical: 15,
  },
  label: {
    paddingLeft: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default EditProduct;