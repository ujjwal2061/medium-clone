"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, SquareArrowUpRight } from "lucide-react";
import Link from "next/link";

export   interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
}
export default function PostCard({
  post,
  showFullContent = false,
}: {
  post: Post;
  showFullContent?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
        </div>
        <div>
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <CardTitle className="text-xl">
          {showFullContent ? (
            <p>
                {post.title}
            </p>
          ) : (
            <Link href="#" className="hover:underline">
              {post.title}
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
       {post.content}
      </CardContent>
      <CardFooter className="flex items-center sapce-x-4">
        <div className="flex  gap-2 items-center w-24 justify-between ">
        <Button variant="secondary" className="cursor-pointer">
          <Bookmark size={20} className="text-black" />
        </Button>
       <Button variant="secondary" className="cursor-pointer">
          <SquareArrowUpRight size={20} className="text-black" />
        </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
