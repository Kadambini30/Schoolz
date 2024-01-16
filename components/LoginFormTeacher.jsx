"use client"
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const LoginFormTeacher = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await signIn("credentials", {
        email,
        password,
        redirect:false
      })
      if(res.error){
        setError("Invalid credentials");
      }
      else
{      router.replace(`/teacherLogin/${email}/`);
}    }
    catch(error){
      setError("Invalid credentials");
    }
  }

  return (
<div className="flex flex-col text-center justify-center items-center w-full h-screen bg-cover" style={{ backgroundImage: "url('/classroom.jpeg')" }}>
<div className="absolute top-5 left-3 w-[26rem] h-32" style={{ backgroundImage: "url('/icon.png   ')" }}>
      </div>
      <div className="shadow-lg  h-content py-2 px-2 bg-white bg-opacity-10 rounded-3xl border border-black border-opacity-0 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-4xl font-jacques">
        <h1 className="font-bold my-4 text-6xl text-[#9A62D7]">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-4 py-3 items-center">
          <input
            type="text"
            placeholder="Username"
            className="border-2 rounded-md shadow outline-p-2none placeholder:text-2xl placeholder:text-black"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md shadow outline-p-2none placeholder:text-2xl placeholder:text-black"
            onChange = {(e)=>{setPassword(e.target.value)}}
          />
          <button
            type="submit"
            className="p-2 bg-bg text-3xl rounded-xl w-72 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login
          </button>
          {error && (        <div className="flex flex-col gap-3 px-4 py-3">{error}</div>
)}
        <Link href={"/teacherLogin/register"} className="text-base w-72" >
            Dont have an account? <span className="text-bg">Register here</span>.
            </Link>
            </form>

      </div>
    </div>
  );
};

export default LoginFormTeacher;
