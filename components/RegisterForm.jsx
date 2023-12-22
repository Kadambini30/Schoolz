'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror ] = useState('');
    const router = useRouter();
    const handleSubmit = async(e) => {
        console.log("Submitted");
        e.preventDefault();
        if (!name || !email || !password) {
            seterror('Please fill all the fields');
            return;
        }
        try {
            const resUserExist = await fetch('/api/studentExist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            });
            console.log(resUserExist);
            const { user } = await resUserExist.json();
            console.log(user);
            if (user) {
                seterror('User already exists');
                return;
            }

            const res = await fetch('/api/studentregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push('/studentLogin');
            } else {
                console.log("User Registration Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-yellow-400">
      <h1 className="font-bold my-4 text-xl">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-3">
            <input
                type="text"
                placeholder="Full Name"
                className="p-2 border-2 rounded-md border-gray-400 outline-none"
                onChange={(e) => setName(e.target.value)}
            />
          <input
            type="text"
            placeholder="Username"
            className="p-2 border-2 rounded-md border-gray-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border-2 rounded-md border-gray-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-yellow-400 rounded-md text-white font-bold cursor-pointer px-6 py-2"
          >
            Register
          </button>
        </form>
{       error && ( <div className="flex flex-col gap-3 px-4 py-3">{error}</div>)
}        <Link href="/studentLogin">
            Already have an account? <span className='underline'>Login</span>
            </Link>
      </div>
    </div>
  )
}


export default RegisterForm