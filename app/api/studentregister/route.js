import { connect } from "../../../lib/db";
import { NextResponse } from "next/server";
import user from "../../../lib/model/studentuser";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        const {name, email, password} = await req.json();
        console.log("does this req. works");
        console.log(name, email, password);
        const hashedPassword = await bcrypt.hash(password, 12);
        await connect();
        console.log("does this connect works");
        await user.create({name, email, password:hashedPassword, course:[], dob:null, phone:null, profilepic:null, address:null, city:null, state:null, pincode:null, location:null, className: null, school:null});

        return NextResponse.json({message: "User created successfully"})
    }
    catch(error){
        return NextResponse.json({message: "Error creating user"}, {status: 500})
    }
}

export async function GET() {
    let data = [];
    let success = true;
    try {
        await connect();
        data = await user.find();
    } catch (error) {
        data = {result:'error'}
        success = false
    }
    return NextResponse.json({result:data,success});
}