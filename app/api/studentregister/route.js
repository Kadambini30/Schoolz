import { connect } from "../../../lib/db";
import { NextResponse } from "next/server";
import user from "../../../lib/model/studentuser";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        const {name, email, password,course} = await req.json();
        console.log(req.json());
        const hashedPassword = await bcrypt.hash(password, 12);
        await connect();
        await user.create({name, email, password:hashedPassword, course});

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