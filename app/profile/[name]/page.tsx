import { Profile } from "@/modules/UI/user-profile-view/profile-view";
import  jwt from "jsonwebtoken";
import { toast } from "sonner";
import { cookies } from 'next/headers'
import { notFound } from "next/navigation";
import {prisma} from "@/lib/prisma"
import { useSession } from "next-auth/react";
import {auth} from "@/app/auth"

async function getCurrentloginuser(token: string) {
  const session=await auth();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user =  session?.user ?await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, email: true, posts: true },
    }):null;
    return user;

  } catch (err: any) {
    if (err.response) {
      toast.error(err.response.data.error || "Something went  wrong ");
    } else {
      toast.error("Networking error");
    }
    return null;
  }
}
async function getProfileUser(name: string) {
  try {
    const profileUser = await prisma.user.findUnique({
      where: { username: name },
      select: {
        id: true,
        username: true,
        email: true,
        posts: true,
      },
    });
    return profileUser;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.error || "Something went  wrong ");
    } else {
      toast.error("Networking error");
    }
    return null;
  }
}
interface PageProps {
  params: {
    name: string;
  };
}
export async function generateMetadata({params}:PageProps) {
  const userprams=await params;
  return{
    title:`${userprams.name}  | truly`,
    description: `Profile page of ${userprams.name}.`,
  }
  
}
export default async function Page({ params }: PageProps) {
  const { name } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let currentloginuser = null;
  if (token) {
    currentloginuser = await getCurrentloginuser(token);
  }
  const profileUser = await getProfileUser(name);
  if (!profileUser) {
    notFound();
  }

  return <Profile userInfo={profileUser} currentuser={currentloginuser} />;
}
