"use client";
import React, { useState, useEffect, useRef, use } from "react";

const page = (query) => {
  console.log(query);
  const courseData = JSON.parse(query.searchParams.course);
  const [currentPage, setCurrentPage] = useState("home");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [enrolledStudent, setEnrolledStudent] = useState([]);
  let data;
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);


  // Helper function to convert data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/studentregister/`
        );
        const studentdata = await response.json();

        console.log("Student Data: ", studentdata.result, courseData._id);

        // Filter students based on courseData._id
        const enrolledStudents = studentdata.result.filter((student) =>
          student.course.includes(courseData._id)
        );

        console.log("Enrolled Students: ", enrolledStudents);

        // Now you can use enrolledStudents as needed
        setEnrolledStudent(enrolledStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [courseData._id]);

  const picChange = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      console.log("profile pic base 64: ", reader.result);
      setNewMessage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  // Retrieve the last visited page from local storage
  console.log("Scroll ref ", scrollRef.current);
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/forms/${query.params.groups}`
      );
      data = await response.json();
      console.log(data);
      setMessages(data.result.messages);
    };

    fetchData();
  }, [messages, query.params.groups]);

  const handleSectionChange = (section) => {
    setCurrentPage(section);
    // Save the current page to local storage
    localStorage.setItem("currentPage", section);
  };

  const handleSendMessage = async () => {
    const timestamp = new Date().toLocaleString();
    const message = {
      message: newMessage,
      sender: "teacher",
      timestamp: timestamp,
    };
    console.log("messages:", messages); // Add this line to check the value of messages
    let updatedMessages = [];
    console.log("message length:", messages.length); // Add this line to check the length of messages
    if (messages.message == 0) {
      updatedMessages = [message];
    } else {
      updatedMessages = [...messages, message];
    }

    await fetch(`http://localhost:3000/api/forms/${query.params.groups}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
    });
    setNewMessage("");
    // window.location.reload();
  };

  return (
    <div className="overflow-y-hidden justify-center flex flex-col items-center">
      <h1 className="text-center stroke-indigo-500 font-bold text-4xl">
        {courseData.name}
      </h1>

      <div className="flex flex-row justify-evenly">
        <button
          className="p-5 m-3 bg-red-200"
          onClick={() => handleSectionChange("home")}
        >
          Participants
        </button>
        <button
          className="p-5 m-3 bg-red-200"
          onClick={() => handleSectionChange("file")}
        >
          File
        </button>
        <button
          className="p-5 m-3 bg-red-200"
          onClick={() => handleSectionChange("message")}
        >
          Message
        </button>
      </div>

      {currentPage === "home" && (
        <div>
          <h2>Participants</h2>
          {/* Add your home section content here */}
          <div className="px-2 py-3 bg-gray-400 m-3">
            <p className="text-3xl">{courseData.institutionName}</p>
          </div>
          {enrolledStudent.length > 0 &&
            enrolledStudent.map((student, index) => (
              <div className="px-2 py-3 bg-gray-400 m-3" key={index}>
                <p className="text-3xl">{student.name}</p>
                <p className="text-xs">Username: {student.email}</p>
                {/* <p className='text-xs'>Phone: {student.phone}</p>
                            <p className='text-xs'>Address: {student.address}</p> */}
              </div>
            ))}
        </div>
      )}

      {currentPage === "file" && (
        <div>
          <h2>File Section</h2>
          {/* Add your file section content here */}
        </div>
      )}

      {currentPage === "message" && (
        <div className=" bg-red-100 h-[83vh] w-[80vw]">
          <h2>Message Section</h2>
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message"
            />
            {newMessage.length > 0 &&
              newMessage.match(/\.(jpeg|jpg|gif|png)$/) && (
                <img
                  className="w-40 h-40 border-spacing-3 rounded-full"
                  src={newMessage}
                  alt="profile pic"
                />
              )}
            <input
              accept="image/*"
              type="file"
              name="image"
              onChange={picChange}
              autoComplete="image"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <div
            className="overflow-y-scroll scroll-m-4 h-[70vh]"
            ref={scrollRef}
          >
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div className="px-2 py-3 bg-gray-400 m-3" key={index}>
                  {message.message.includes("data:image") &&
                  message.message.length > 2000 ? (
                    <img
                      className="rounded-md w-32 h-auto"
                      src={message.message}
                    />
                  ) : (
                    <p className="text-3xl">{message.message}</p>
                  )}
                  <p className="text-xs">Sender: {message.sender}</p>
                  <p className="text-xs">Time: {message.timestamp}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
