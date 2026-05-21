'use client';

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import React, { useState } from 'react';

const PawIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 13.5C10.067 13.5 8.5 15.067 8.5 17C8.5 18.933 10.067 20.5 12 20.5C13.933 20.5 15.5 18.933 15.5 17C15.5 15.067 13.933 13.5 12 13.5Z"
      fill="#0891b2"
    />
    <ellipse cx="6.5" cy="11" rx="2" ry="2.5" fill="#0891b2" />
    <ellipse cx="17.5" cy="11" rx="2" ry="2.5" fill="#0891b2" />
    <ellipse cx="9" cy="8" rx="1.75" ry="2.25" fill="#0891b2" />
    <ellipse cx="15" cy="8" rx="1.75" ry="2.25" fill="#0891b2" />
  </svg>
);

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const password = userData.password;
    const confirmPassword = userData.confirmPassword;

    // Password Validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage('Password must contain at least one lowercase letter');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password must be same');
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      image: userData.image,
    });

    // Error Message
    if (error) {
      setErrorMessage(error.message || 'Signup failed');
      return;
    }

    // Success Redirect
    if (data) {
      window.location.href = '/login';
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Card className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 p-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-cyan-50 mb-3">
            <PawIcon />
          </div>

          <h1 className="text-2xl font-bold">Create account</h1>

          <p className="text-gray-500 text-sm mt-1">
            Join us and start adopting your perfect pet today!
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm mb-4">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* Image */}
          <TextField isRequired name="image" type="text">
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              • At least 6 characters <br />
              • One uppercase letter <br />
              • One lowercase letter
            </Description>

            <FieldError />
          </TextField>

          {/* Confirm Password */}
          <TextField isRequired name="confirmPassword" type="password">
            <Label>Confirm Password</Label>

            <Input placeholder="Confirm your password" />

            <FieldError />
          </TextField>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            <Check />
            Create account
          </Button>
        </Form>

        {/* Login Redirect */}
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-500 hover:underline">
            Login here
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="btn bg-white text-black border border-[#e5e5e5] w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>

          Continue with Google
        </button>
      </Card>
    </div>
  );
};

export default SignupPage;