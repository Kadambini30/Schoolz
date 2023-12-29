'use client'
import React, { useState, useEffect , useRef} from 'react';

const page = (query) => {
    console.log(query);
    const courseData = JSON.parse(query.searchParams.course);
    const [currentPage, setCurrentPage] = useState('home');
    const [messages, setMessages] = useState([]);
    let data;
    const scrollRef = useRef();
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    // Retrieve the last visited page from local storage
    useEffect(() => {
        const storedPage = localStorage.getItem('currentPage');
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);
    console.log("Scroll ref ", scrollRef.current)
    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/forms/${query.params.groupid}`);
            data = await response.json();
            console.log(data);
            setMessages(data.result.messages);
        };

        fetchData();
    }, [setMessages, query.params.groups]);

    const handleSectionChange = (section) => {
        setCurrentPage(section);
        // Save the current page to local storage
        localStorage.setItem('currentPage', section);
    };

    const handleSendMessage = async () => {
        const timestamp = new Date().toLocaleString();
        const message = {
            message: newMessage,
            sender: "teacher",
            timestamp: timestamp
        };

        const updatedMessages = [...messages, message];

        await fetch(`http://localhost:3000/api/forms/${query.params.groups}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: updatedMessages })
        });
        setNewMessage('');
        window.location.reload();
    };

    return (
        <div className='overflow-y-hidden justify-center flex flex-col items-center'>
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
                <div className=' bg-red-100 h-[83vh] w-[80vw]'>
                    <h2>Message Section</h2>
                    
                    <div className='overflow-y-scroll scroll-m-4 h-[70vh]' ref={scrollRef}>
                        {messages.length > 0 && messages.map((message, index) => (
                            <div className='px-2 py-3 bg-gray-400 m-3' key={index} >
                                <p className='text-3xl'>{message.message}</p>
                                <p className='text-xs'>Sender: {message.sender}</p>
                                <p className='text-xs'>Time: {message.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
