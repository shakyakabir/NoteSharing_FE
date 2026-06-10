// "use client";

// import { Editor, useEditorState } from "@tiptap/react";
// import {
//   Heading1,
//   Heading2,
//   Heading3,
//   Pilcrow,
//   Bold,
//   Italic,
//   Strikethrough,
//   Highlighter,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
// } from "lucide-react";
// import FontSizeDropdown from "./FontSizeDropdown";
// import { useCallback } from "react";

// const MenuBar = ({ editor }: { editor: Editor }) => {
//   if (!editor) return null;

//   const btn =
//     "p-2 rounded border hover:bg-gray-100 transition flex items-center justify-center";

//   const active =
//     "p-2 rounded border bg-blue-500 text-white flex items-center justify-center";
//   const editorState = useEditorState({
//     editor,
//     selector: (ctx) => {
//       return {
//         color: ctx.editor.getAttributes("textStyle").color,
//       };
//     },
//   });

//   const editorBackgroundColorState = useEditorState({
//     editor,
//     selector: (ctx) => {
//       return {
//         color: ctx.editor.getAttributes("textStyle").backgroundColor,
//       };
//     },
//   });

//   const addImage = useCallback(() => {
//     const url = window.prompt("URL");

//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   }, [editor]);

//   const { isLarge, isSmall, isExtraLarge } = useEditorState({
//     editor,
//     selector: (ctx) => {
//       return {
//         isSmall: ctx.editor.isActive("textStyle", { lineHeight: "1.5" }),
//         isLarge: ctx.editor.isActive("textStyle", { lineHeight: "2.0" }),
//         isExtraLarge: ctx.editor.isActive("textStyle", { lineHeight: "4.0" }),
//       };
//     },
//   });

//   return (
//     <div className="flex flex-wrap gap-2 border-b p-3 bg-gray-50">
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={editor.isActive("heading", { level: 1 }) ? active : btn}
//         title="Heading 1"
//       >
//         <Heading1 size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? active : btn}
//         title="Heading 2"
//       >
//         <Heading2 size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? active : btn}
//         title="Heading 3"
//       >
//         <Heading3 size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={editor.isActive("paragraph") ? active : btn}
//         title="Paragraph"
//       >
//         <Pilcrow size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? active : btn}
//         title="Bold"
//       >
//         <Bold size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? active : btn}
//         title="Italic"
//       >
//         <Italic size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? active : btn}
//         title="Strike"
//       >
//         <Strikethrough size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleHighlight().run()}
//         className={editor.isActive("highlight") ? active : btn}
//         title="Highlight"
//       >
//         <Highlighter size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().setTextAlign("left").run()}
//         className={editor.isActive({ textAlign: "left" }) ? active : btn}
//         title="Align Left"
//       >
//         <AlignLeft size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().setTextAlign("center").run()}
//         className={editor.isActive({ textAlign: "center" }) ? active : btn}
//         title="Align Center"
//       >
//         <AlignCenter size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().setTextAlign("right").run()}
//         className={editor.isActive({ textAlign: "right" }) ? active : btn}
//         title="Align Right"
//       >
//         <AlignRight size={18} />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//         className={editor.isActive({ textAlign: "justify" }) ? active : btn}
//         title="Justify"
//       >
//         <AlignJustify size={18} />
//       </button>

//       <input
//         type="color"
//         onInput={(event) =>
//           editor.chain().focus().setColor(event.currentTarget.value).run()
//         }
//         value={editorState.color}
//         data-testid="setColor"
//       />
//       <div className="button-group">
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "is-active" : ""}
//         >
//           Toggle bullet list
//         </button>
//         <button
//           onClick={() => editor.chain().focus().splitListItem("listItem").run()}
//           disabled={!editor.can().splitListItem("listItem")}
//         >
//           Split list item
//         </button>
//         <button
//           onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
//           disabled={!editor.can().sinkListItem("listItem")}
//         >
//           Sink list item
//         </button>
//         <button
//           onClick={() => editor.chain().focus().liftListItem("listItem").run()}
//           disabled={!editor.can().liftListItem("listItem")}
//         >
//           Lift list item
//         </button>
//       </div>
//       <FontSizeDropdown editor={editor} />

//       <input
//         type="color"
//         onInput={(event) =>
//           editor
//             .chain()
//             .focus()
//             .setBackgroundColor(event.currentTarget.value)
//             .run()
//         }
//         value={editorBackgroundColorState.color}
//         data-testid="setBackgroundColor"
//       />
//       <button onClick={addImage}>Set image</button>

