"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  FileText,
  MoreVertical,
  Globe,
  Lock,
  Users,
  Sparkles,
} from "lucide-react";

import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import { Table } from "@/components/Table/Table";
import { useGetNotesQuery, usePostNotesMutation } from "@/slices/Note";
import CreateNote from "./components/modal/CreateNote";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  visibility: "PUBLIC" | "PRIVATE" | "SHARED" | string;
  updatedAt: string;
}

export default function NotePage() {
  const router = useRouter();
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notes = [], isLoading } = useGetNotesQuery();
  const [postNotes, { isLoading: isPosting }] = usePostNotesMutation();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const handleCreateNoteSubmit = async (formData: {
    title: string;
    content: string;
    visibility: string;
  }) => {
    try {
      await postNotes(formData).unwrap();
      setIsCreateNoteOpen(false);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleDetailNote = (id: string) => {
    router.push(`/note/${id}`);
  };

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    return notes.filter((note: Note) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [notes, searchQuery]);

  // Render badge helper for visibility status
  const renderVisibilityBadge = (visibility: string) => {
    const status = visibility?.toUpperCase();
    switch (status) {
      case "PUBLIC":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Globe size={12} />
            Public
          </span>
        );
      case "SHARED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Users size={12} />
            Shared
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Lock size={12} />
            Private
          </span>
        );
    }
  };

  const handleCreateNote = () => {
    if (profile?.subscriptionTier !== "PREMIUM" && notes.length > 8) {
      setIsCreateNoteOpen(false);
      toast.error("Normal user can only create 8 note");
    } else {
      setIsCreateNoteOpen(true);
    }
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <Text
            size="xl"
            weight="bold"
            color="heading"
            as="h1"
            className="text-2xl text-slate-900 tracking-tight"
          >
            My Notes
          </Text>
          <Text
            size="sm"
            color="subHeading"
            as="p"
            className="text-slate-500 mt-1"
            weight={"bold"}
          >
            Organize, study, and manage all your notes in one place.
          </Text>
        </div>

        {notes.length > 0 && (
          <Button
            variant="primary"
            size="base"
            onClick={handleCreateNote}
            className="inline-flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all"
          >
            <Plus size={18} />
            <span>New Note</span>
          </Button>
        )}
      </div>

      {/* --- LOADING SKELETON STATE --- */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-10 bg-slate-100 animate-pulse rounded-xl w-full max-w-sm" />
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-2xs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-slate-50 animate-pulse rounded-lg w-full"
              />
            ))}
          </div>
        </div>
      ) : notes.length === 0 ? (
        /* --- EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center min-h-[420px] rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/50 p-8 text-center">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-2xs">
            <FileText size={32} />
          </div>
          <Text
            size="lg"
            weight="bold"
            color="heading"
            as="h2"
            className="text-slate-900"
          >
            Ready to capture your thoughts?
          </Text>
          <Text
            size="md"
            weight="normal"
            color="subHeading"
            as="p"
            className="max-w-md text-slate-500 mt-2 mb-6"
          >
            Start a new note to organize your study guides, research, or
            creative ideas in one structured workspace.
          </Text>
          <Button
            variant="primary"
            size="base"
            onClick={() => setIsCreateNoteOpen(true)}
            className="inline-flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} />
            <span>Create New Note</span>
          </Button>
        </div>
      ) : (
        /* --- DATA TABLE & SEARCH --- */
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search notes by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <Table
              columns={[
                {
                  header: "Note Title",
                  accessor: "title",
                },
                { header: "Last Updated", accessor: "lastUpdated" },
                { header: "Visibility", accessor: "visibility" },
                { header: "", accessor: "actions" },
              ]}
              data={filteredNotes.map((note: Note) => ({
                id: note.id,
                title: (
                  <div className="flex items-center space-x-3 py-1">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                      <FileText size={16} />
                    </div>
                    <span className="font-semibold text-slate-900 line-clamp-1">
                      {note.title || "Untitled Note"}
                    </span>
                  </div>
                ),
                lastUpdated: (
                  <span className="text-slate-500 text-xs">
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ),
                visibility: renderVisibilityBadge(note.visibility),
                actions: (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents row click navigation when clicking action menu
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Note options"
                  >
                    <MoreVertical size={16} />
                  </button>
                ),
              }))}
              keyExtractor={(row) => row.id}
              rowOnClick={(row) => handleDetailNote(row.id)}
            />
          </div>
        </div>
      )}

      {/* --- CREATE NOTE MODAL --- */}
      <CreateNote
        isOpen={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
        onSubmit={handleCreateNoteSubmit}
      />
    </div>
  );
}
