

import { NavbarView } from "@/modules/UI/nava-bar-view/Navbar.view";
import { cookies } from 'next/headers'
import  jwt from "jsonwebtoken";
import { toast } from "sonner";
import {prisma} from "@/lib/prisma"
import PostCard from "@/components/ui/post-card"
import {Post} from "@/components/ui/post-card"


// -> geting user
async function getuserToken(token:string){
  try{
 const decoded=jwt.verify(token,process.env.JWT_SECRET!) as any;
 const user= await prisma.user.findUnique({
  where:{id:decoded.id},select:{id:true,username:true,email:true}
 })
 return user;
  }catch(err){
  console.error("Error verifying token:", err);
    return null; 
  }
}
export   async function Page() {
 const cookieStore = await cookies()
const token =cookieStore.get("token")?.value
  let user = null;
if(token){
  user=await getuserToken(token);
}
  return (
    <div className="min-h-screen  bg-slate-100">
      <NavbarView  username={user?.username}/>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full justify-center mt-16  p-2 flex flex-col gap-1">
          <PostCard  />
        </div>
      </div>
    </div>
  );
};
