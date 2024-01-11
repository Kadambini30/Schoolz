import React from 'react'

function page() {
  return (
    <div className='flex flex-col text-center h-[100vh]'>
        <div className='flex flex-col'>
            <h1 className='text-green-700 text-6xl font-bold font-serif p-10'>
                About Us
            </h1>
            <p className='p-10'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
    </div>
  )
}

export default page