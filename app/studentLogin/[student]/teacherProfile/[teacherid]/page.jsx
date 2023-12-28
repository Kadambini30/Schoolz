"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherId({ params }) {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Fetch teacher details
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/forms/${params.teacherid}`
        );
        const data = await response.json();
        console.log(data.result);
        setTeacherData(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.teacherid]);

  const [course, setCourse] = useState([]);

  //update course
  const handleApply = async (e) => {
    e.preventDefault();

    const responseget = await fetch(`http://localhost:3000/api/studentregister/${params.student}`);
    const studentdataget = await responseget.json();
    console.log("studentdataget");
    console.log(studentdataget.result.course);
    console.log("studentdataget");

    const updatedCourse = studentdataget.result.course.includes(params.teacherid)
      ? studentdataget.result.course.filter((id) => id !== params.teacherid)
      : [...studentdataget.result.course, params.teacherid];
console.log("updatedCourse");
console.log(updatedCourse);
    const response = await fetch(`http://localhost:3000/api/studentregister/${params.student}`, {
      method: 'PUT',
      body: JSON.stringify({
        course: updatedCourse,
      }),
    });
    const studentdata = await response.json();
    console.log(studentdata.result);
    // setTeacherData(data.result);
  };


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
            <Link
              type="button"
              className="outline w-40 bg-red-300"
              href={`/studentLogin/${params.student}/teacherProfile/${params.teacherid}/apply`} onClick={handleApply}
            >
              Enroll
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
