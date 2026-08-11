"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  TextStyle,
  FontSize,
  Color,
  BackgroundColor,
  LineHeight,
} from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import {
  ArrowLeft,
  Globe,
  MoreHorizontal,
  Sparkles,
  FileText,
  HelpCircle,
  CheckSquare,
  Send,
  Save,
  Loader2,
  Check,
  PanelRightClose,
  PanelRightOpen,
  Lock,
} from "lucide-react";

import Tiptap from "@/components/rich-text-editor/Tiptap";
import Button from "@/app/components/ui/Button";
import { useGetNotesIDQuery, useUpdateNotesMutation } from "@/slices/Note";

export default function DetailNote() {
  const params = useParams();
  const router = useRouter();
  const noteId = (params?.id as string) || "";

  const { data: note, isLoading } = useGetNotesIDQuery(noteId, {
    skip: !noteId,
  });
  const [updateNotes, { isLoading: isUpdating }] = useUpdateNotesMutation();

  const [title, setTitle] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // TipTap Editor Initialization
  const editor = useEditor({
    extensions: [
      StarterKit,
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
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[500px] text-slate-800 leading-relaxed",
      },
    },
    onUpdate: () => {
      setHasUnsavedChanges(true);
    },
  });

  // Sync state safely when note loads
  useEffect(() => {
    if (note) {
      setTitle(note.title || "Untitled Note");
      if (editor && !editor.isFocused && note.content !== editor.getHTML()) {
        editor.commands.setContent(note.content || "");
      }
    }
  }, [note, editor]);

  // Save / Update Handler
  const handleUpdate = useCallback(async () => {
    if (!editor || !noteId) return;

    const content = editor.getHTML();
    try {
      await updateNotes({
        id: noteId,
        noteData: {
          title,
          content,
        },
      }).unwrap();
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }, [editor, noteId, title, updateNotes]);

  // Cmd/Ctrl + S Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleUpdate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUpdate]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    // Process chat prompt here
    setChatMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50/50">
        <Loader2 className="animate-spin text-indigo-600 mb-3" size={32} />
        <span className="text-sm font-medium text-slate-600 animate-pulse">
          Loading document workspace...
        </span>
      </div>
    );
  }

  const isPublic =
    note?.visibility?.toLowerCase() === "public" || !note?.visibility;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-100/60 overflow-hidden -m-4 md:-m-8">
      {/* ================= MAIN DOCUMENT AREA ================= */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/note")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-200" />

            {/* Visibility Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isPublic
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {isPublic ? <Globe size={12} /> : <Lock size={12} />}
              <span className="capitalize">{note?.visibility || "Public"}</span>
            </div>

            {/* Dynamic Status Tag */}
            {hasUnsavedChanges && (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                Unsaved changes
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Save Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleUpdate}
              disabled={isUpdating || !hasUnsavedChanges}
              className={`inline-flex items-center gap-1.5 font-medium text-xs px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                hasUnsavedChanges
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-400 border border-slate-200"
              }`}
            >
              {isUpdating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : hasUnsavedChanges ? (
                <Save size={14} />
              ) : (
                <Check size={14} className="text-emerald-600" />
              )}
              <span>
                {isUpdating
                  ? "Saving..."
                  : hasUnsavedChanges
                    ? "Save changes"
                    : "Saved"}
              </span>
            </Button>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title={
                isSidebarOpen ? "Collapse AI Assistant" : "Open AI Assistant"
              }
            >
              {isSidebarOpen ? (
                <PanelRightClose size={18} />
              ) : (
                <PanelRightOpen size={18} />
              )}
            </button>

            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>

        {/* Editor Body Workspace */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="max-w-3xl w-full mx-auto space-y-6">
            {/* Document Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasUnsavedChanges(true);
              }}
              placeholder="Untitled Note"
              className="w-full text-3xl md:text-4xl font-bold text-slate-900 border-none outline-none focus:ring-0 bg-transparent tracking-tight placeholder:text-slate-300"
            />

            {/* Document Sheet Surface */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 md:p-12 transition-all">
              <Tiptap editor={editor} />
            </div>
          </div>
        </main>
      </div>

      {/* ================= AI ASSISTANT SIDEBAR ================= */}
      {isSidebarOpen && (
        <aside className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shrink-0 shadow-lg md:shadow-none transition-all duration-300">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <div className="p-1 bg-indigo-50 rounded-md">
                <Sparkles size={16} className="text-indigo-600" />
              </div>
              <span>AI Copilot</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <PanelRightClose size={16} />
            </button>
          </div>

          {/* Quick Actions List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-1">
              Document Tools
            </span>

            {/* Action 1: Summarize */}
            <button className="w-full text-left p-3 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                  <FileText size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900">
                    Summarize Document
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                    Condense main ideas into key bullet points.
                  </p>
                </div>
              </div>
            </button>

            {/* Action 2: Generate Quiz */}
            <button className="w-full text-left p-3 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                  <HelpCircle size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900">
                    Generate Quiz
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                    Create practice questions to test your knowledge.
                  </p>
                </div>
              </div>
            </button>

            {/* Action 3: Action Items */}
            <button className="w-full text-left p-3 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                  <CheckSquare size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900">
                    Extract Action Items
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                    Automatically convert notes into actionable tasks.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Contextual Assistant Chat Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2.5">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Document Assistant
            </span>

            <div className="relative">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask something about this note..."
                className="w-full pl-3 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 disabled:hover:text-slate-400 transition-colors p-1"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
