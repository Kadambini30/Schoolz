import { NextResponse } from "next/server";
import user from "../../../../lib/model/studentuser";
import { connect } from "../../../../lib/db";

export async function GET(request, content) {
    const studentid = content.params.student;
    const filter = { email: studentid };

    try {
        await connect();
        const result = await user.findOne(filter);
        // Exclude MongoDB client object from the response
        const sanitizedResult = { ...result._doc, _id: result._id.toString() };
        return NextResponse.json({ result: sanitizedResult, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error retrieving user", success: false }, { status: 500 });
    }
}

export async function PUT(request, content) {
    const studentid = content.params.student;
    const filter = { email: studentid };
    const payload = await request.json();
    console.log("payload");
    console.log(payload);
    console.log("payload");
    try {
        await connect();
        const result = await user.findOneAndUpdate(filter,{course: payload.course});
        // Exclude MongoDB client object from the response
        const sanitizedResult = { ...result._doc, _id: result._id.toString() };
        return NextResponse.json({ result: sanitizedResult, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating user", success: false }, { status: 500 });
    }
}