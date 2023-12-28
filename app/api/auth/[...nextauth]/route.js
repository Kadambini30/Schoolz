import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "../../../../lib/db";
import studentuser from "../../../../lib/model/studentuser";
import teacheruser from "../../../../lib/model/teacheruser";
import bcrypt from "bcryptjs";

let batch = "";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, callbackUrl } = credentials;

        try {
          await connect();
          
          let userModel;
          if (callbackUrl.includes("student")) {
            userModel = studentuser;
            batch = '/studentLogin';
          } else if (callbackUrl.includes("teacher")) {
            userModel = teacheruser;
            batch = '/teacherLogin';
          } else {
            throw new Error("Invalid callback URL");
          }

          const user = await userModel.findOne({ email: email });
          console.log(user);

          if (!user) {
            throw new Error("No user found");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (err) {
          console.log(err);
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/`,
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth from "next-auth/next";
// import  CredentialsProvider  from "next-auth/providers/credentials";
// import { connect } from "../../../../lib/db";
// import studentuser from "../../../../lib/model/studentuser";
// import teacheruser from "../../../../lib/model/teacheruser";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//     providers:[
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {

//             },
//             async authorize(credentials){
//                 const {email, password} = credentials;
//                 console.log("credentials : ", credentials);
//                 console.log("THIS IS URL: ", credentials.callbackUrl);
//                 try {
//                     await connect();
//                     const user = await studentuser.findOne({ email: email });
//                     console.log(user);
//                     if (!user) {
//                         throw new Error("No user found");
//                         return null;
//                     }
//                     const passwordMatch = await bcrypt.compare(password, user.password);

//                     if (!passwordMatch) {
//                         throw new Error("Incorrect password");
//                         return null;
//                     }
//                     return user;
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         })
//     ],
//     session:{
//         strategy: "jwt",
//     }     ,
//     secret:process.env.NEXTAUTH_SECRET,
//     pages:{
//         signIn:"/studentLogin",
//     }      
// }

// const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST}

// // import NextAuth from "next-auth/next";
// // import  CredentialsProvider  from "next-auth/providers/credentials";
// // import { connect } from "../../../../lib/db";
// // import studentuser from "../../../../lib/model/studentuser";
// // import teacheruser from "../../../../lib/model/teacheruser";
// // import bcrypt from "bcryptjs";


// // export const authOptions = {
// //     providers:[
// //         CredentialsProvider({
// //             name: "credentials",
// //             credentials: {},
// //             async authorize(credentials,context){
// //                 const {email, password} = credentials;
// //                 console.log("credentials : ", credentials);
// //                 console.log("THIS IS URL");
// //                 console.log(context.req.url);
// //                 console.log(credentials.callbackUrl)
// //                 try {
// //                     console.log("batch : ", batch);
// //                     await connect();
// //                     const user = await studentuser.findOne({ email: email });
// //                     console.log(user);
// //                     if (!user) {
// //                         throw new Error("No user found");
// //                     }
// //                     const passwordMatch = await bcrypt.compare(password, user.password);

// //                     if (!passwordMatch) {
// //                         throw new Error("Incorrect password");
// //                     }
// //                     return user;
// //                 } catch (err) {
// //                     console.log(err);
// //                 }
// //             }
// //         })
// //     ],
// //     session:{
// //         strategy: "jwt",
// //     }     ,
// //     secret:process.env.NEXTAUTH_SECRET,
// //     pages:{
// //         signIn:"/studentLogin",
// //     }      
// // }

// // const handler = NextAuth(authOptions);
// // export {handler as GET, handler as POST}