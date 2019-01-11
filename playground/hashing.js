const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'abc1`23';

// bcrypt.genSalt(10, (err, saltValue) => {
//   bcrypt.hash(password, saltValue, (err, hashValue) => {
//     console.log(hashValue);
//   });
// });

let hashedPassword =
  '$2a$10$NHNY9aR5rNImzRPoVb/0Eea9Iis4xhqfN.gfUTpSiBfJPhNoT7W2a';

bcrypt.compare(password, hashedPassword, (err, res) => console.log(res));
// let data = {
//   id: 5
// };
// let token = jwt.sign(data, 'secretsauce');
// console.log(token);

// let decoded = jwt.verify(token, 'secretsauce');
// console.log(`Decoded: \n`, decoded);
// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'saltsecret').toString()
// };

// let resultHash = SHA256(JSON.stringify(token.data) + 'saltsecret').toString();

// if (resultHash === token.hash) {
//   console.info('Data has not been changed.');
// } else {
//   console.error('Data has been changed.');
// }
