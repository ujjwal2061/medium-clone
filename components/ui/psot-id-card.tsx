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
        <code className="bg-gray-200 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  } as Components;
  
 return(
   <div className="min-h-screen flex flex-col bg-slate-100">
      <nav className=" fixed   w-full bg-white  border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto  mt-16 ">
       <Card>
          <CardHeader>
                <div className="flex border-neutral-200  bg-neutral-200 w-fit  p-1.5 rounded-md flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-zinc-100  shadow rounded-full px-2 py-1">
                    {posts?.author?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{posts.author?.username ?? "Unknown Author"}</p>
                <p className="text-xs text-muted-foreground">
                  {/* {new Date(post.createdAt).toLocaleDateString()} */}
                </p>
              </div>
          </CardHeader>
           <CardTitle className="text-xl  px-6">
              <p>
                {posts.title}
              </p>
            </CardTitle>
            <CardContent>
                 <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={components}
                          >
                            {posts.content}
                          </ReactMarkdown>
            </CardContent>
       </Card>
      </div>
      </div>

 )
}