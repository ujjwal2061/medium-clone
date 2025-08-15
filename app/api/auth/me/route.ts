import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma_client=new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!; 

export async function GET(req:NextRequest){
    const token=req.cookies.get("token")?.value;
    if(!token){
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
        // check the user  token 
        const decodeId=jwt.verify(token,JWT_SECRET) as jwt.JwtPayload;
        const user=await prisma_client.user.findUnique({
            where:{id:decodeId.id},
            select:{id:true, username:true, email:true}
        })
         if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user)
   return NextResponse.json(user);

    } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}