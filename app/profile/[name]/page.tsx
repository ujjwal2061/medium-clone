import { Profile } from "@/modules/UI/user-profile-view/profile-view";
import { PrismaClient } from "@/lib/generated/prisma";
import  jwt from "jsonwebtoken";
import { toast } from "sonner";
import { cookies } from 'next/headers'

const prisma=new PrismaClient();
async function getuserToken(token:string){
  try{
 const decoded=jwt.verify(token,process.env.JWT_SECRET!) as any;
 const user=await prisma.user.findUnique({
  where:{id:decoded.id},select:{id:true,username:true,email:true,posts:true}
 })
 return user;
  }catch(err:any){
  if (err.response) {
        toast.error(err.response.data.error || "Something went  wrong ");
      } else {
        toast.error("Networking error");
      }
  return null;
  }
}
export default  async function Page() {

 const cookieStore = await cookies()
const token =cookieStore.get("token")?.value
let user=null;
if(token){
  user=await getuserToken(token);
}


  return <Profile  userInfo={user}/>;
}
