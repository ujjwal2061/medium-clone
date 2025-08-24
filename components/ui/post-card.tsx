"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, SquareArrowUpRight } from "lucide-react";
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

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
        <Card key={post.id} className="shadow-md m-2 ">
          <CardHeader>
           <div className="flex border-neutral-200  bg-neutral-200 w-fit  p-1.5 rounded-md flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-zinc-100  shadow rounded-full px-2 py-1">
                    {post?.author?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{post.author?.username ?? "Unknown Author"}</p>
                <p className="text-xs text-muted-foreground">
                  {/* {new Date(post.createdAt).toLocaleDateString()} */}
                </p>
              </div>
            <CardTitle className="text-xl mt-2">
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
              ? post.content.slice(0, 150) + (post.content.length > 150 ? "..." : "")
              : "no-content"}
          </ReactMarkdown>
        </CardContent>
          <CardFooter className="flex items-center space-x-4">
            <Button variant="secondary" className="cursor-pointer">
              <Bookmark size={20} className="text-black" />
            </Button>
            <Button variant="secondary" className="cursor-pointer">
              <SquareArrowUpRight size={20} className="text-black" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
      ))}
    </div>
  );
}
