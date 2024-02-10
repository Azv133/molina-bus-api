const bcrypt = require('bcrypt');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
require('../server')

const saltRounds = 10;

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    status: true,
                    hash
                });
            }
        });
    });
};

const generateQrLink = async (email, secret) => {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(authenticator.keyuri(email, global.APP_NAME, secret), (err, url) => {
        if (err) {
          console.log('Error al generar el QR Link', err);
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };

const getSecret = () => authenticator.generateSecret();

const equalToken = (code, secret) =>{
    const token = authenticator.generate(secret);
    return code === token;
};

module.exports = { comparePassword, hashPassword, generateQrLink, getSecret, equalToken };
