import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div style={{ backgroundColor: 'green', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'white', fontSize: '48px' }}>Submitted</h1>
        <Link href='/' className='p-32 bg-blue-500'>Go HOME</Link>
        </div>
    );
};

export default Page;
