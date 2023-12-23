import {connect} from "../../../lib/db";
import { NextResponse } from "next/server";
import studentenrollments from "../../../lib/model/studentenrollments";

export async function GET() {
    let data = [];
    let success = true;
    try {
        await connect();
        data = await studentenrollments.find();
    } catch (error) {
        data = {result:'error'}
        success = false
    }
    return NextResponse.json({result:data,success});
}

export async function POST(request) {
    await connect();
    const payload = await request.json();
    let forms = new studentenrollments(payload);
    const data = await forms.save();
    console.log(data);
    return NextResponse.json({data, success: true });
}

