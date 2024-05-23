import { RegisterOptions } from 'react-hook-form';

export const rules: Record<string, RegisterOptions> = {
  username: { required: 'Name is required' },
  firstname: { required: 'Firstname is required' },
  lastname: { required: 'Lastname is required' },
  email: { required: 'Email is required' },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must have at least 8 characters',
    },
  },
};

export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function isValidName(name: string): boolean {
  const pattern = /^[A-Za-z]+$/;
  return pattern.test(name);
}
