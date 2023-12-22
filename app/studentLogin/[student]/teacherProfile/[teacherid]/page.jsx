'use client'
    import React, { useEffect, useState } from 'react';

    export default function TeacherId({ params }) {
        const [teacherData, setTeacherData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/forms/${params.teacherid}`);
                    const data = await response.json();
                    console.log(data.result);
                    setTeacherData(data.result);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }, [params.teacherid]);

        return (
            <div>
                TeacherId: {params.teacherid}
                <div>
                    {teacherData && (
                        <div>
                            <h3>{teacherData.name}</h3>
                            <p>{teacherData.subject}</p>
                            <p>{teacherData.address}</p>
                            <p>{teacherData.username}</p>
                            <p>{teacherData.email}</p>
                            <p>{teacherData.dob}</p>
                            <p>{teacherData.institutionName}</p>
                            <p>{teacherData.fees}</p>
                            <button type="button" className='outline w-40 bg-red-300' onClick={() => {}}>Enroll</button>
                        </div>
                    )
                    
    }
                </div>
            </div>
        );
    }