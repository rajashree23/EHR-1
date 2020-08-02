var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");


export function encryptFile(file, aeskey) {
    var ciphertext = CryptoJS.AES.encrypt(file, aeskey);
    return ciphertext;

}

export function encryptKey(pubkey, aeskey) {
    var cipherkey = CryptoJS.AES.encrypt(aeskey, pubkey);
    return cipherkey.toString();
}



export function decryptKey(aeskey, privatekey) {
    var bytes = CryptoJS.AES.decrypt(aeskey, privatekey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
    console.log(plaintext);

}
// function wordArrayToByteArray(word, length) {
//     var ba = [],i,xFF = 0xFF;
//     if (length > 0)
//      ba.push(word >>> 24);
//     if (length > 1)
//      ba.push((word >>> 16) & xFF);
//     if (length > 2)
//      ba.push((word >>> 8) & xFF);
//     if (length > 3)
//      ba.push(word & xFF);
//     return ba;
//    }

export function decryptFile(file, key) {
    var bytes = CryptoJS.AES.decrypt(file, key);
    console.log("bytes",bytes);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log('content',plaintext);
    // const wordArray = CryptoJS.enc.Hex.parse(plaintext);
    // const BaText = wordArrayToByteArray(wordArray, wordArray.length);
    return (plaintext);


}
export function uintToString(uintArray) {
    var decodedStr = new TextDecoder("utf-8").decode(uintArray);
    return decodedStr;
  }
//   export function toString(words){
//       console.log("hello",CryptoJS.enc.Utf8.stringify(words));
//     return CryptoJS.enc.Utf8.stringify(words);
//    }