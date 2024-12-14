export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.trim()) {
    return 'Email is required';
  }

  if (!pattern.test(email)) {
    return 'Invalid email address';
  }

  return '';
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'Password is required';
  }

  if (password.length < 9) {
    return 'Password must be at least 9 characters long';
  }

  return '';
};

export const validateRequired = (value, name) => {
  if (!value || !value.trim()) {
    return `${name} is required`
  }
  return ''
}

export const validateCompareValues = (value1, value2, name) => {
  if (value1 !== value2) {
    return `${name} has difference`
  }
  return ''
}
