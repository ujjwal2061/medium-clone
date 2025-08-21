"use client";

import Tiptap from "@/components/text-editor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full bg-white border border-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl w-full mx-auto py-8 px-4">
        <Tiptap content={post} onChange={onChange} />
      </div>
    </div>
  );
}
