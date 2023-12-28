import React from 'react'
import RegisterFormTeacher from '../../../components/RegisterFormTeacher'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'


const page = async() => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect('/teacherLogin/account')
  }
  return (
      <RegisterFormTeacher/>
  )
}

export default page
