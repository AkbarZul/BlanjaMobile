// // import React, {Component, useEffect, useState} from 'react';
// // import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// // import Text from '../../../components/Text';
// import {ButtonSubmit} from '../../../components/index';
// // import {Picker} from '@react-native-picker/picker';
// import FormInput from 'react-native-outline-input';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';
// import {API_URL} from '@env';
// // import ImagePicker from 'react-native-image-picker';
// // import ImagePicker from 'react-native-image-crop-picker';
// // import { Picker } from 'react-native-picker/picker';

// const AddProduct = ({navigation}) => {
//   useEffect(() => {
//     getCategory();
//     getSize();
//     getColor();
//     getCondition();
//     getStatus();
//   }, []);

//   const BASE_URL = `${API_URL}`;
//   //   const [image, setImage] = useState(null);
//   // const [images, setImages] = useState(null);
//   const [filePath, setFilePath] = useState([]);
//   const [fileCamera, setFileCamera] = useState({});
//   const [prodName, setProdName] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [size, setSize] = useState([]);
//   const [color, SetColor] = useState([]);
//   const [condition, setCondition] = useState([]);
//   const [prodPrice, setProdPrice] = useState('');
//   const [prodQty, setProdQty] = useState('');
//   const [prodDesc, setProdDesc] = useState('');
//   const [status, setStatus] = useState([]);
//   const [ctg, setCtg] = useState(0);
//   const [sz, setSz] = useState(0);
//   const [clr, setClr] = useState(0);
//   const [cnd, setCnd] = useState(0);
//   const [sts, setSts] = useState(0);

//   const token = useSelector((state) => state.authReducer.token);

//   const getCategory = async () => {
//     await axios
//       .get(BASE_URL + '/categories')
//       .then((res) => {
//         const categories = res.data.data;
//         console.log('category', categories);
//         setCategories(categories);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getSize = async () => {
//     await axios
//       .get(BASE_URL + '/sizes')
//       .then((res) => {
//         const size = res.data.data;
//         console.log('size', size);
//         setSize(size);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getColor = async () => {
//     await axios
//       .get(BASE_URL + '/colors')
//       .then((res) => {
//         const color = res.data.data;
//         console.log('color', color);
//         SetColor(color);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getCondition = async () => {
//     await axios
//       .get(BASE_URL + '/condition')
//       .then((res) => {
//         const condition = res.data.data;
//         console.log('kondisi', condition);
//         setCondition(condition);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getStatus = async () => {
//     await axios
//       .get(BASE_URL + '/status')
//       .then((res) => {
//         const status = res.data.data;
//         console.log('status', status);
//         setStatus(status);
//       })
//       .catch((err) => {
//         console.log('error status', err);
//       });
//   };

//   const handleSubmit = async () => {
//     const data = new FormData();
//     data.append('product_name', prodName);
//     data.append('category_id', ctg);
//     data.append('size_id', sz);
//     data.append('color_id', clr);
//     data.append('condition_id', cnd);
//     data.append('product_price', prodPrice);
//     data.append('product_qty', prodQty);
//     data.append('product_desc', prodDesc);
//     // data.append('image', image);
//     fileCamera !== 0 &&
//       data.append('image', {
//         name: fileCamera.path.split('/').pop(),
//         type: fileCamera.mime,
//         uri:
//           Platform.OS === 'android'
//             ? fileCamera.path
//             : fileCamera.path.replace('file://', ''),
//       });
//     for (let i = 0; i < filePath.length; i++) {
//       data.append('image', {
//         name: filePath[i].path.split('/').pop(),
//         type: filePath[i].mime,
//         uri:
//           Platform.OS === 'android'
//             ? filePath[i].path
//             : filePath[i].path.replace('file://', ''),
//       });
//     }
//     data.append('status_product_id', sts);

//     await axios
//       .post(BASE_URL + '/products', data, {
//         headers: {
//           'x-access-token': 'Bearer ' + token,
//           'Content-type': 'multipart/form-data',
//         },
//       })
//       .then((res) => {
//         Alert.alert('Success', 'Product Berhasil Ditambahkan', [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('ProductSeller'),
//           },
//         ]);
//       })
//       .catch((err) => {
//         console.log('error disokin');
//         console.log(err);
//       });
//   };

//   const pickMultiple = () => {
//     ImagePicker.openPicker({
//       multiple: true,
//       mediaType: 'photo',
//     })
//       .then((images) => {
//         console.log('ini gambar', images);
//         setFilePath(images);
//       })
//       .catch((e) => alert(e));
//   };

