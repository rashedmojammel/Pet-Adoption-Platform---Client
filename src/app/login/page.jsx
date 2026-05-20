'use client';

import { authClient } from '@/lib/auth-client';
// import { LogIn } from '@gravity-ui/icons';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import React from 'react';

const PawIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 13.5C10.067 13.5 8.5 15.067 8.5 17C8.5 18.933 10.067 20.5 12 20.5C13.933 20.5 15.5 18.933 15.5 17C15.5 15.067 13.933 13.5 12 13.5Z" fill="#0891b2" />
    <ellipse cx="6.5" cy="11" rx="2" ry="2.5" fill="#0891b2" />
    <ellipse cx="17.5" cy="11" rx="2" ry="2.5" fill="#0891b2" />
    <ellipse cx="9" cy="8" rx="1.75" ry="2.25" fill="#0891b2" />
    <ellipse cx="15" cy="8" rx="1.75" ry="2.25" fill="#0891b2" />
  </svg>
);

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      console.error('Login error:', JSON.stringify(error));
      alert(error.message || 'Login failed. Check console for details.');
      return;
    }

    if (data) {
      console.log('User logged in:', data);
      window.location.href = '/';
    }
  };

  const handleGoogleSignIn = async () => {
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to find your perfect furry companion!
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                return 'Please enter a valid email address';
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-1">
            <TextField
              isRequired
              name="password"
              type="password"
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>

          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>

        </Form>

   
        <p className="text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-cyan-500 hover:underline">
            Sign up here
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border border-[#e5e5e5] w-full"
        >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Continue with Google
        </button>

      </Card>
    </div>
  );
};

export default LoginPage;