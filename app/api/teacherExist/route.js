import { connect } from "../../../lib/db";
import { NextResponse } from "next/server";
import user from "../../../lib/model/teacheruser";
export async function POST(req) {
    try {
        await connect();
        const {email} = await req.json();
        console.log("email : ", email);
        const userExist = await user.findOne({email}).select("_id");
        console.log("user : ", userExist);  
        return NextResponse.json({user:userExist}) // Convert user to plain JavaScript object
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error finding user"}, {status: 500})
    }
}