//   const pickCamera = () => {
//     ImagePicker.openCamera({
//       compressImageMaxWidth: 300,
//       compressImageMaxHeight: 400,
//       compressImageQuality: 0.5,
//       mediaType: 'photo',
//     })
//       .then((images) => {
//         console.log('ini gambar', images);
//         setFileCamera(images);
//       })
//       .catch((e) => alert(e));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <ScrollView vertical={true}>
//         <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
//           {filePath.map((item) => {
//             return (
//               <Image
//                 key={filePath.indexOf(item)}
//                 source={{uri: filePath.length !== 0 ? item.path : ''}}
//                 style={styles.imgStyle}
//               />
//             );
//           })}
//           <Image source={{uri: fileCamera.path}} style={styles.imgStyle} />
//         </View>
//       </ScrollView>
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity onPress={pickCamera} style={styles.button}>
//           <Text style={styles.text}>Select Multiple</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.input}>
//         <FormInput
//           value={prodName}
//           onChangeText={(prodName) => setProdName(prodName)}
//           label="Name"
//           passiveBorderColor="white"
//           activeBorderColor="black"
//           activeLabelColor="black"
//           style={styles.form1}
//         />
//       </View>

//       <Picker
//         style={{width: '100%'}}
//         mode="dialog"
//         selectedValue={ctg}
//         onValueChange={(itemValue) => {
//           setCtg(itemValue);
//         }}>
//         <Picker.Item label="Category" />
//         {categories.length !== 0 &&
//           categories.map(({id_categories, category_name}) => {
//             return (
//               <Picker.Item
//                 key={id_categories}
//                 label={category_name}
//                 value={id_categories}
//               />
//             );
//           })}
//       </Picker>

//       <Picker
//         style={{width: '100%'}}
//         selectedValue={sz}
//         onValueChange={(itemValue) => {
//           setSz(itemValue);
//         }}>
//         <Picker.Item label="Size" />
//         {size.length !== 0 &&
//           size.map(({id, size}) => {
//             return <Picker.Item key={id} label={size} value={id} />;
//           })}
//       </Picker>

//       <Picker
//         style={{width: '100%'}}
//         selectedValue={clr}
//         onValueChange={(itemValue) => {
//           setClr(itemValue);
//         }}>
//         <Picker.Item label="Color" />
//         {color.length !== 0 &&
//           color.map(({id, color_name}) => {
//             return <Picker.Item key={id} label={color_name} value={id} />;
//           })}
//       </Picker>

//       <Picker
//         style={{width: '100%'}}
//         selectedValue={cnd}
//         onValueChange={(itemValue) => {
//           setCnd(itemValue);
//         }}>
//         <Picker.Item label="Condition" />
//         {condition.length !== 0 &&
//           condition.map(({id, conditions}) => {
//             return <Picker.Item key={id} label={conditions} value={id} />;
//           })}
//       </Picker>

//       <View style={styles.input}>
//         <FormInput
//           value={prodPrice}
//           onChangeText={(prodPrice) => setProdPrice(prodPrice)}
//           label="Price"
//           passiveBorderColor="white"
//           activeBorderColor="black"
//           activeLabelColor="black"
//           style={styles.form1}
//         />
//       </View>

//       <View style={styles.input}>
//         <FormInput
//           value={prodQty}
//           onChangeText={(prodQty) => setProdQty(prodQty)}
//           label="Quantity"
//           passiveBorderColor="white"
//           activeBorderColor="black"
//           activeLabelColor="black"
//           style={styles.form1}
//         />
//       </View>

//       <View style={styles.input}>
//         <FormInput
//           value={prodDesc}
//           onChangeText={(prodDesc) => setProdDesc(prodDesc)}
//           label="Description"
//           passiveBorderColor="white"
//           activeBorderColor="black"
//           activeLabelColor="black"
//           style={styles.form1}
//         />
//       </View>

//       <Picker
//         style={{width: '100%'}}
//         selectedValue={sts}
//         onValueChange={(itemValue) => {
//           setSts(itemValue);
//         }}>
//         <Picker.Item label="Status Barang" />
//         {status.length !== 0 &&
//           status.map(({id, name}) => {
//             return <Picker.Item key={id} label={name} value={id} />;
//           })}
//       </Picker>

