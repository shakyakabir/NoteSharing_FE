// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { BulletList, ListItem } from "@tiptap/extension-list";
// import MenuBar from "./menu-bar";
// import TextAlign from "@tiptap/extension-text-align";
// import {
//   TextStyle,
//   FontSize,
//   Color,
//   BackgroundColor,
//   LineHeight,
// } from "@tiptap/extension-text-style";
// import Image from "@tiptap/extension-image";

// export default function TextEditor() {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       BulletList,
//       ListItem,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       FontSize,
//       TextStyle,
//       Color,
//       BackgroundColor,
//       Image.configure({
//         resize: {
//           enabled: true,
//           directions: ["top", "bottom", "left", "right"], // can be any direction or diagonal combination
//           minWidth: 50,
//           minHeight: 50,
//           alwaysPreserveAspectRatio: true,
//         },
//       }),
//       LineHeight,
//       // Highlight,
//       // TextAlign.configure({
//       //   types: ["heading", "paragraph"],
//       // }),
//     ],
//     content: "<p>Start typing...</p>",
//   });

//   return (
//     <div className="border rounded-lg overflow-hidden bg-white">
//       <MenuBar editor={editor} />

//       <EditorContent
//         editor={editor}
//         className="
//           min-h-[400px]
//           p-4

//           [&_.ProseMirror]:outline-none

//           [&_.ProseMirror>*:first-child]:mt-0

//           [&_.ProseMirror_ul]:list-disc
//           [&_.ProseMirror_ul]:pl-6
//           [&_.ProseMirror_ul]:my-5

//           [&_.ProseMirror_ol]:list-decimal
//           [&_.ProseMirror_ol]:pl-6
//           [&_.ProseMirror_ol]:my-5

//           [&_.ProseMirror_li_p]:my-1

//           [&_.ProseMirror_h1]:text-4xl
//           [&_.ProseMirror_h1]:font-bold
//           [&_.ProseMirror_h1]:mt-10
//           [&_.ProseMirror_h1]:mb-6

//           [&_.ProseMirror_h2]:text-3xl
//           [&_.ProseMirror_h2]:font-semibold
//           [&_.ProseMirror_h2]:mt-8
//           [&_.ProseMirror_h2]:mb-5

//           [&_.ProseMirror_h3]:text-2xl
//           [&_.ProseMirror_h3]:font-semibold
//           [&_.ProseMirror_h3]:mt-6
//           [&_.ProseMirror_h3]:mb-4

//           [&_.ProseMirror_h4]:text-xl
//           [&_.ProseMirror_h5]:text-lg
//           [&_.ProseMirror_h6]:text-base

//           [&_.ProseMirror_code]:bg-purple-100
//           [&_.ProseMirror_code]:rounded
//           [&_.ProseMirror_code]:px-1
//           [&_.ProseMirror_code]:py-0.5
//           [&_.ProseMirror_code]:text-sm

//           [&_.ProseMirror_pre]:bg-black
//           [&_.ProseMirror_pre]:text-white
//           [&_.ProseMirror_pre]:rounded-lg
//           [&_.ProseMirror_pre]:p-4
//           [&_.ProseMirror_pre]:my-6

//           [&_.ProseMirror_pre_code]:bg-transparent
//           [&_.ProseMirror_pre_code]:p-0

//           [&_.ProseMirror_mark]:bg-yellow-200
//           [&_.ProseMirror_mark]:rounded
//           [&_.ProseMirror_mark]:px-1

//           [&_.ProseMirror_blockquote]:border-l-4
//           [&_.ProseMirror_blockquote]:border-gray-300
//           [&_.ProseMirror_blockquote]:pl-4
//           [&_.ProseMirror_blockquote]:my-6

//           [&_.ProseMirror_hr]:border-0
//           [&_.ProseMirror_hr]:border-t
//           [&_.ProseMirror_hr]:border-gray-300
//           [&_.ProseMirror_hr]:my-8
//         "
//       />
//     </div>
//   );
// }

"use client";

import { Editor, EditorContent } from "@tiptap/react";

import MenuBar from "./menu-bar";

