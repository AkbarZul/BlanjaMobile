import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {API_URL} from '@env';
import axios from 'axios';

const ListChat = ({navigation}) => {
  const token = useSelector((state) => state.authReducer.token);
  const level = useSelector((state) => state.authReducer.level);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState('Loading...');

  const chatRoom = () => {
    if (level === 2) {
      axios
        .get(`${API_URL}/chat/chatRoomSeller`, {
          headers: {
            'x-access-token': 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log('Daftar Chat Room ', res.data.data);
          console.log('Daftar Chat Room ', res.data.data);
          setChatList(res.data.data);
          setLoading('');
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      axios
        .get(`${API_URL}/chat/chatRoomBuyyer`, {
          headers: {
            'x-access-token': 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log('Daftar Chat Room Buyyer', res.data.data);
          setChatList(res.data.data);
          setLoading('');
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  useEffect(() => {
    chatRoom();
  }, []);

  return (
    <View>
      {chatList === 0 ? (
        <Text>Belum ada Chat</Text>
      ) : (
        <>
          {chatList.map(({chatroom}, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignContent: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Chat', {
                      room_id: chatroom,
                    });
                  }}>
                  <View
                    style={{
                      height: 80,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      borderRadius: 7,
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        justifyContent: 'center',
                        fontSize: 24,
                        fontWeight: 'bold',
                      }}>
                      Kode Room Chat
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        justifyContent: 'center',
                        fontSize: 16,
                        color: 'gray'
                      }}>
                      {chatroom}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default ListChat;