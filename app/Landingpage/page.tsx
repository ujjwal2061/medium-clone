
import { Bookmark, SquareArrowUpRight } from "lucide-react";
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
const samplePosts:Post[] = [
  {
    id: "1",
    title: "The Learning Process: How to Learn Effectively",
    content: "Learning is a journey, not just a destination. Whether you’re studying a new programming language, mastering a musical instrument, or exploring a new skill, understanding how learning works can make the process easier and more enjoyable. Here’s a simple guide to help you learn effectively.",
    createdAt: new Date().toISOString(),
    author: { name: user?.username || "Anonymous", image: null },
  },
  {
    id: "2",
    title: "Tips for Staying Motivated While Learning",
    content: "Motivation is the key to consistent progress. Set small achievable goals, track your improvements, and reward yourself along the way. Connecting learning with your passions can also make the process more enjoyable and help you stay committed.",
    createdAt: new Date().toISOString(),
    author: { name: "Jane Doe", image: null },
  },
  {
    id: "3",
    title: "How to Retain Knowledge Longer",
    content: "Retention is as important as learning itself. Use techniques like spaced repetition, active recall, and teaching others. Regularly revisiting what you’ve learned will strengthen your memory and deepen your understanding.",
    createdAt: new Date().toISOString(),
    author: { name: "John Smith", image: null },
  },
];

  return (
    <div className="min-h-screen  bg-slate-100">
      <NavbarView  username={user?.username}/>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full justify-center mt-16  p-2 flex flex-col gap-1">
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} showFullContent={false} />
         ))}
        </div>
      </div>
    </div>
  );
};