export default function TextEditor({ editor }: { editor: Editor | null }) {
  // const editor = useEditor({
  // extensions: [
  //   StarterKit,
  //   BulletList,
  //   ListItem,

  //   TextAlign.configure({
  //     types: ["heading", "paragraph"],
  //   }),
  //   FontSize,
  //   TextStyle,
  //   Color,
  //   BackgroundColor,
  //   Image.configure({
  //     inline: true,
  //     allowBase64: true,
  //   }),
  //   LineHeight,
  // ],
  //   content: `<h1>My Digital Note</h1><p>Start writing down your thought streams here...</p>`,
  // });

  return (
    <div className="max-w-4xl mx-auto my-8 border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white transition-all duration-300 focus-within:shadow-md focus-within:border-gray-300">
      {/* Dynamic Interactive Toolbar */}
      <MenuBar editor={editor} />

      {/* Clean Writing Paper Viewport */}
      <div className="bg-white px-8 py-10 sm:px-12 min-h-[500px]">
        <EditorContent
          editor={editor}
          className="
            prose prose-slate max-w-none
            min-h-[450px]
            text-gray-800
            leading-relaxed

            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:font-sans
            [&_.ProseMirror_p]:text-[16px]
            [&_.ProseMirror_p]:leading-7
            [&_.ProseMirror_p]:mb-4

            [&_.ProseMirror>*:first-child]:mt-0

            {/* List Formatting */}
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pl-6
            [&_.ProseMirror_ul]:my-4
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pl-6
            [&_.ProseMirror_ol]:my-4
            [&_.ProseMirror_li]:mb-1
            [&_.ProseMirror_li_p]:my-0.5

            {/* Structured Headings */}
            [&_.ProseMirror_h1]:text-3xl
            [&_.ProseMirror_h1]:font-bold
            [&_.ProseMirror_h1]:text-gray-900
            [&_.ProseMirror_h1]:tracking-tight
            [&_.ProseMirror_h1]:mt-8
            [&_.ProseMirror_h1]:mb-4

            [&_.ProseMirror_h2]:text-2xl
            [&_.ProseMirror_h2]:font-semibold
            [&_.ProseMirror_h2]:text-gray-800
            [&_.ProseMirror_h2]:tracking-tight
            [&_.ProseMirror_h2]:mt-6
            [&_.ProseMirror_h2]:mb-3

            [&_.ProseMirror_h3]:text-xl
            [&_.ProseMirror_h3]:font-medium
            [&_.ProseMirror_h3]:text-gray-800
            [&_.ProseMirror_h3]:mt-5
            [&_.ProseMirror_h3]:mb-2

            {/* Inline Code & Snippets */}
            [&_.ProseMirror_code]:bg-gray-100
            [&_.ProseMirror_code]:text-red-600
            [&_.ProseMirror_code]:rounded-md
            [&_.ProseMirror_code]:px-1.5
            [&_.ProseMirror_code]:py-0.5
            [&_.ProseMirror_code]:text-[14px]
            [&_.ProseMirror_code]:font-mono

            {/* Clean Quotes Block */}
            [&_.ProseMirror_blockquote]:border-l-4
            [&_.ProseMirror_blockquote]:border-blue-500
            [&_.ProseMirror_blockquote]:bg-blue-50/40
            [&_.ProseMirror_blockquote]:pl-4
            [&_.ProseMirror_blockquote]:pr-2
            [&_.ProseMirror_blockquote]:py-2
            [&_.ProseMirror_blockquote]:my-6
            [&_.ProseMirror_blockquote]:rounded-r-md
            [&_.ProseMirror_blockquote_p]:text-gray-700
            [&_.ProseMirror_blockquote_p]:italic

            {/* Responsive Text-Embedded Images */}
            [&_.ProseMirror_img]:rounded-lg
            [&_.ProseMirror_img]:max-w-full
            [&_.ProseMirror_img]:h-auto
            [&_.ProseMirror_img]:my-6
            [&_.ProseMirror_img]:shadow-sm
            [&_.ProseMirror_img]:border
            [&_.ProseMirror_img]:border-gray-100

            {/* Dividers */}
            [&_.ProseMirror_hr]:border-0
            [&_.ProseMirror_hr]:border-t
            [&_.ProseMirror_hr]:border-gray-200
            [&_.ProseMirror_hr]:my-8
          "
        />
      </div>
    </div>
  );
}
