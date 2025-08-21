import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import {auth} from "./auth"


const JWT_SECRET = process.env.JWT_SECRET!; 
export function customMiddleware(request:NextRequest){
//
 const pathname = request.nextUrl.pathname;
 const publicPaths = ["/auth", "/api", "/favicon.ico"];
 if (publicPaths.some((path) => pathname.startsWith(path))) {
   return NextResponse.next();
 }

 const token =request.cookies.get("token")?.value
if (!token) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
try{
    jwt.verify(token,JWT_SECRET)
}catch(err){
    return NextResponse.redirect(new URL("/auth/login",request.url));
}
  return NextResponse.next();
}

export default auth(async(request)=>{
  if(request.auth){
    return NextResponse.next();
  }
return customMiddleware(request);
})
// routes which  get access only through the middlware
export const config={
    matcher:["/profile/:path*"]
}