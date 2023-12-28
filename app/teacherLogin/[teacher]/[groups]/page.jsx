'use client'
import React, { useState } from 'react';

const page = (query) => {
    console.log(query.searchParams.course);
    const courseData = JSON.parse(query.searchParams.course);
    const [currentPage, setCurrentPage] = useState('home');

    const handleSectionChange = (section) => {
        setCurrentPage(section);
    };

    return (
        <div>
            <h1 className='text-center stroke-indigo-500 font-bold text-4xl'>{courseData.name}</h1>


            <div className='flex flex-row justify-evenly'>
                <button className='p-5 m-3 bg-red-200' onClick={() => handleSectionChange('home')}>Home</button>
                <button className='p-5 m-3 bg-red-200' onClick={() => handleSectionChange('file')}>File</button>
                <button className='p-5 m-3 bg-red-200' onClick={() => handleSectionChange('message')}>Message</button>
            </div>
            {currentPage === 'home' && (
                <div>
                    <h2>Home Section</h2>
                    {/* Add your home section content here */}
                </div>
            )}
            {currentPage === 'file' && (
                <div>
                    <h2>File Section</h2>
                    {/* Add your file section content here */}
                </div>
            )}
            {currentPage === 'message' && (
                <div>
                    <h2>Message Section</h2>
                    {/* Add your message section content here */}
                </div>
            )}
        </div>
    );
};

export default page
