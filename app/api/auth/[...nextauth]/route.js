import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { connect } from "../../../../lib/db";
import studentuser from "../../../../lib/model/studentuser";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {

            },
            async authorize(credentials){
                const {email, password} = credentials;
                try {
                    await connect();
                    const user = await studentuser.findOne({ email: email });
                    console.log(user);
                    if (!user) {
                        throw new Error("No user found");
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        throw new Error("Incorrect password");
                        return null;
                    }
                    return user;
                } catch (err) {
                    console.log(err);
                }
            }
        })
    ],
    session:{
        strategy: "jwt",
    }     ,
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/studentLogin",
    }      
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}