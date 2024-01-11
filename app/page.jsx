import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col text-center justify-center items-center h-[100vh] bg-cover" style={{ backgroundImage: "url('/mainPageBG.jpg')" }}>
      <Link href='/aboutus' className="transition-all duration-300 ease-in-out absolute top-4 right-4 text-[#78befb] hover:text-black bg-white text-2xl underline font-serif">About us</Link>
      <Link className='transition-all duration-300 ease-in-out text-center bg-black bg-opacity-55 text-gray-100 hover:bg-[#acd4f7] hover:text-black border-none p-8 text-3xl rounded-full m-4' href='/studentLogin/'>Student Login</Link>
      <Link className='transition-all duration-300 ease-in-out text-center bg-black bg-opacity-55 text-gray-100 hover:bg-[#acd4f7] hover:text-black border-none p-8 text-3xl rounded-full m-4' href='/teacherLogin'>Teacher Login</Link>
    </main>
  )
}
