'use client'
import Link from 'next/link';
import React, { useState } from 'react';

export default function Layout({ children ,selectparams }) {
    const [selectedOption, setSelectedOption] = useState('Updates');
    const sideopt = ['Updates', 'Files', 'Chat','Assignments'];

    const handleTeacherClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <ul>
                    {sideopt.map((option, index) => (
                        <Link
                            href={{
                                pathname: '/student/class/',
                                query: {
                                    teacherid: index + 1,
                                    teachername: option,
                                },
                            }}
                         className={`cursor-pointer flex flex-col justify-center items-center h-20 w-full border-b-2 border-gray-200 hover:bg-gray-100${selectedOption== option ? ' bg-gray-100' : ''}`}
                            key={index}
                            onClick={() => handleTeacherClick(option)}
                        >
                            {option}
                        </Link>
                    ))}
                </ul>
                <Link href='/student/dashboard/' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>dashboard</Link>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}