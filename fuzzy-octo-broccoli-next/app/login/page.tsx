'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from "../../components/Auth";

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const router = useRouter();

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let idToken;
    
    try {
      idToken = await signIn({ Email: email, Password: password });

      setCookie('bearerToken', idToken, 7);

      router.push('/app');
    } catch (error) {
      console.error('Login failed:', error);
    }

    console.log('Successful sign in with:', { email, password });

    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email using a simple pattern match
    const valid = /\S+@\S+\.\S+/.test(value);
    setEmailValid(valid);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${emailValid ? 'text-gray-600' : 'border-red-500 hover:border-red-500'} `}
            style={{ color: 'gray', borderColor: emailValid ? '' : '#EF4444' }}
          />
          {!emailValid && (
            <span className="text-xs text-red-500 block mb-2">Please enter a valid email address</span>
          )}
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            style={{ color: 'gray' }}
          />
          <button
            type="submit"
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="inline-block mr-2">Login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-black text-center text-2xl mb-5">Fuzzy-Octo-Broccoli🥦</h1>
        <LoginForm />
        </div>
    </div>
  );
}
