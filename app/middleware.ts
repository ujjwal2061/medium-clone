import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; 
export function middleware(request:NextRequest){
//
 const pathname = request.nextUrl.pathname;
const token =request.cookies.get("tokken")?.value

if (!token) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
console.log("Token",token)
// this set where there routes that need to protected 
// in this case i have onlu routes which is [name] so i make public route for other 

// const protectedRoutes=[""];
// const isProtected=protectedRoutes.some((path)=>request.nextUrl.pathname.startsWith(path))
// if(isProtected){
//     if(!token){
//         return NextResponse.redirect(new URL("/auth/login",request.url))
//     }
// }
  const publicPaths = ["/auth", "/api", "/favicon.ico"];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
try{
    jwt.verify(token,JWT_SECRET)
}catch(err){
    return NextResponse.redirect(new URL("/auth/login",request.url));
}
  return NextResponse.next();
}
// routes which  get access only through the middlware
export const config={
    matchMediaher:"/:name"
}