"use client"
import { Post } from "./post-card" 
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import { ArrowLeft } from "lucide-react";
import  Link from "next/link"
import { useState } from "react";
import { Card, CardContent, CardHeader,CardTitle } from "./card";
import Themenavabar from "@/modules/UI/nava-bar-view/theme-navbar";
export default function PostIdpage({posts}:any){
    
    //   const [loading, setLoading] = useState(true);
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
        <code className=" px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  } as Components;
  
 return(
   <div className="min-h-screen flex flex-col bg-card dark:bg-neutral-950 ">
     <Themenavabar />
      <div className="max-w-5xl mx-auto  mt-16 ">
       <Card className="">
           <CardTitle className="text-xl  px-6">
              <p>
                {posts.title}
              </p>
            </CardTitle>
            <CardContent>
                 <ReactMarkdown 
                   remarkPlugins={[remarkGfm]}
                   rehypePlugins={[rehypeRaw]}
                   components={components}>
                   {posts.content}
                  </ReactMarkdown>
            </CardContent>
       </Card>
      </div>
      </div>

 )
}