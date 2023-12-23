"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function page({params}){
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDistance, setSearchDistance] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/forms")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setTeachers(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDistanceSearch = (event) => {
    setSearchDistance(parseInt(event.target.value, 10)); // Parse to an integer
  };
  const filteredPeople = teachers.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (person.distance <= searchDistance || !searchDistance)
  );
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
      />
      <input
        type="number"
        onChange={handleDistanceSearch}
        placeholder="Filter by distance"
      />
      <div>
        {filteredPeople.map((person, index) => (
          <Link
            href={{
              pathname: `/studentLogin/${params.student}/teacherProfile/${person._id}`,
              query: {
                teachers: person._id,
              },
            }}
            key={index}
          >
            <div className="p-10 m-10 outline">
              <h3>{person.name}</h3>
              <p>{person.subject}</p>
              <p>{person.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default page;
