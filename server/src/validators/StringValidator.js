const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]*$/.test(str);
};

const isAlphabetic = (str) => {
  return /^[a-zA-Z]*$/.test(str);
};

const minLength = (str, length) => {
  return str.length >= length;
};

const maxLength = (str, length) => {
  return str.length <= length;
};

const notEmpty = (str) => {
  return str.length > 0;
};

const isEmail = (str) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

const isURL = (str) => {
  return /^(http|https):\/\/[^ "]+$/.test(str);
};

const passwordComplexity = (str) => {
  let complexity = 0;
  if (str.length >= 8) complexity++;
  // if contain at least one lowercase letter
  if (/[a-z]/.test(str)) complexity++;
  // if contain at least one uppercase letter
  if (/[A-Z]/.test(str)) complexity++;
  // if contain at least one digit
  if (/[0-9]/.test(str)) complexity++;
  // if contain at least one special character
  if (/[^a-zA-Z0-9]/.test(str)) complexity++;
  return complexity;
};

module.exports = {
  isAlphanumeric,
  isAlphabetic,
  minLength,
  maxLength,
  notEmpty,
  isEmail,
  isURL,
  passwordComplexity,
};
