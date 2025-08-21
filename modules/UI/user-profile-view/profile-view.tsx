"use client";
import { Button } from "@/components/ui/button";


interface UserInfo {
  id: number;
  username: string | null;
  email: string;
  posts: Post[];
}

interface CurrentUser {
  id: number;
  username: string |null;
  email: string;
}
interface ProfileProps {
  userInfo: UserInfo | null;
  currentuser:CurrentUser| null;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  authorId: number;
}
export const Profile: React.FC<ProfileProps> = ({ userInfo,currentuser}) => {
  const iscurrentuserProfile=currentuser?.id==userInfo?.id;
  return (
    <div className="min-h-screen flex justify-center bg-slate-100">
      <div className="max-w-6xl w-full p-2 flex flex-col  gap-4">
        <div className=" relative  flex flex-col  rounded-md max-h-56 ">
          <div className=" w-full  h-full">
            <img  src="/images/kw.jpeg"  className="object-cover  rounded-md h-full w-full"/>
          </div>
          <div className="absolute  -bottom-11 left-2 rounded-full border-2  border-zinc-500 h-32 w-32 ">
            <img src="/images/kw.jpeg" className="object-cover rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-1  lg:grid-cols-2 gap-2 py-8 sm:px-2 ">
         <div className=" bg-zinc-100 shadow-md rounded-md p-2 h-44">
          <h1 className="text-xl font-bold">Intro</h1>
          <div className="flex flex-col justify-center items-center gap-2 ">
          <span className="text-md font-semibold text-gray-500">Unemployed</span>
           {iscurrentuserProfile && (
             <Button variant="outline" className="cursor-pointer w-full ">Edit Bio</Button>
           )}
          </div>
          <div className=" flex flex-col items-start p-1">
          <span className="font-semibold text-gray-800">{userInfo?.username}</span>
          <p className="font-medium text-gray-500">{userInfo?.email}</p>
          </div>
         </div>
         {/*Blog seection of user */}
          <div className="px-2 bg-zinc-100 shadow rounded-md">
          <h1 className=" p-1 font-semibold text-gray-700">Blogs</h1>
          <div className="rounded-t-md  flex flex-col scrollbar-hide overflow-auto max-h-96">
          {/* {blogs.map((blog ,i)=>(
              <div  key={i} className="blog-section rounded-md flex flex-col ">
           <div className="image-section flex flex-1 items-center bg-neutral-300 mt-1 rounded-t-md gap-1 p-0.5">
            <div className=" w-8  h-8">
            <img  src={blog.imageUrl}  className="object-cover  rounded-full h-full w-full"/>
            </div>
            <div className="flex flex-col  items-start w-full ">
                <span className="font-semibold text-md text-gray-600">{userInfo?.username}</span>
                <p className="text-gray-600 flex gap-1 text-sm  items-center">{blog.date}
                {blog.icon}
                </p>
            </div>
           </div>
           <div className="bg-neutral-100 ">
            <p className="text-start tracking-tight leading-relaxed text-gray-600">{blog.description}</p>
            <div className="w-full ">
             <img src={blog.imageUrl}  className="rounded-b-md h-full w-full object-cover"/>
            </div>
           </div>
          </div>
        ))} */}
         </div>

        </div>
        </div>
      </div>
    </div>
  );
};
