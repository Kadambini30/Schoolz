"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

let presenturl= "";
function Page({ params }) {
   presenturl = `http://localhost:3000/studentLogin/${params.student}`;
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/studentregister/${params.student}`
        );
        const data = await response.json();

        // Fetch details of enrolled teacher courses
        const teacherCourses = data.result.course;
        console.log("Enrolled Teacher Courses:");
        console.log(teacherCourses);
        // Fetch details for each teacher using the _id values
        const teacherCourseDetails = await Promise.all(
          teacherCourses.map(async (teacherId) => {
            console.log(teacherId);
            const teacherResponse = await fetch(
              `http://localhost:3000/api/forms/${teacherId}`
            );
            const teacherData = await teacherResponse.json();
            console.log(teacherData.result);
            return {
              id: teacherId,
              name: teacherData.result.name,
              subject: teacherData.result.subject,
              // You can include other fields as needed
            };
          })
        );

        // Update the carouselData state with the fetched details
        setCarouselData(teacherCourseDetails);
        console.log(carouselData);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(carouselData);

    fetchData();
  }, [params.student]);

  return (
    <main className="">
      {/* student navbar */}
      <div className="flex bg-[#c6f0f5] justify-end p-4">
        <Link href={`/studentLogin/account`}className="">
          Account
        </Link>
      </div>
      {/* enrolled carousel */}
      {carouselData.length > 0 && (
      <div className="flex flex-row items-center h-[40vh] overflow-y-hidden ">
        {carouselData.map((item, index) => (
          <Link
            href={{
              pathname: `${presenturl}/class`,
              query: {
                teacherid: item.userid,
                teachername: item.name,
              },
            }}
            key={index}
          >
            <div className="flex flex-col p-10 items-center hover:scale-105 transition duration-300 ease-in-out bg-red-200 px-10 mx-10">
              <Image
                src={item.imageAddress}
                alt={item.name}
                className="rounded-full cursor-pointer w-auto h-auto"
                width={200}
                height={200}
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
      )}
      {/* video analyser */}
      <Link href={`${presenturl}/checkyoulearn`}>
        <button className="bg-[#fff888] p-10 m-5 items-center hover:scale-105 transition duration-300 ease-in-out">
          Video Analyzer
        </button>
      </Link>
      {/* searchbar */}
      <Link href={`${presenturl}/search`}>
        <button className="bg-[#fff888] p-10 m-5 items-center hover:scale-105 transition duration-300 ease-in-out">
          Search Tuitions
        </button>
      </Link>
      {/* doubt solver chatbot */}
      <Link href={`${presenturl}/doubtsolve`}>
        <button className="bg-[#fff888] p-10 m-5 items-center hover:scale-105 transition duration-300 ease-in-out">
          Solve your doubts
        </button>
      </Link>
    </main>
  );
}

export default Page;


export {presenturl}
