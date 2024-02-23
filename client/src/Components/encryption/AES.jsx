import CryptoJS from "crypto-js";

export const encryptMessage = (message) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(message),
    "secureChat"
  ).toString();

  return ciphertext;
};

export const decryptMessage = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, "secureChat");
  const decryptedMessage = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptMessage;
};
