"use client"
import React from 'react';
import Link from 'next/link';
const StudentPage = () => {

    return (
        <div className='flex flex-col w-80'>
            <h1>Welcome, Student!</h1>
            <Link className='p-32 text-center outline' href='/student/dashboard'>Student Dashboard</Link>
        </div>
    );
};

export default StudentPage;

