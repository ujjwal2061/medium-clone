import Image from "next/image";
import { Bookmark, SquareArrowUpRight } from "lucide-react";
import { NavbarView } from "@/modules/UI/nava-bar-view/Navbar.view";
import { cookies } from 'next/headers'
import  jwt from "jsonwebtoken";
import { toast } from "sonner";
import {prisma} from "@/lib/prisma"

// -> geting user
async function getuserToken(token:string){
  try{
 const decoded=jwt.verify(token,process.env.JWT_SECRET!) as any;
 const user=await prisma.user.findUnique({
  where:{id:decoded.id},select:{id:true,username:true,email:true}
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
export   async function Page() {
 const cookieStore = await cookies()
const token =cookieStore.get("token")?.value
let user=null;
if(token){
  user=await getuserToken(token);
}

  return (
    <div className="min-h-screen  bg-slate-100">
      <NavbarView  username={user?.username}/>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full justify-center mt-16  p-2 flex flex-col gap-1">
          {/* Post Section */}
          <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
                <Image
                  src="/images/kw.jpeg"
                  alt="post page"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex items-center">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi
                  doloribus repellat saepe obcaecati hic quam officiis soluta. At dolorum autem
                  quisquam modi, mollitia animi cumque quod temporibus.
                  <br />
                  Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                  reprehenderit blanditiis amet expedita fugit eum laborum.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <Bookmark size={20} className="text-black" />
              </button>
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <SquareArrowUpRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
                <Image
                  src="/images/kw.jpeg"
                  alt="post page"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex items-center">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi
                  doloribus repellat saepe obcaecati hic quam officiis soluta. At dolorum autem
                  quisquam modi, mollitia animi cumque quod temporibus.
                  <br />
                  Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                  reprehenderit blanditiis amet expedita fugit eum laborum.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <Bookmark size={20} className="text-black" />
              </button>
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <SquareArrowUpRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
                <Image
                  src="/images/kw.jpeg"
                  alt="post page"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex items-center">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi
                  doloribus repellat saepe obcaecati hic quam officiis soluta. At dolorum autem
                  quisquam modi, mollitia animi cumque quod temporibus.
                  <br />
                  Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                  reprehenderit blanditiis amet expedita fugit eum laborum.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <Bookmark size={20} className="text-black" />
              </button>
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <SquareArrowUpRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
                <Image
                  src="/images/kw.jpeg"
                  alt="post page"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex items-center">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi
                  doloribus repellat saepe obcaecati hic quam officiis soluta. At dolorum autem
                  quisquam modi, mollitia animi cumque quod temporibus.
                  <br />
                  Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                  reprehenderit blanditiis amet expedita fugit eum laborum.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <Bookmark size={20} className="text-black" />
              </button>
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <SquareArrowUpRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
                <Image
                  src="/images/kw.jpeg"
                  alt="post page"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex items-center">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi
                  doloribus repellat saepe obcaecati hic quam officiis soluta. At dolorum autem
                  quisquam modi, mollitia animi cumque quod temporibus.
                  <br />
                  Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                  reprehenderit blanditiis amet expedita fugit eum laborum.
                </p>
              </div>
            </div>
            <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <Bookmark size={20} className="text-black" />
              </button>
              <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
                <SquareArrowUpRight size={20} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
