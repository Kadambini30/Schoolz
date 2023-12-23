"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


function Page({params}) {
    console.log(params.student)
    const presenturl = `http://localhost:3000/studentLogin/${params.student}/`
    console.log(presenturl)
  const carouselData = [
    {
      imageAddress: "/khanSir.jpeg",
      name: "Khan sir",
      description: "Description 1",
      userid: "khan",
    },
    {
      imageAddress: "/physicsWallah.jpeg",
      name: "Alakh Pandey",
      description: "Description 2",
      userid: "pw",
    },
    {
      imageAddress: "/shraddha.jpeg",
      name: "Shraddha Khapra",
      description: "Description 3",
      userid: "aman",
    },
  ];
  return (
    <main className="">
      {/* student navbar */}
      <div className="flex bg-[#c6f0f5] justify-end p-4">
        <Link href={`${presenturl}/account`}className="">
          Account
        </Link>
      </div>
      {/* enrolled carousel */}
      <div className="flex flex-row items-center h-[40vh] overflow-y-hidden">
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
            <div className="flex flex-col p-10 items-center hover:scale-105 transition duration-300 ease-in-out">
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
