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

import React from 'react';

const  LoginPage= () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      console.error("Login error:", JSON.stringify(error));
      alert(error.message || "Login failed. Check console for details.");
      return;
    }

    if (data) {
      console.log("User logged in:", data);
      window.location.href = "/";
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <Card className='max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 p-8'>

        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold'>Login</h1>
          <p className='text-gray-500 mt-2'>
            Join us and start adopting your perfect pet today!
          </p>
        </div>

        <Form onSubmit={onSubmit} className='flex flex-col gap-4'>

          <TextField
            isRequired
            name='email'
            type='email'
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                return 'Please enter a valid email address';
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder='john@example.com' />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name='password'
            type='password'
            validate={(value) => {
              if (value.length < 8) return 'Password must be at least 8 characters';
              if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
              if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder='Enter your password' />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <Button type='submit' className='w-full'>
            <Check />
            Login
          </Button>

        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;