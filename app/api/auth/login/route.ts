import { PrismaClient } from "@/lib/generated/prisma";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie'
import  {compare}from "bcrypt-ts"

interface LoginBody{
    email:string
    password:string,
}

const prisma_client=new PrismaClient();

export async function POST(req:Request){
    try{
   const body=await req.json();
   const {email,password}:LoginBody=body;
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email & password required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
   // check user is exsit ot not 
  const isExiteuser=await prisma_client.user.findUnique({
     where:{email},
  })
  if(!isExiteuser){
    return new Response(JSON.stringify({ error: "Account not found!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }
  const isMatchPassowrd=await compare(password,isExiteuser.password);
  
  if(!isMatchPassowrd){
      throw new Error("Invalid credentials");
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
    message:'Logged in  succesfully'
  }),{status:200,
    headers:{
       "Content-Type": "application/json",
      'Set-Cookie':cookie}
  }
)
    }catch(error){
      console.log(error)
        return  new Response (JSON.stringify({message:"Interal sever error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
    }
