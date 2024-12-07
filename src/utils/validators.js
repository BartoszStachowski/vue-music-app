export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.trim()) {
    return 'Email is empty';
  }

  if (!pattern.test(email)) {
    return 'Invalid email address';
  }

  return '';
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'Password is empty';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  return '';
};
