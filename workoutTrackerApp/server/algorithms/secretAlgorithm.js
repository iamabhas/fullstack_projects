const id = 1234567890;
const email = "abhas@abhas.com";
const password = "Abhas1@";

function letterToNumber(letter) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const index = alphabet.indexOf(letter.toLowerCase());
  return index + 1;
}

const infoString = id.toString() + email + password;

const numbers = [];
for (let i = 0; i < infoString.length; i++) {
  const char = infoString[i];
  if (char.match(/[a-z]/i)) {
    numbers.push(letterToNumber(char));
  } else if (char.match(/\d/)) {
    numbers.push(parseInt(char));
  }
}

let sum = 0;
for (let i = numbers.length - 1; i >= 0; i--) {
  let num = numbers[i];
  if ((numbers.length - i) % 2 === 0) {
    num *= 2;
    if (num > 9) {
      num -= 9;
    }
  }
  sum += num;
}
const checkDigit = (10 - (sum % 10)) % 10;
const code = numbers.join("") + checkDigit;

function compressNumber(num) {
  const base = 62;
  let result = "";
  while (num > 0) {
    const digit = num % base;
    const char =
      digit < 10
        ? String(digit)
        : digit < 36
        ? String.fromCharCode(digit + 55)
        : String.fromCharCode(digit + 61);
    result = char + result;
    num = Math.floor(num / base);
  }
  return result;
}

const mySecret = compressNumber(code);

module.exports = mySecret;
