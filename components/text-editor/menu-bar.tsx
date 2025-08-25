import React, { useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
 Code,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  ImagePlus
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";


export default function Menubar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
// const [preview ,setPreview]=useState<String | null>(null);
const addImagetoEditor=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  const file=e.target.files?.[0];
  if(!file) return;
 const formData=new FormData();
 formData.append("file",file);
 try{
   const res=await axios.post("/api/upload", formData,{
    headers:{
      "Content-Type":"multipart/form-data",
    }
   })
    const imagelink=res.data.secure_url;
    if(imagelink){
      editor.chain().focus().setImage({src:imagelink}).run()
    }
  }catch (err: any) {
      if (err.response) {
        console.log(err.response.data.err)
        toast.error(err.response.data.error || "Something went  wrong ");
      } else {
        toast.error("Networking error");
      }
}
}
  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },

  ];
  return (
    <div className="border  flex  flex-wrap items-center rounded-md p-1 dark:bg-neutral-950 bg-slate-50 space-x-2 z-20 mb-1  ">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
          className="cursor-pointer">
          {option.icon}{" "}
        </Toggle>
      ))}
          <div className="flex  items-center gap-2 ">
          <button className={editor.isActive('codeBlock')?'is-active cursor-pointer p-2 rounded':""} 
          onClick={()=>editor.chain().focus().setCodeBlock().run()}>
            <Code size={16} />
          </button>
           <button className={editor.isActive('codeBlock')?'is-active cursor-pointer p-2 rounded ':""} 
            onClick={()=>editor.chain().focus().toggleCodeBlock().run()} disabled={editor.isActive('codeBlock')}>
            <Code size={16} />
          </button>
        </div>
           <Label className="flex gap-1 cursor-pointer"><ImagePlus   size={30} className="p-2 rounded "/>
            <Input type="file" accept="image/*" onChange={addImagetoEditor} className="hidden"  />
           </Label>
    </div>
  );
}
