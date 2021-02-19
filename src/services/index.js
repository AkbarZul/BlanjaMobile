import axios from 'axios';

const BASE_URL = 'http://192.168.1.10:2005'

export const APILogin = ({username, password}) => {
  const req = {username: username, password: password};
  return axios
    .post(BASE_URL + '/auth/login', req)
    .then((res) => res.data);
};

// export const APIRegister = ({
//   name,
//   email,
//   password,
// }) => {
//   const req = {
//     name: name,
//     email: email,
//     password: password,
//     district: district,
//     village: village,
//   };
//   return axios
//     .post(BASE_URL + '/api/v1/farmer/register', req)
//     .then((res) => res.data);
// };