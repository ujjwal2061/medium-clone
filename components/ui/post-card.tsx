"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  SquareArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import  PostCardLoading  from "./loading";
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string | null;
    image: string | null;
  };
}

export default function PostCard() {
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

   const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          // @ts-expect-error 
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-200 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  } as Components;

  // function fo the share link
  const handleShareblog=async(post:Post ,event:React.MouseEvent)=>{
    event.preventDefault();
    event.stopPropagation();
    const shareData={
      title:post.title,
      text:`Check out this post :${post.title}`,
      url:`${window.location.origin}/post/${post.id}`
    }
    try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard!");
    }
  } catch (error) {
 
    const textArea = document.createElement('textarea');
    textArea.value = shareData.url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast.success("Link copied to clipboard!");
  }
};
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/allposts");
        const data = await res.json();
        await new Promise(r=>setTimeout(r,600))
        setPosts(data);
      } catch (err:any) {
       if(err.response){
        toast.error(err.response.data)
       }else{
        toast.error("Someting went wrong !!")
       }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
if (loading) {
  return <PostCardLoading />
}


  return (
    <div className="space-y-6 ">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
        <Card key={post.id} className="border dark:border-neutral-900 border-zinc-200 rounded-md m-2 ">
          <CardHeader>
           <div className="flex  dark:border-neutral-900 border w-fit  p-1.5 rounded-md flex-row items-center gap-2">
                 <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="w-8 h-8 rounded-full dark:bg-neutral-800  px-2  py-1 shadow ">
                    {post.author?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{post.author?.username ?? "Unknown Author"}</p>
                <p className="text-xs text-muted-foreground">
                  {/* {new Date(post.createdAt).toLocaleDateString()} */}
                </p>
              </div>
            <CardTitle className="text-xl">
              <p>
                {post.title}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {post.content 
              ? post.content.slice(0, 259)
              : "no-content"}
          </ReactMarkdown>
        </CardContent>
          <CardFooter className="flex items-center  gap-1 space-x-4">
            
          <button className="cursor-pointer hover:text-blue-500">
            <SquareArrowUpRight onClick={(e)=>handleShareblog(post,e)}  
            
            size={18}/> 
          </button>
          </CardFooter>
        </Card>
      </Link>
      ))}
    </div>
  );
}
