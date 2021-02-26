import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ButtonSubmit} from '../../../components/index';
import FormInput from 'react-native-outline-input';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Picker} from 'native-base';
import ActionSheet from 'react-native-actions-sheet';
import {API_URL} from '@env';
import {createRef} from 'react';
import Iconn from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const sizeSheetRef = createRef();
const colorSheetRef = createRef();
const photoSheetRef = createRef();

const AddProduct = ({navigation}) => {
  useEffect(() => {
    getCategory();
    getSize();
    getColor();
    getCondition();
    getStatus();
  }, []);

  const BASE_URL = `${API_URL}`;

  const shouldCheckedOnStyle = (id) => {
    const result = size.find((s) => s.id == id && s.is_selected);
    return result ? styles.selectedItem : styles.notSelectedItem;
  };

  const shouldColorCheckedOnStyle = (id) => {
    const result = color.find((c) => c.id == id && c.is_selected);
    return result ? styles.selectedItem : styles.notSelectedItem;
  };

  const addOrRemoveSelected = (id) => {
    const result = size.find((s) => s.id == id);
    if (result.is_selected) {
      const temp = size;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = false;
      setSize([...temp]);
    } else {
      const temp = size;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = true;
      setSize([...temp]);
    }
  };

  const addOrRemoveColorSelected = (id) => {
    const result = color.find((c) => c.id == id);
    if (result.is_selected) {
      const temp = color;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = false;
      SetColor([...temp]);
    } else {
      const temp = color;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]['is_selected'] = true;
      SetColor([...temp]);
    }
  };

  //   const [image, setImage] = useState(null);
  // const [images, setImages] = useState(null);

  const restructureIsSelected = (data) => {
    const temp = data.map((data) => {
      data['is_selected'] = false;
      return data;
    });
    return temp;
  };

  const [product, setProduct] = useState({
    product_name: '',
  });
  const [filePath, setFilePath] = useState([]);
  const [fileCamera, setFileCamera] = useState({});
  const [prodName, setProdName] = useState('');
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, SetColor] = useState([]);
  const [condition, setCondition] = useState([]);
  const [prodPrice, setProdPrice] = useState('');
  const [prodQty, setProdQty] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [status, setStatus] = useState([]);
  const [ctg, setCtg] = useState(0);
  const [cnd, setCnd] = useState(0);
  const [sts, setSts] = useState(0);

  // console.log('Size Selected ',size);
  const token = useSelector((state) => state.authReducer.token);

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

  const getCategory = () => {
    axios
      .get(BASE_URL + '/categories')
      .then((res) => {
        const categories = res.data.data;
        // console.log('category', categories);
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = () => {
    axios
      .get(BASE_URL + '/sizes')
      .then((res) => {
        // const size = res.data.data.filter((item) => {
        //   item.is_selected === true
        // }).map((item) => {return item})
        const size = res.data.data;
        setSize(restructureIsSelected(size));
        // console.log("SIZE ",size);
      })
      .catch((err) => {
        //karena pasti masuk sini
        //soale ora ngerun backend
        //nko dihapus bae,
        //seharuse di dalam then
        // setSize(restructureIsSelected(response_size_json.data))
        console.log(err);
      });
  };

  const getColor = () => {
    axios
      .get(BASE_URL + '/colors')
      .then((res) => {
        const color = res.data.data;
        SetColor(restructureIsSelected(color));
        console.log('color', color);
      })
      .catch((err) => {
        //kie nko dihapus bae, soale laka backend e
        // SetColor(restructureIsSelected(response_color_json.data));
        console.log(err);
      });
  };

  const getCondition = () => {
    axios
      .get(BASE_URL + '/condition')
      .then((res) => {
        const condition = res.data.data;
        console.log('kondisi', condition);
        setCondition(condition);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatus = () => {
    axios
      .get(BASE_URL + '/status')
      .then((res) => {
        const status = res.data.data;
        console.log('status', status);
        setStatus(status);
      })
      .catch((err) => {
        console.log('error status', err);
      });
  };

  const colorOpe = [...color];

  // const handleSubmit = () => {
  // const formData = new FormData()
  // formData.append('sizes', formatDataSizeToSend(size))
  // formData.append('colors', formatDataColorToSend(color))

  // }

  const handleSubmit = async () => {
    // setProduct(...product,{
    //   product_name : prodName
    // });
    // console.log(product);
    const data = new FormData();
    data.append('product_name', prodName);
    console.log('NAME ', prodName);
    data.append('category_id', ctg);
    console.log('CATEGORY ', ctg);
    formatDataSizeToSend(size).map((element) => {
      data.append('sizes[]', JSON.stringify(element));
    });
    formatDataColorToSend(color).map((element) => {
      data.append('colors[]', JSON.stringify(element));
    });
    data.append('condition_id', cnd);
    data.append('product_price', prodPrice);
    data.append('product_qty', prodQty);
    data.append('product_desc', prodDesc);
    // data.append('image', image);
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
    data.append('status_product_id', sts);
    console.log(data);
    await axios
      .post(BASE_URL + '/products', data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Yeah, Success add product',
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

  // console.log(handleSubmit());

  // console.log('ini', operator);
  // console.log('ini ope2', colorOpe);
  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log('ini gambar galeri', images);
        setFilePath(images);
      })
      .catch((e) => alert(e));
  };

  const pickCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.5,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log('ini gambar camera', images);
        setFileCamera(images);
      })
      .catch((err) => {
        console.log('ERRROR', err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView vertical={true}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {filePath.map((item) => {
            return (
              <Image
                key={filePath.indexOf(item)}
                source={{uri: filePath.length !== 0 ? item.path : ''}}
                style={styles.imgStyle}
              />
            );
          })}
          <Image source={{uri: fileCamera.path}} style={styles.imgStyle} />
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            photoSheetRef.current?.setModalVisible();
          }}
          style={styles.button}>
          <Text style={styles.text}>Select Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <FormInput
          value={prodName}
          onChangeText={(prodName) => setProdName(prodName)}
          label="Name"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
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

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {color.map((c) => {
          return c.is_selected ? (
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: c.color_hexa,
                margin: 5,
                borderRadius: 25,
              }}
              key={c.id}></View>
          ) : null;
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

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {size.map((s) => {
          return s.is_selected ? (
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
              key={s.id}>
              <Text key={s.id.toString()}>{s.size}</Text>
            </View>
          ) : null;
        })}
      </View>

      <Picker
        style={{width: '100%'}}
        mode="dialog"
        selectedValue={ctg}
        onValueChange={(itemValue) => {
          setCtg(itemValue);
        }}>
        <Picker.Item label="Category" />
        {categories.length !== 0 &&
          categories.map(({id_categories, category_name}) => {
            return (
              <Picker.Item
                key={id_categories}
                label={category_name}
                value={id_categories}
              />
            );
          })}
      </Picker>

      <Picker
        style={{width: '100%'}}
        selectedValue={cnd}
        onValueChange={(itemValue) => {
          setCnd(itemValue);
        }}>
        <Picker.Item label="Condition" />
        {condition.length !== 0 &&
          condition.map(({id, conditions}) => {
            return <Picker.Item key={id} label={conditions} value={id} />;
          })}
      </Picker>

      <View style={styles.input}>
        <FormInput
          value={prodPrice}
          onChangeText={(prodPrice) => setProdPrice(prodPrice)}
          label="Price"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View style={styles.input}>
        <FormInput
          value={prodQty}
          onChangeText={(prodQty) => setProdQty(prodQty)}
          label="Quantity"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <View style={styles.input}>
        <FormInput
          value={prodDesc}
          onChangeText={(prodDesc) => setProdDesc(prodDesc)}
          label="Description"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <Picker
        style={{width: '100%'}}
        selectedValue={sts}
        onValueChange={(itemValue) => {
          setSts(itemValue);
        }}>
        <Picker.Item label="Status Barang" />
        {status.length !== 0 &&
          status.map(({id, name}) => {
            return <Picker.Item key={id} label={name} value={id} />;
          })}
      </Picker>

      <ActionSheet gestureEnabled ref={colorSheetRef}>
        <ScrollView>
          <View style={{justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
                COLOR
              </Text>
              {color.map(({id, color_name}) => {
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
              {size.map(({id, size}) => {
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
        title="ADD PRODUCT"
        bg="red"
        rippleColor="white"
        onPress={handleSubmit}
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
    backgroundColor: 'gray',
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
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
});

export default AddProduct;