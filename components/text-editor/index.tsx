'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import Menubar from './menu-bar'
import Highlight from '@tiptap/extension-highlight';

interface RichTextEdiorProps{
    content:string;
    onChange:(content:string)=>void;
}
const Tiptap = ({content,onChange}:RichTextEdiorProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
        bulletList:{
            HTMLAttributes:{
            class:"list-disc ml-3"
        }},
         orderedList:{
            HTMLAttributes:{
            class:"list-decimal ml-3"
        }}
    })
        ,Highlight,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    })
    ],
    content: content,
     editorProps:{
        attributes:{
            class:"min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
        },
     },
     onUpdate:({editor})=>{
        onChange(editor.getHTML())
     },
     immediatelyRender:false
    
  })

  return (
    <div>
   <Menubar editor={editor} />
   <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap