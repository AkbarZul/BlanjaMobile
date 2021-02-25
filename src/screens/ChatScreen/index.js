import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API_URL} from '@env';
import axios from 'axios';

//context
import {useSocket} from '../../utils/Context/index';

//redux
import {useSelector} from 'react-redux';
//const socket = socketIO(`${API_URL}`);

let number = 0;

// const API_URL = 'http://192.168.18.29:8007'

const ChatScreen = ({route}) => {
  const socket = useSocket();
  const [sellerId, setSellerId] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  // const [chatMessages, setChatMessages] = useState([]);
  //sender id
  const user_id = useSelector((state) => state.authReducer.user_id);
  const user_name = useSelector((state) => state.authReducer.fullname);

  const token = useSelector((state) => state.authReducer.token);
  const room_id = route.params.room_id;
  const splitRoom = room_id.split('S')[1].split('B');
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const seller = splitRoom[0];
  const buyyer = splitRoom[1];

  console.log('ROOM ', room_id);
  useEffect(() => {
    socket.on('refresh', (someEvent) => {
      console.log('refresh ke ' + number);
      getNewMessage();
    });
    return () => socket.off('refresh');
  }, [number]);

  useEffect(() => {
    getNewMessage();
    console.log('did mount');
  }, []);

  const sendMessage = () => {
    if (message != '') {
      const Msg = {
        seller: seller,
        buyyer: buyyer,
        chatroom: room_id,
        sender: user_id,
        message: message,
      };
      console.log(Msg);
      axios
        .post(`${API_URL}/chat/addMessage`, Msg, {
          headers: {
            'x-access-token': 'Bearer ' + token,
          },
        })
        .then(({data}) => {
          ToastAndroid.show(
            'Message Sent',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setMessage('');
          console.log('sent');
          number = number + 1;
          console.log('sentasda');
        })
        .catch(({response}) => {
          console.log(response.status);
          if (response.status == 401) {
            ToastAndroid.show(
              'SESI ANDA TELAH HABIS',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            if (setLoginfalse()) {
              navigation.replace('Profile');
            }
          }
        });
    } else {
      ToastAndroid.show(
        'Message cannot be empty',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const getNewMessage = () => {
    axios
      .get(API_URL + '/chat/newMessage/' + room_id)
      .then((res) => {
        console.log('ASU ', res.data.data);
        setChat(res.data.data);
      })
      .catch(({response}) => {
        console.log(response.data);
      });
  };

  const scrollRef = useRef();

  const handleClick = (number) => {
    scrollRef.current.ScrollTo({
      y: 100 * number,
      animated: true,
    });
  };

  // useEffect(() => {
  //   if (route.params && route.params.sellerId) {
  //     console.log('wkwk', route.params.sellerId);
  //     setSellerId(route.params.sellerId);
  //   }
  // }, []);

  // useEffect(() => {
  //   socket.on('chat message', (msg) => {
  //     setChatMessages((chatMessages) => [...chatMessages, msg]);
  //     if (user_id != msg.sender) {
  //       setSellerId(msg.sender);
  //     }
  //   });
  //   return () => {
  //     socket.off('chat message');
  //   };
  // }, []);

  // const submitChatMessage = () => {
  //   socket.emit(
  //     'chat message',
  //     {chatMessage, sender: user_id, senderName: user_name},
  //     sellerId,
  //   );
  //   setChatMessage('');
  // };
  // console.log('USER ID ', user_id);
  // console.log('SellerID', sellerId);
  // console.log('length ' + chatMessages.length);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <ScrollView ref={scrollRef}>
        <KeyboardAvoidingView>
          <View style={styles.wrapmsgSender}>
            {chat.length !== 0 &&
              chat.map(({message, sender_id, sender_name}, index) => {
                return (
                  <View
                    key={index}
                    style={
                      user_id == sender_id
                        ? styles.msgSender
                        : styles.msgRecipient
                    }>
                    <Text
                      style={
                        user_id == sender_id
                          ? styles.textMsgSender
                          : styles.textMsgRecipient
                      }>
                      {message}
                    </Text>
                    <Text style={styles.textNameSender}>
                      {sender_id == user_id ? 'You' : sender_name}
                    </Text>
                  </View>
                );
              })}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.wrapTextInput}>
          <View style={{width: '70%'}}>
            <TextInput
              multiline={true}
              style={styles.form}
              placeholder="Message"
              value={message}
              onSubmitEditing={() => sendMessage()}
              onChangeText={(text) => {
                setMessage(text);
              }}
            />
          </View>
          <View style={{width: '20%'}}>
            <TouchableOpacity style={styles.btn} onPress={sendMessage}>
              <Text style={{color: '#fff'}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapTextInput: {
    marginHorizontal: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: 'red',
    height: 60,
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  wrapmsgSender: {
    //width: windowWidth * 0.4,
    //alignSelf: 'flex-end',
    //justifyContent: 'flex-end',
    marginHorizontal: windowWidth * 0.03,
    marginVertical: 10,
  },
  msgSender: {
    marginTop: 5,
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 3,
    width: windowWidth * 0.5,
    alignSelf: 'flex-end',
  },
  textMsgSender: {
    color: '#fff',
    fontSize: 18,
  },
  textNameSender: {
    color: 'lightgrey',
    fontSize: 12,
  },
  msgRecipient: {
    marginTop: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 3,
    width: windowWidth * 0.5,
    alignSelf: 'flex-start',
  },
  textMsgRecipient: {
    color: 'black',
    fontSize: 18,
  },
  textNameRecipient: {
    color: 'lightgrey',
    fontSize: 12,
  },
});