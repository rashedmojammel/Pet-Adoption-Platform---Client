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

const SignupPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      image: userData.image,
    });

    if (error) {
      console.error("Signup error:", JSON.stringify(error));
      alert(error.message || "Signup failed. Check console for details.");
      return;
    }

    if (data) {
      console.log("User created:", data);
      window.location.href = "/login";
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <Card className='max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 p-8'>

        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold'>Create Account</h1>
          <p className='text-gray-500 mt-2'>
            Join us and start adopting your perfect pet today!
          </p>
        </div>

        <Form onSubmit={onSubmit} className='flex flex-col gap-4'>

          <TextField
            isRequired
            name='name'
            type='text'
            validate={(value) => {
              if (value.length < 2) return 'Name must be at least 2 characters';
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder='John Doe' />
            <FieldError />
          </TextField>

          <TextField isRequired name='image' type='text'>
            <Label>Image URL</Label>
            <Input placeholder='https://example.com/photo.jpg' />
            <FieldError />
          </TextField>

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
            Create Account
          </Button>

        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;