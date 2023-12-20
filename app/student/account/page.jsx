'use client'
import { useState } from 'react';

const Page = () => {
  const [name, setName] = useState('John Doe');
  const [className, setClassName] = useState('Class 10');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleLogout = () => {
    // Perform logout logic here
  };

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Class: {className}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Page;
