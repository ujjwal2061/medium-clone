"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";



interface UserInfo {
  id: number;
  username: string | null;
  email: string;
  posts: Post[];
}

interface CurrentUser {
  id: number;
  username: string | null;
  email: string;
}

interface ProfileProps {
  userInfo: UserInfo | null;
  currentuser?: CurrentUser | null;
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export const Profile: React.FC<ProfileProps> = ({ userInfo, currentuser }) => {


  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          // @ts-expect-error style typing is wrong in lib
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
//  const handleLogout=()=>{
//   cookieStore.delete("token")
//   if(!token){
//     router.push("/");
//   }
//  }
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <nav className=" fixed z-20    w-full bg-white  border-b">
        <div className="max-w-7xl  justify-between mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
         {/* <Button  variant="destructive" className="cursor-pointer"><LogOut  size={18}/>LogOut</Button> */}
        </div>
      </nav>

      <div className=" mt-8 max-w-7xl w-full flex flex-col gap-4 md:flex-row mx-auto px-4 py-6">
        <div className="w-full md:w-1/3 md:border-none">
          <Card>
            <CardHeader>
              <div className="flex  w-fit flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{userInfo?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{userInfo?.username}</p>
                  <span className="text-sm text-gray-500">{userInfo?.email}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Blog Posts Section */}
        <div className="w-full md:w-2/3 px-2 bg-card text-foreground rounded-xl py-2">
          <h1 className="p-1 font-semibold text-gray-700 text-2xl">Your Posts</h1>
          <div className="rounded-t-md flex flex-col scrollbar-hide overflow-auto px-2">
            {userInfo?.posts.map((blog) => (
              <Link key={blog.id} href={`/post/${blog.id}`}>
                <Card className="mb-4">
                  <CardHeader>
                    <div className="flex items-center gap-1">
                      <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{userInfo?.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                      <p className="text-sm font-medium">{userInfo.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {/* {new Date(post.createdAt).toLocaleDateString()} */}
                      </p>
                    </div>
                    <CardTitle className="text-xl">
                      <p>{blog.title}</p>
                    </CardTitle>
                  </CardHeader>
                 <CardContent>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                  >
                    {blog.content 
                      ? blog.content.slice(0, 150) + (blog.content.length > 150 ? "..." : "")
                      : "no-content"}
                  </ReactMarkdown>
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
