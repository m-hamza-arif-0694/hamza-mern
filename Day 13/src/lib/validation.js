/**
 * Centralized Form Validation Engine for Day 13 HisabDo Web Application
 */

export const validateAmount = (amount) => {
  if (!amount || amount === '') return 'Amount is required.';
  const num = Number(amount);
  if (isNaN(num)) return 'Amount must be a valid number.';
  if (num <= 0) return 'Amount must be greater than Rs. 0.';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') return 'Phone number is required.';
  const cleaned = phone.replace(/\s+/g, '');
  const pkPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;
  if (!pkPhoneRegex.test(cleaned)) {
    return 'Enter a valid Pakistani phone (e.g. +923001234567 or 03001234567).';
  }
  return null;
};

export const validateRequired = (val, fieldName = 'Field') => {
  if (!val || String(val).trim() === '') {
    return `${fieldName} is required.`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') return 'Email address is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') return 'Confirm password is required.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null;
};

export const validateOTP = (otp) => {
  if (!otp || otp.trim() === '') return 'Verification OTP code is required.';
  if (!/^\d{4}$/.test(otp.trim())) return 'OTP must be a 4-digit code (e.g. 1234).';
  return null;
};
