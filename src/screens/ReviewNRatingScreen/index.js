import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import Star from '../../assets/images/Starfull.png';
import {Rating, AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
// import {API_URL} from '@env';

const RatingAndReview = ({route}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const {itemId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [data, setData] = useState({});
  const [ratingDetail, setRatingDetail] = useState([]);
  const [review, setReview] = useState([]);

  const getData = (itemId) => {
    axios
      .get(`${API_URL}/review/${itemId}`)
      .then((res) => {
        const data = res.data.data;
        console.log('DATA Reviews ', res.data.data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(itemId);
  }, [itemId]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data === undefined ? (
          <Text style={{fontSize: 44, fontWeight: 'bold'}}>
            Belum ada rating serta review
          </Text>
        ) : (
          <View style={styles.container}>
            {/* <Text style={{marginTop: 40, fontSize: 30, fontWeight: 'bold'}}>
                    Rating&Reviews
                  </Text> */}
            <View style={styles.containerRating}>
              <View style={styles.ratingNum}>
                <Text style={{fontSize: 44, fontWeight: 'bold'}}>
                  {data.rating !== undefined && data.rating}
                </Text>
                <Text>
                  {data.total_user_rating !== undefined &&
                    `${data.total_user_rating} Rating`}
                </Text>
              </View>
              <View style={styles.ratingDtl}>
                {data.rating_detail !== undefined &&
                  data.rating_detail.map(({rating, total_user}) => {
                    return (
                      <View style={styles.rating}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: 184,
                            alignItems: 'center',
                          }}>
                          <View style={styles.containerStar}>
                            <AirbnbRating
                              count={rating}
                              defaultRating={5}
                              size={12}
                              showRating={false}
                            />
                          </View>
                          <View style={{width: 114}}>
                            <View
                              style={{
                                height: 8,
                                width: 114,
                                justifyContent: 'flex-start',
                                backgroundColor: '#DB3022',
                                borderRadius: 4,
                              }}></View>
                          </View>
                        </View>
                        <View style={{marginLeft: 23}}>
                          <Text>{total_user}</Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>

            <View style={{marginTop: 37}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '800',
                }}>
                {data.review !== undefined && `${data.review.length} Reviews`}
              </Text>
            </View>

            {data.review !== undefined &&
              data.review.map(({id, full_name, review}) => {
                return (
                  <ScrollView style={{width: '100%'}}>
                    <View style={{marginTop: 40}}>
                      <View style={styles.cardComent}>
                        <View>
                          <Image
                            source={require('../../assets/images/myprofile.png')}
                            style={styles.imgComent}
                          />
                        </View>
                        <View style={styles.cardContainer}>
                          <Text>{full_name}</Text>

                          <Text>{review}</Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                );
              })}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  containerRating: {
    height: 95,
    width: 330,
    marginTop: 41,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingNum: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingDtl: {
    width: 236,
    height: '100%',
    justifyContent: 'center',
  },
  rating: {
    flexDirection: 'row',
  },
  containerStar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 60,
  },
  cardComent: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imgComent: {
    height: 52,
    width: 52,
    borderRadius: 26,
    top: -20,
    left: 30,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 40,
    justifyContent: 'center',
    height: '100%',
  },
  addcart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    top: undefined,
  },
  btn: {
    backgroundColor: '#DB3022',
    width: 128,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
});

export default RatingAndReview;
