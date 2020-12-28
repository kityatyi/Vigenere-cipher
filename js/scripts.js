document.getElementById("encrypt").onclick = vigenere();

//

function vigenere() {
  // grabs textarea and passwords values
  //
  let msg = document.getElementById("plaintext").value;
  let key = document.getElementById("key").value;
  //
  let encrypted = encryptor(msg, key);
  document.getElementById("ciphertext").value = encrypted;
}

//

function encryptor(msg, key) {
  // https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
  //
  msg = standardize(msg); // removes unwanted characters from message
  key = standardize(key); // removes unwanted characters from key
  //
  let cipherMsg = ""; // initializes empty string for encrypted message
  // prettier-ignore
  const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z"];
  //
  for (let i = 0; i < msg.length; i++) {
    //
    key = keygen(msg, key); // calls keygen function that expands key
    //
    let msgLetter = abc.indexOf(msg[i]); // grabs [i] letter of message
    let keyLetter = abc.indexOf(key[i]); // grabs [i] letter of key
    //
    let newAbc1 = abc.slice(keyLetter); // builds first part of vigenere alphabet
    let newAbc2 = abc.slice(0, keyLetter); // builds second part of vigenere alphabet
    let newAbc = newAbc1.concat(newAbc2); // combines first and second part
    //
    let newLetter = newAbc[msgLetter]; // finds encrypted letter in vigenere alphabet
    //
    cipherMsg += newLetter; // adds encrypted letters to ciphertext
  }
  //
  cipherMsg = cipherMsg.match(/.{1,5}/g).join(" "); // arranges result in blocks of five letters
  //
  return cipherMsg; // returns encrypted message
}

//

function keygen(msg, key) {
  //
  let i = key.length; // main counter based on key length
  let j = 0; // another counter to grab letters of key
  while (i < msg.length) {
    // loops until key length equals message length
    key += key.slice(j, j + 1); // repeating letters of key until msg.length === key.length
    i++;
    j++;
  }
  //
  return key; // returns key which is now as long as message
}

//

function standardize(str) {
  // removes spaces and non A-Z characters
  //
  str = str.toUpperCase();
  str = str.replace(/[^A-Z]/g, "");
  //
  return str;
}
//
