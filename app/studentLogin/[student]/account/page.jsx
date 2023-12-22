'use client'
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Page = () => {

  const {data:session}= useSession();

  return (
    <div className='text-center p-10 outline justify-center flex flex-col m-40'>
      <h1>Welcome, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
      <button onClick={()=>signOut()} className='bg-red-700 text-white w-32 p-4 mx-auto font-bold'>Logout</button>
    </div>
  );
};

export default Page;
