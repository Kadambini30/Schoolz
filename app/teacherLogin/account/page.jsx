'use client'

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Page = (creds) => {
  const {data:session}= useSession();
  console.log("creds : ",creds)
  const [formData, setFormData] = useState({
    dob:'',
    phone:'',
    profilepic:'',
    address:'',
    city:'',
    state:'',
    pincode:'',
    location:'',
    school:'',
  });
  const picChange = (e) => {
      console.log(e.target.name)
      console.log("profile pic")
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        console.log("profile pic base 64: ",reader.result);
        setFormData({ ...formData, [e.target.name]: reader.result });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const teacherid = creds.searchParams.teacher;
console.log(teacherid)
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:3000/api/teacherregister/${teacherid}`);
          const data = await response.json();
          console.log("data.result")
          console.log(teacherid)
          console.log(data.result);
          setFormData(data.result);
      } catch (error) { 
          console.log(error);
      }
  };

  fetchData();
}, []);
const handleSubmit = async (e) => {
   e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    console.log(teacherid)

    const responseget = await fetch(`http://localhost:3000/api/teacherregister/${teacherid}`,{
      method: 'PUT',
      body: JSON.stringify({city: formData.city,
      state: formData.state, address: formData.address, location: formData.location, phone: formData.phone, className: formData.className, school: formData.school, dob: formData.dob, pincode: formData.pincode, profilepic: formData.profilepic})
    });
    // console.log(params.teacher)
    const teacherdataget = await responseget.json();
    console.log("teacherdataget");
    console.log(teacherdataget);

}
if (typeof studentid === 'undefined') {
  return (
    <button
        onClick={() => signOut()}
        className="bg-red-700 text-white w-32 p-4 mx-auto font-bold mt-4"
      >
        Logout
      </button>
  );
}
console.log("formData", formData);
  return (
    <div className="text-center p-10 outline justify-center flex flex-col m-40">
      <h1>Welcome, {session?.user?.name}!</h1>
      <p>ID: {session?.user?._id}</p>
      <p>Email: {session?.user?.email}</p>
    {formData.profilepic && <img className='w-40 h-40 border-spacing-3 rounded-full' src={formData.profilepic} alt="profile pic" />}
   
      <form className="flex flex-col text-center p-10 outline-dashed m-10 w-60" onSubmit={handleSubmit}>
        <label>
          DOB:
          <input
            type="date" // Update the input type to "date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            autoComplete="bday"
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="phone"
          />
        </label>
        <br />
        <label>
          Profile Picture:
          <input
            accept='image/*'
            type="file"
            name="profilepic"
            onChange={picChange}
            autoComplete="profilepic"
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="address"
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            autoComplete="city"
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            autoComplete="state"
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            autoComplete="pincode"
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            autoComplete="location"
          />
        </label>
        <br />
        {/* <label>
          Class:
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            autoComplete="className"
          />
        </label>
        <br /> */}
        <label>
          Institution Name:
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            autoComplete="school"
          />
        </label>
        <br />
        <button
          className="bg-red-400 bg-blend-screen text-center"
          type="submit"
          >Submit</button>
      </form>

      <button
        onClick={() => signOut()}
        className="bg-red-700 text-white w-32 p-4 mx-auto font-bold mt-4"
      >
        Logout
      </button>
    </div>
  );
};


export default Page;





// 'use client'
// import { useState } from 'react';
// import { signOut } from 'next-auth/react';
// import { useSession } from 'next-auth/react';

// const Page = () => {

//   const {data:session}= useSession();

//   return (
//     <div className='text-center p-10 outline justify-center flex flex-col m-40'>
//       <h1>Welcome, {session?.user?.name}!</h1>
//       <p>id {session?.user?._id}</p>
//       <p>Email: {session?.user?.email}</p>
//       <button onClick={()=>signOut()} className='bg-red-700 text-white w-32 p-4 mx-auto font-bold'>Logout</button>
//     </div>
//   );
// };

// export default Page;
