import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
export const {handlers,signIn,signOut,auth} =NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
        })
    ],
    session:{
        strategy:"database"
    },
    pages:{
        signIn:"/auth/signin",
    },
    secret:process.env.NEXTAUTH_SECRET
})
