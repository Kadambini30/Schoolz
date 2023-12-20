'use client'
import React from 'react'


export default function ChatPage({ searchParams }) {

  const messages = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    text: `Message ${index + 1}`,
  }));

  return (
    <main>
      <h1 className='text-2xl font-bold'>Chat with {searchParams.teachername}</h1>
    <div  style={{ overflow: 'auto' }}>
      {messages.map((message) => (
        <div className='m-3 bg-[#8b8c92] h-16' key={message.id}>{message.text}</div>
      ))}
    </div>
    </main>
  );
}
