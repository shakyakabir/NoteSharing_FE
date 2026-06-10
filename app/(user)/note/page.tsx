"use client";

import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import Tiptap from "@/components/rich-text-editor/Tiptap";
import { Table } from "@/components/Table/Table";
import { useGetNotesQuery, usePostNotesMutation } from "@/slices/Note";
import CreateNote from "./components/modal/CreateNote";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string;
  visibility: string;
  updatedAt: string;
}
export default function NotePage() {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const { data: notes, isLoading } = useGetNotesQuery();
  const [postNotes, { isLoading: isPosting }] = usePostNotesMutation();

  console.log("Fetched Notes:", notes);
  const handleCreateNote = () => {
    setIsCreateNoteOpen(true);
  };

  const handleCreateNoteSubmit = async (formData: {
    title: string;
    content: string;
    visibility: string;
  }) => {
    const res = await postNotes(formData);
    console.log("Note Created:", res);
  };
  console.log("Is Loading Notes:");

  const routes = useRouter();
  const handleDetailNote = (id: string) => {
    routes.push(`/note/${id}`);
  };

  return (
    <div className="container px-4 py-8 ">
      {notes?.length === 0 && !isLoading ? (
        <div className="mb-8 flex flex-col gap-4 h-96 items-center justify-center">
          <Text size={"xl"} weight={"bold"} color={"heading"} as={"h1"}>
            Note
          </Text>
          <Text size={"xl"} weight={"bold"} color={"heading"} as={"h1"}>
            Ready to capture your thoughts?
          </Text>
          <Text
            size={"md"}
            weight={"normal"}
            className="w-96 text-center"
            color={"subHeading"}
            as={"p"}
          >
            Start a new note to organize your studies, research, or creative
            ideas in one place.
          </Text>
          <Button variant={"primary"} size={"base"} onClick={handleCreateNote}>
            Create New Note
          </Button>
        </div>
      ) : (
        <Table
          columns={[
            { header: "Note Title", accessor: "title" },
            { header: "Last Updated", accessor: "lastUpdated" },
            { header: "Visibility", accessor: "visibility" },
            { header: "Actions", accessor: "actions" },
          ]}
          data={
            notes?.map((note: Note) => ({
              id: note.id,
              title: note.title,

              lastUpdated: new Date(note.updatedAt).toLocaleDateString(),
              visibility: note.visibility,
              actions: <EllipsisVertical />, // Placeholder for action buttons
            })) || []
          }
          keyExtractor={(row) => row.title}
          rowOnClick={(row) => handleDetailNote(row?.id)}
        />
      )}
      <CreateNote
        isOpen={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
        onSubmit={handleCreateNoteSubmit}
      />
    </div>
  );
}