//       <div className="button-group">
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleTextStyle({ lineHeight: "1.5" }).run()
//           }
//           className={isSmall ? "is-active" : ""}
//           data-test-id="1.5"
//         >
//           Line height 1.5
//         </button>
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleTextStyle({ lineHeight: "2.0" }).run()
//           }
//           className={isLarge ? "is-active" : ""}
//           data-test-id="2.0"
//         >
//           Line height 2.0
//         </button>
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleTextStyle({ lineHeight: "4.0" }).run()
//           }
//           className={isExtraLarge ? "is-active" : ""}
//           data-test-id="4.0"
//         >
//           Line height 4.0
//         </button>
//         <button
//           onClick={() => editor.chain().focus().unsetLineHeight().run()}
//           data-test-id="unsetLineHeight"
//         >
//           Unset line height
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuBar;

"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ChevronDown,
  Type,
  Paintbrush,
  Image as ImageIcon,
} from "lucide-react";
import { useCallback } from "react";
import FontSizeDropdown from "./FontSizeDropdown";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  // Guard clause at the very top to safely handle uninitialized editors
  if (!editor) return null;

  const btnClass =
    "p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-all duration-150 flex items-center justify-center";
  const activeClass =
    "p-2 rounded-md bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-medium";

  // State selectors
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor.getAttributes("textStyle").color || "#000000",
    }),
  });

  const editorBackgroundColorState = useEditorState({
    editor,
    selector: (ctx) => ({
      backgroundColor:
        ctx.editor.getAttributes("textStyle").backgroundColor || "#ffffff",
    }),
  });

  const { isSmall, isLarge, isExtraLarge } = useEditorState({
    editor,
    selector: (ctx) => ({
      isSmall: ctx.editor.isActive("textStyle", { lineHeight: "1.5" }),
      isLarge: ctx.editor.isActive("textStyle", { lineHeight: "2.0" }),
      isExtraLarge: ctx.editor.isActive("textStyle", { lineHeight: "4.0" }),
    }),
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Enter Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-200 p-2 bg-gray-50/70 backdrop-blur-md sticky top-0 z-10">
      {/* Headings & Paragraph */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? activeClass : btnClass
        }
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? activeClass : btnClass
        }
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? activeClass : btnClass
        }
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? activeClass : btnClass}
        title="Paragraph"
      >
        <Pilcrow size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Inline Text Styles */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? activeClass : btnClass}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? activeClass : btnClass}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? activeClass : btnClass}
        title="Strike"
      >
        <Strikethrough size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? activeClass : btnClass}
        title="Highlight"
      >
        <Highlighter size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Text Alignments */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? activeClass : btnClass
        }
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? activeClass : btnClass
        }
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? activeClass : btnClass
        }
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? activeClass : btnClass
        }
        title="Justify"
      >
        <AlignJustify size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Lists Management */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? activeClass : btnClass}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <div className="flex items-center gap-0.5 border border-gray-200 rounded-md p-0.5 bg-white">
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
          className="px-1.5 py-1 text-xs font-medium rounded hover:bg-gray-100 disabled:opacity-40 text-gray-600"
          title="Outdent list"
        >
          Lift
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
          className="px-1.5 py-1 text-xs font-medium rounded hover:bg-gray-100 disabled:opacity-40 text-gray-600"
          title="Indent list"
        >
          Sink
        </button>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Font Configuration Drops */}
      <FontSizeDropdown editor={editor} />

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Styled Color Pickers */}
      <div className="flex items-center gap-3 px-2">
        <label
          className="relative flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-900"
          title="Text Color"
        >
          <Type size={18} />
          <input
            type="color"
            onInput={(e) =>
              editor.chain().focus().setColor(e.currentTarget.value).run()
            }
            value={editorState.color}
            className="absolute opacity-0 w-4 h-4 cursor-pointer"
          />
        </label>

        <label
          className="relative flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-900"
          title="Background Color"
        >
          <Paintbrush size={18} />
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setBackgroundColor(e.currentTarget.value)
                .run()
            }
            value={editorBackgroundColorState.backgroundColor}
            className="absolute opacity-0 w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Extra Tools: Image & Line Heights */}
      <button onClick={addImage} className={btnClass} title="Insert Image">
        <ImageIcon size={18} />
      </button>

      {/* Line Height Mini Group */}
      <div className="relative group flex items-center border border-gray-200 rounded-md bg-white px-2 py-1 text-xs text-gray-600 cursor-pointer gap-1">
        <span>Line Height</span>
        <ChevronDown size={12} />
        <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-md shadow-lg top-full left-0 mt-1 w-32 overflow-hidden z-20">
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleTextStyle({ lineHeight: "1.5" })
                .run()
            }
            className={`px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${isSmall ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
          >
            Height 1.5
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleTextStyle({ lineHeight: "2.0" })
                .run()
            }
            className={`px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${isLarge ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
          >
            Height 2.0
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleTextStyle({ lineHeight: "4.0" })
                .run()
            }
            className={`px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${isExtraLarge ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
          >
            Height 4.0
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLineHeight().run()}
            className="px-3 py-1.5 text-left text-xs text-red-500 hover:bg-red-50 border-t border-gray-100"
          >
            Reset Height
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
