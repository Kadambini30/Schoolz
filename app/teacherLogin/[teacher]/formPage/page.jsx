'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Page({params}) {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        address: '',
        username: '',
        messages:{
            message:[],
            sender:[],
            time:[]
        },
        fees: '',
        institutionName: ''
    });
    let resid;

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);

        console.log("params.teacher");
        console.log(params.teacher)

        const responseget = await fetch(`http://localhost:3000/api/teacherregister/${params.teacher}`);
        console.log("params.teacher");
        console.log(params.teacher)
        const teacherdataget = await responseget.json();
        console.log("teacherdataget");
        console.log(teacherdataget.result._id);
        formData.username = teacherdataget.result._id;

        console.log('formData', formData);

        let res = await fetch('http://localhost:3000/api/forms', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        res = await res.json();
        if (res && res.data) {
            resid = res.data._id;

        console.log(resid)
        } else {
            console.error('Invalid response format');
        }

        if (res && res.success) {
            console.log('Teacher added successfully');
        }

        console.log("params.teacher");
        console.log(params.teacher)

        // const responseget = await fetch(`http://localhost:3000/api/teacherregister/${params.teacher}`);
        // console.log("params.teacher");
        // console.log(params.teacher)
        // const teacherdataget = await responseget.json();
        console.log("teacherdataget");
        console.log(teacherdataget);
        console.log(teacherdataget.result.course);
        teacherdataget.result.course.push(resid);
        teacherdataget.result.course = [...new Set(teacherdataget.result.course)];
        console.log("teacherdataget.result.course");
        console.log(teacherdataget.result.course);
        // // Append new course id to teacherdataget.result.course
        // teacherdataget.result.course.push(resid);
        // console.log("teacherdataget.result.course");
        // console.log(teacherdataget.result.course);

        // // PUT request to update teacher data
        await fetch(`http://localhost:3000/api/teacherregister/${params.teacher}`, {
            method: 'PUT',
            body: JSON.stringify({
                course: teacherdataget.result.course,
            })
        });

        // Redirect to /teacher/submitpage
        router.push('/teacherLogin/dingdong/submitpage');
    };

    return (
        <form className='flex flex-col text-center p-10 outline-dashed m-10 w-60' onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
            </label>
            <br />
            {/* <label>
                DOB:
                <input type="text" name="dob" value={formData.dob} onChange={handleChange} autoComplete="bday" />
            </label> */}
            {/* <br />
            <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
            </label>
            <br /> */}
            <label>
                Subject:
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} autoComplete="subject" />
            </label>
            <br />
            <label>
                Address:
                <input type="text" name="address" value={formData.address} onChange={handleChange} autoComplete="address" />
            </label>
            <br />
            {/* <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} autoComplete="username" />
            </label> */}
            <br />
            <label>
                Fees:
                <input type="text" name="fees" value={formData.fees} onChange={handleChange} autoComplete="off" />
            </label>
            <br />
            <label>
                Institution Name:
                <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    autoComplete="organization"
                />
            </label>
            <br />
            <button className='bg-red-400 bg-blend-screen text-center' type="submit">Submit</button>
        </form>
    );
}

export default Page;
