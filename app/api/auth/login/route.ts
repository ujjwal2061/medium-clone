import { PrismaClient } from "@/lib/generated/prisma";

import jwt from "jsonwebtoken";
import { serialize } from 'cookie'




interface LoginBody{
    email:string
    password:string,
}

const prisma_client=new PrismaClient();


export async function POST(req:Request){
    try{
   const body=await req.json();
   const {email,password}:LoginBody=body;

   if(!email || !password){
    return new Response(JSON.stringify({error:"Email &&  password required"}))
   }
   // check user is exsit ot not 
  const isExiteuser=await prisma_client.user.findUnique({
     where:{email},
  })
  if(!isExiteuser){
    return new Response(JSON.stringify({error:"Account not found !"}))
  }
  // set cookies here 
  const token=jwt.sign({id:isExiteuser.id},process.env.JWT_SECRET!, { expiresIn: '2h' })
  // this beacuse of the samesite 
  const cookie=serialize('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:'strict',
    path:"/"
  })
  return new Response(JSON.stringify({
    message:'Logged succesfully'
  }),{status:200,
    headers:{'Set-Cookie':cookie}
  }
)
    }catch(error){
        return  new Response (JSON.stringify({message:"Interal sever error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
    }
