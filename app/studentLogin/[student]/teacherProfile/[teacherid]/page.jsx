"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherId({ params }) {
  const [teacherData, setTeacherData] = useState(null);
  const [course, setCourse] = useState([]);
  const [enrollClicked, setEnrollClicked] = useState(0);

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

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/studentregister/${params.student}`
        );
        const data = await response.json();
        console.log("DATA: ", data);
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, [enrollClicked]);

  // Update course
  const handleApply = async (e) => {
    e.preventDefault();
    setEnrollClicked(enrollClicked + 1);

    const studentdataget = course;
    console.log("studentdataget");
    console.log("STUDENT DATA GET : ", studentdataget);

    const updatedCourse = studentdataget.result.course.includes(params.teacherid)
      ? studentdataget.result.course.filter((id) => id !== params.teacherid)
      : [...studentdataget.result.course, params.teacherid];
    console.log("updatedCourse");
    console.log(updatedCourse);

    const response = await fetch(
      `http://localhost:3000/api/studentregister/${params.student}`,
      {
        method: "PUT",
        body: JSON.stringify({
          course: updatedCourse,
        }),
      }
    );
    const studentdata = await response.json();
    console.log(studentdata.result);
  };

  console.log("course");
  console.log(course);

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
            {course.result && course.result.course.includes(params.teacherid) ? (
              <div>
                <Link
                  type="button"
                  className="outline w-40 bg-red-300"
                  href={`/studentLogin/${params.student}/teacherProfile/${params.teacherid}/unenroll`}
                  onClick={async (e) => {
                    await handleApply(e);
                    window.location.reload();
                  }}
                >
                  Unenroll
                </Link>
                <Link
                  type="button"
                  className="outline w-40 bg-red-300"
                  href={{
                    pathname: `/studentLogin/${params.student}/${params.teacherid}`,
                    query: { courseid: JSON.stringify(teacherData._id) },
                  }}
                >
                  Go to messages
                </Link>
              </div>
            ) : (
              <Link
                type="button"
                className="outline w-40 bg-red-300"
                href={`/studentLogin/${params.student}/teacherProfile/${params.teacherid}/apply`}
                onClick={async (e) => {
                  await handleApply(e);
                  window.location.reload();
                }}
              >
                Enroll
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
