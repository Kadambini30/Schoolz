'use client'
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const Page = () => {
  const [name, setName] = useState('John Doe');
  const [className, setClassName] = useState('Class 10');
  const [email, setEmail] = useState('john.doe@example.com');

  

  return (
    <div className='text-center p-10 outline justify-center flex flex-col m-40'>
      <h1>Welcome, {name}!</h1>
      <p>Class: {className}</p>
      <p>Email: {email}</p>
      <button onClick={()=>signOut()} className='bg-red-700 text-white w-32 p-4 mx-auto font-bold'>Logout</button>
    </div>
  );
};

export default Page;
