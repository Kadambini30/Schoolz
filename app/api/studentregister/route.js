import { connect } from "../../../lib/db";
import { NextResponse } from "next/server";
import user from "../../../lib/model/studentuser";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);
        await connect();
        await user.create({name, email, password:hashedPassword});

        return NextResponse.json({message: "User created successfully"})
    }
    catch(error){
        return NextResponse.json({message: "Error creating user"}, {status: 500})
    }
}