//       <ButtonSubmit
//         title="ADD PRODUCT"
//         bg="red"
//         rippleColor="white"
//         onPress={handleSubmit}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // paddingHorizontal: 15,
//   },
//   button: {
//     backgroundColor: 'red',
//     marginBottom: 10,
//     height: 40,
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   input: {
//     paddingVertical: 15,
//   },
//   imgStyle: {
//     width: 100,
//     height: 100,
//     margin: 5,
//     borderColor: 'black',
//     borderRadius: 5,
//     borderWidth: 1,
//   },
// });

// export default AddProduct;

// import React, {Component, useEffect, useState} from 'react';
// import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
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
// import Text from '../../../components/Text';
import {ButtonSubmit} from '../../../components/index';
// import {Picker} from '@react-native-picker/picker';
import FormInput from 'react-native-outline-input';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import ActionSheet from 'react-native-actions-sheet';
import {API_URL} from '@env';
import {createRef} from 'react';
// import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import { Picker } from 'react-native-picker/picker';

// const categorySheetRef = createRef();
const sizeSheetRef = createRef();
const colorSheetRef = createRef();
// const conditionSheetRef = createRef();
// const statusSheetRef = createRef();

const AddProduct = ({navigation}) => {
  useEffect(() => {
    getCategory();
    getSize();
    getColor();
    getCondition();
    getStatus();
  }, []);

  const BASE_URL = `${API_URL}`;
  //   const [image, setImage] = useState(null);
  // const [images, setImages] = useState(null);
  const [filePath, setFilePath] = useState([]);
  const [fileCamera, setFileCamera] = useState({});
  const [prodName, setProdName] = useState();
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, SetColor] = useState([]);
  const [condition, setCondition] = useState([]);
  const [prodPrice, setProdPrice] = useState();
  const [prodQty, setProdQty] = useState();
  const [prodDesc, setProdDesc] = useState();
  const [status, setStatus] = useState([]);
  const [ctg, setCtg] = useState(0);
  const [sendSize, setSendSize] = useState();
  console.log('ini size', sendSize);
  const [sendColor, setSendColor] = useState();
  console.log('ini color', sendColor);

  const [cnd, setCnd] = useState(0);
  const [sts, setSts] = useState(0);

  const token = useSelector((state) => state.authReducer.token);

  const getCategory = async () => {
    await axios
      .get(BASE_URL + '/categories')
      .then((res) => {
        const categories = res.data.data;
        console.log('category', categories);
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = async () => {
    await axios
      .get(BASE_URL + '/sizes')
      .then((res) => {
        const size = res.data.data;
        console.log('size', size);
        setSize(size);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColor = async () => {
    await axios
      .get(BASE_URL + '/colors')
      .then((res) => {
        const color = res.data.data;
        console.log('color', color);
        SetColor(color);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCondition = async () => {
    await axios
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

  const getStatus = async () => {
    await axios
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

  const handleSelection = () => {
    let ukuran = size
      .filter((item) => item.id)
      .map((select) => {
        return {id_size: select};
      });

    setSendSize({ukuran});
    console.log('KNTL', ukuran);
  };
  const colorOpe = [...color];

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('product_name', prodName);
    data.append('category_id', ctg);
    data.append('size_id', sendSize);
    data.append('color_id', color);
    // data.append('size_id', sz2);
    // data.append('color_id', clr2);
    data.append('condition_id', cnd);
    data.append('product_price', prodPrice);
    data.append('product_qty', prodQty);
    data.append('product_desc', prodDesc);
    // data.append('image', image);
    fileCamera !== 0 &&
      data.append('image', {
        name: fileCamera.path.split('/').pop(),
        type: fileCamera.mime,
        uri:
          Platform.OS === 'android'
            ? fileCamera.path
            : fileCamera.path.replace('file://', ''),
      });
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
    data.append('status_product_id', sts);

    await axios
      .post(BASE_URL + '/products', data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
          'Content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        Alert.alert('Success', 'Product Berhasil Ditambahkan', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ProductSeller'),
          },
        ]);
        console.log('aku sayang kamu', data);
      })
      .catch((err) => {
        console.log('error disokin');

        console.log(err);
      });
  };

  // console.log('ini', operator);
  console.log('ini ope2', colorOpe);
  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log('ini gambar', images);
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
        console.log('ini gambar', images);
        setFileCamera(images);
      })
      .catch((e) => alert(e));
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
        <TouchableOpacity onPress={pickCamera} style={styles.button}>
          <Text style={styles.text}>Select Multiple</Text>
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
        onPress={() => {
          colorSheetRef.current?.setModalVisible();
        }}>
        <Text>color</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          sizeSheetRef.current?.setModalVisible();
        }}>
        <Text>size</Text>
      </TouchableOpacity>

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
                CATEGORY
              </Text>
              {color.map(({id, color_name}) => {
                return (
                  <TouchableOpacity onPress={() => setSendColor(id)}>
                    <View key={id} label={color_name} value={id}>
                      <Text>{color_name}</Text>
                    </View>
                  </TouchableOpacity>
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
                  <TouchableOpacity onPress={() => handleSelection(id)}>
                    <View key={id} label={size} value={id}>
                      <Text>{size}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
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
});

export default AddProduct;
