function encrypt(msg, key) {
  msg = standardize(msg); // removes unwanted characters from message
  key = standardize(key); // removes unwanted characters from key
  const abc = alphabet(); // initializes alphabet
  let newMsg = ""; // initializes empty string for encrypted message

  for (let i = 0; i < msg.length; i++) {
    key = keygen(msg, key); // calls keygen function that expands key
    let msgLetter = abc.indexOf(msg[i]); // grabs [i] letter of message
    let keyLetter = abc.indexOf(key[i]); // grabs [i] letter of key
    let newAbc1 = abc.slice(keyLetter); // builds first part of vigenere alphabet
    let newAbc2 = abc.slice(0, keyLetter); // builds second part of vigenere alphabet
    let newAbc = newAbc1.concat(newAbc2); // combines first and second part
    let newLetter = newAbc[msgLetter]; // finds encrypted letter in vigenere alphabet
    newMsg += newLetter; // adds encrypted or decrypted letters to ciphertext
  }
  newMsg = newMsg.match(/.{1,5}/g).join(" "); // arranges result in blocks of five letters
  return newMsg; // returns encrypted or decrypted message
}

function decrypt(msg, key) {
  msg = standardize(msg); // removes unwanted characters from ciphertext
  key = standardize(key); // removes unwanted characters from key
  const abc = alphabet(); // initializes alphabet
  let newMsg = ""; // initializes empty string for decrypted message

  for (let i = 0; i < msg.length; i++) {
    key = keygen(msg, key); // calls keygen function that expands key
    let keyLetter = abc.indexOf(key[i]); // grabs [i] letter of key
    let newAbc1 = abc.slice(keyLetter); // builds first part of vigenere alphabet
    let newAbc2 = abc.slice(0, keyLetter); // builds second part of vigenere alphabet
    let newAbc = newAbc1.concat(newAbc2); // combines first and second part

    let msgLetter = newAbc.indexOf(msg[i]); // grabs [i] letter of ciphertext
    let newLetter = abc[msgLetter]; // finds plaintext letter in alphabet
    newMsg += newLetter; // adds encrypted or decrypted letters to ciphertext
  }
  newMsg = newMsg.match(/.{1,5}/g).join(" "); // arranges result in blocks of five letters
  return newMsg; // returns encrypted or decrypted message
}

function keygen(msg, key) {
  let i = key.length; // main counter based on key length
  let j = 0; // another counter to grab letters of key
  while (i < msg.length) {
    // loops until key length equals message length
    key += key.slice(j, j + 1); // repeating letters of key until msg.length === key.length
    i++;
    j++;
  }
  return key; // returns key which is now as long as message
}

function standardize(str) {
  str = str.toUpperCase(); // converts string to uppercase
  str = str.replace(/[^A-Z]/g, ""); // removes unwanted characters
  return str;
}

function alphabet() {
  // prettier-ignore
  const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z"];
  return abc;
}

// main encryption function
function vigenereEncrypt() {
  let msg = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let output = encrypt(msg, key);
  document.getElementById("output").innerHTML = output;
}

// main decryption function
function vigenereDecrypt() {
  let msg = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let output = decrypt(msg, key);
  document.getElementById("output").innerHTML = output;
}
