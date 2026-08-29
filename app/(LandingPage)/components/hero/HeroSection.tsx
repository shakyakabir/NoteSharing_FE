"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Coins,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";

import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4235CE]/10 blur-3xl" />

        <div className="absolute left-[-180px] top-[300px] h-[350px] w-[350px] rounded-full bg-purple-100/60 blur-3xl" />

        <div className="absolute right-[-180px] top-[350px] h-[350px] w-[350px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-28">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#4235CE]/10 bg-[#4235CE]/5 px-4 py-2 text-sm font-semibold text-[#4235CE] shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>AI-powered learning, built for students</span>
        </div>

        {/* Main Heading */}
        <Text
          size="7xl"
          weight="bold"
          color="heading"
          as="h1"
          className="max-w-5xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Your notes.
          <br />
          <span className="bg-gradient-to-r from-[#4235CE] via-[#5B4BE7] to-[#7568F0] bg-clip-text text-transparent">
            Your friends. Your AI.
          </span>
        </Text>

        {/* Description */}
        <Text
          size="lg"
          weight="normal"
          color="subHeading"
          as="p"
          className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg"
        >
          Create and share notes with your friends, then turn them into
          summaries, quizzes, presentations, reports and AI-powered answers —
          all from one collaborative learning workspace.
        </Text>

        {/* =====================================================
            CTA
        ===================================================== */}
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/signup">
            <Button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#4235CE] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#4235CE]/20 transition-all hover:-translate-y-0.5 hover:bg-[#362bb5] hover:shadow-xl sm:w-auto">
              Start learning free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/login">
            <Button
              variant="secondary"
              className="w-full rounded-xl px-8 py-3.5 font-semibold sm:w-auto"
            >
              Log in
            </Button>
          </Link>
        </div>

        {/* Trust text */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            Free to get started
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            AI-powered tools
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            Study with friends
          </span>
        </div>

        {/* =========================================================
            PRODUCT PREVIEW
        ========================================================= */}
        <div className="relative mt-16 w-full max-w-6xl sm:mt-20">
          {/* Glow */}
          <div className="absolute left-1/2 top-10 h-64 w-3/4 -translate-x-1/2 rounded-full bg-[#4235CE]/10 blur-3xl" />

          {/* Browser window */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-2xl shadow-gray-300/40 sm:rounded-3xl">
            {/* Browser header */}
            <div className="flex h-11 items-center border-b border-gray-100 bg-gray-50/80 px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              </div>

              <div className="mx-auto hidden rounded-md bg-white px-20 py-1 text-[10px] text-gray-400 shadow-sm sm:block">
                app.notehive.com/dashboard
              </div>
            </div>

            {/* Dashboard */}
            <div className="grid min-h-[430px] grid-cols-1 bg-gray-50 md:grid-cols-[190px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-gray-100 bg-white p-4 md:block">
                <div className="mb-7 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4235CE]">
                    <FileText className="h-4 w-4 text-white" />
                  </div>

                  <span className="text-sm font-bold text-[#4235CE]">
                    NoteHive
                  </span>
                </div>

                <div className="space-y-1">
                  {[
                    "Dashboard",
                    "My Notes",
                    "Study Groups",
                    "AI Tools",
                    "Points Shop",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${
                        index === 0
                          ? "bg-[#4235CE]/10 text-[#4235CE]"
                          : "text-gray-500"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-gray-500">
                      AI Credits
                    </span>

                    <Sparkles className="h-3.5 w-3.5 text-[#4235CE]" />
                  </div>

                  <p className="mt-2 text-lg font-bold">850</p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-[68%] rounded-full bg-[#4235CE]" />
                  </div>
                </div>
              </aside>

              {/* Main dashboard */}
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Good morning 👋
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
                      Your learning workspace
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600">
                      2,450
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>

                    <p className="mt-4 text-xs text-gray-400">My Notes</p>

                    <p className="mt-1 text-xl font-bold">24</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>

                    <p className="mt-4 text-xs text-gray-400">Study Groups</p>

                    <p className="mt-1 text-xl font-bold">6</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                    </div>

                    <p className="mt-4 text-xs text-gray-400">AI Tasks</p>

                    <p className="mt-1 text-xl font-bold">18</p>
                  </div>
                </div>

                {/* Recent notes */}
                <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold">Recent notes</h4>

                    <span className="text-xs font-semibold text-[#4235CE]">
                      View all →
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {[
                      ["Database Management", "AI Summary ready"],
                      ["Operating Systems", "Shared with 8 friends"],
                      ["Software Engineering", "Quiz generated"],
                    ].map(([title, status]) => (
                      <div
                        key={title}
                        className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4235CE]/10">
                            <FileText className="h-4 w-4 text-[#4235CE]" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold">
                              {title}
                            </p>

                            <p className="mt-0.5 text-[10px] text-gray-400">
                              Updated recently
                            </p>
                          </div>
                        </div>

                        <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 sm:block">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI card */}
          <div className="absolute -right-2 bottom-8 hidden w-52 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-xl sm:block lg:-right-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4235CE]/10">
                <Sparkles className="h-4 w-4 text-[#4235CE]" />
              </div>

              <div>
                <p className="text-xs font-bold">AI Assistant</p>
                <p className="text-[10px] text-gray-400">Ready to help</p>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-gray-500">
              Turn this note into a quiz, summary or presentation.
            </p>
          </div>

          {/* Floating points card */}
          <div className="absolute -left-2 top-20 hidden w-48 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-xl sm:block lg:-left-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                <Coins className="h-4 w-4 text-amber-500" />
              </div>

              <div>
                <p className="text-xs font-bold">Points earned!</p>
                <p className="text-[10px] text-gray-400">Quiz completed</p>
              </div>
            </div>

            <p className="mt-3 text-xl font-bold text-amber-500">+120 points</p>
          </div>
        </div>

        {/* =====================================================
            BOTTOM MESSAGE
        ===================================================== */}
        <div className="mt-14 max-w-2xl">
          <p className="text-sm leading-6 text-gray-500">
            From a simple note to a complete learning experience —
            <span className="font-semibold text-gray-700">
              {" "}
              NoteHive helps you create, collaborate, learn and grow.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
