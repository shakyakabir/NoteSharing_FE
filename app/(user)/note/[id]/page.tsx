"use client";

import Tiptap from "@/components/rich-text-editor/Tiptap";
import { useGetNotesIDQuery, useUpdateNotesMutation } from "@/slices/Note";
import { useEditor } from "@tiptap/react";
import { useParams } from "next/navigation";
import TextAlign from "@tiptap/extension-text-align";

import {
  TextStyle,
  FontSize,
  Color,
  BackgroundColor,
  LineHeight,
} from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { BulletList, ListItem } from "@tiptap/extension-list";
import { useEffect } from "react";

export default function DetailNote() {
  const params = useParams();
  const getid = params.id;
  const { data: note } = useGetNotesIDQuery(getid ?? "");
  const [updateNotes] = useUpdateNotesMutation();

  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      ListItem,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSize,
      TextStyle,
      Color,
      BackgroundColor,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      LineHeight,
    ],
    content: note?.content || "",
  });
  console.log(note?.content, "this");
  useEffect(() => {
    if (editor && note?.content) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note]);
  const handleUpdate = () => {
    const content = editor.getHTML();
    updateNotes({
      id: getid, // from URL params
      noteData: {
        content: content,
      },
    });
  };

  return (
    <div>
      <h1>Note Page</h1>
      <Tiptap editor={editor} />

      <button onClick={handleUpdate}>update</button>
    </div>
  );
}
