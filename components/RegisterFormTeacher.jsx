'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function RegisterFormTeacher() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror ] = useState('');
    const [course, setCourse] = useState([]);
    console.log({course});
    const router = useRouter();
    const handleSubmit = async(e) => {
        console.log("Submitted");
        e.preventDefault();
        if (!name || !email || !password) {
            seterror('Please fill all the fields');
            return;
        }
        try {
            const resUserExist = await fetch('/api/teacherExist', {
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

            const res = await fetch('/api/teacherregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password,course})
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push('/teacherLogin');
            } else {
                console.log("User Registration Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="flex flex-col text-center justify-center items-center w-full h-screen bg-cover" style={{ backgroundImage: "url('/classroom.jpeg')" }}>
      <div className="absolute top-5 left-3 w-[26rem] h-32" style={{ backgroundImage: "url('/icon.png   ')" }}>
      </div>
    <div className="shadow-lg  h-content py-2 px-2 bg-white bg-opacity-10 rounded-3xl border border-black border-opacity-0 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-4xl font-jacques">
      <h1 className="font-bold my-4 text-6xl text-[#9A62D7]">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-4 pt-2 items-center">
            <input
                type="text"
                placeholder="Full Name"
                className="border-2 rounded-md shadow outline-p-2none placeholder:text-2xl placeholder:text-black"
                onChange={(e) => setName(e.target.value)}
            />
          <input
            type="text"
            placeholder="Username"
            className="border-2 rounded-md shadow outline-p-2none placeholder:text-2xl placeholder:text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md shadow outline-p-2none placeholder:text-2xl placeholder:text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-bg text-3xl rounded-xl w-72 text-white font-bold cursor-pointer px-6 py-2"
          >
            Register
          </button>
        </form>
{       error && ( <div className="flex flex-col gap-3 px-4 py-3">{error}</div>)
}        <Link href="/teacherLogin" className='text-base  w-72'>
            Already have an account? <span className='text-bg'>Login</span>
            </Link>
      </div>
    </div>
  )
}


export default RegisterFormTeacher