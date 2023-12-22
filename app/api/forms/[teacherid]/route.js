import { NextResponse } from "next/server";
import teacherform from "../../../../lib/model/teacherform";
import { connect } from "../../../../lib/db";

export async function PUT(request,content){
    const teacherid= content.params.teacherid;
    console.log(teacherid);
    const filter = {_id:teacherid};
    console.log(filter);
    await connect();
    const payload = await request.json();
    console.log('payload printed');
    console.log(payload);
    const result = await teacherform.findOneAndUpdate(filter,payload);
    const success = true;
    return NextResponse.json({result,success});
}
export async function GET(request,content){
    const teacherid= content.params.teacherid;
    console.log(teacherid);
    const filter = {_id:teacherid};
    console.log(filter);
    await connect();
    const result = await teacherform.findOne(filter);
    const success = true;
    return NextResponse.json({result,success});
}
// export async function GET(request) {
//     const { id } = request.query;
//     let data = [];
//     let success = true;
//     try {
//         await connect();
//         data = await teacherform.findById(id);
//         if (!data) {
//             success = false;
//         }
//     } catch (error) {
//         data = { result: 'error' };
//         success = false;
//     }
//     return NextResponse.json({ result: data, success,prince:'hello' });
// }
