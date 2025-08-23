"use client";

import Tiptap from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft,PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const router=useRouter();
  const [loading ,setIsLoading]=useState(false);
  const [content, setContent] = useState("");
  const [title, setTilte] = useState("");
  const onChange = (content: string) => {
    setContent(content);
  };
  const handlePost=async(e:React.FormEvent)=>{
      e.preventDefault();
    setIsLoading(true)
    try{
      const res=await axios.post("/api/create",{
        title,
        content,
      
      })
     if (res.status == 200 || res.status == 201) {
        toast.success(res.data.message || "Post created successfully");
        router.push("/");
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.error || "Something went  wrong ");
      } else {
        toast.error("Networking error");
      }
  }finally{
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full bg-white border border-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-5xl gap-2  w-full mx-auto py-8 px-4 ">
        <form onSubmit={handlePost} className=" ">
        <div className=" flex  flex-col gap-1 px-2 py-2 border-2 border-slate-200 rounded-md">
        <div className="flex justify-between px-2 w-full">
        <Label htmlFor="title" className="font-semibold text-2xl"> Post Title</Label>
        <Button 
         disabled={loading}
         type="submit" className="cursor-pointer">{loading ? 
          <span className="flex gap-1 items-center">Creating post<LoaderCircle className="animate-spin" /></span> :
          <p className="flex  gap-1 items-center">
          <PlusCircle />
          <span className="hidden sm:block"> 
            Create post
          </span>
            </p>
          }
          </Button>
        </div>
        <Textarea  id="title" value={title} 
        onChange={(e)=>setTilte(e.target.value)}
         placeholder="Post title..."
        required/>

          <Tiptap content={content} onChange={onChange} />
          </div>
        </form>
      </div>
    </div>
  );
}
