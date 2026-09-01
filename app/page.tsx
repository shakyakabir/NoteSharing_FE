import Image from "next/image";

import HeroSection from "./(LandingPage)/components/hero/HeroSection";
import LandingHeader from "./(LandingPage)/components/Nav/Header";
import InfoCard from "./(LandingPage)/components/ui/InfoCard";
import Text from "./components/ui/Text";

import brain from "@/public/brain.svg";
import note from "@/public/note.svg";
import uiSummarized from "@/public/uiSummarized.png";
import demoDashborad from "@/public/demoDashborad.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/60 text-gray-900">
      <LandingHeader />

      {/* =========================================================
          HERO
      ========================================================= */}
      <HeroSection />

      {/* =========================================================
          TRUST / INTRO
      ========================================================= */}
      <section className="border-y border-gray-200 bg-white py-8" id="rewards">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-gray-500">
            Create better notes
          </p>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <p className="text-sm font-medium text-gray-500">Learn with AI</p>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <p className="text-sm font-medium text-gray-500">
            Study with friends
          </p>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <p className="text-sm font-medium text-gray-500">
            Earn & unlock more
          </p>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="py-24" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-[#4235CE]/10 px-4 py-2 text-sm font-semibold text-[#4235CE]">
              How it works
            </span>

            <Text
              size="4xl"
              weight="bold"
              color="heading"
              as="h2"
              className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              One place for everything you need to learn
            </Text>

            <Text
              size="md"
              weight="normal"
              color="subHeading"
              as="p"
              className="mt-5 text-lg leading-8 text-gray-600"
            >
              Turn your notes into an interactive learning experience with your
              friends and AI.
            </Text>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Create Notes",
                text: "Write your own notes or upload documents and study material.",
              },
              {
                number: "02",
                title: "Share",
                text: "Share notes with friends or organize them inside study groups.",
              },
              {
                number: "03",
                title: "Use AI",
                text: "Generate summaries, quizzes, slides, reports and more.",
              },
              {
                number: "04",
                title: "Earn & Grow",
                text: "Earn points, redeem rewards and get more AI credits.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-bold text-[#4235CE]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Everything in one workspace
            </span>

            <Text
              size="4xl"
              weight="bold"
              color="heading"
              as="h2"
              className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Your notes are just the beginning.
            </Text>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Write, organize, share and transform your study material without
              switching between different apps.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <InfoCard
                  heading="AI Summary"
                  subHeading="Turn long notes, lecture material and uploaded documents into concise, structured summaries. Understand the important parts faster and spend more time learning."
                  icon={note}
                  bgIcon="green"
                  badge="AI Powered"
                  badgeColor="green"
                  links="Explore AI tools"
                  image={uiSummarized}
                />
              </div>

              <div className="lg:col-span-5">
                <InfoCard
                  heading="AI Quiz"
                  subHeading="Transform your notes into interactive quizzes. Test your understanding, discover weak areas and make studying more engaging."
                  icon={brain}
                  bgIcon="orange"
                  badge="Learn & Earn"
                  badgeColor="orange"
                  progress
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <InfoCard
                  heading="Study Together"
                  subHeading="Create study groups, invite friends and share notes in one collaborative space. Everyone can learn from the same material."
                  icon={note}
                  bgIcon="blue"
                  badge="Collaborate"
                  badgeColor="blue"
                  chainImage={brain}
                />
              </div>

              <div className="lg:col-span-7">
                <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className="absolute left-7 top-7 z-10 max-w-sm">
                    <span className="rounded-full bg-[#4235CE]/10 px-3 py-1.5 text-xs font-semibold text-[#4235CE]">
                      Your workspace
                    </span>

                    <h3 className="mt-4 text-2xl font-bold">
                      Everything you need in one dashboard
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Manage notes, groups, AI tools, points and credits from
                      one simple workspace.
                    </p>
                  </div>

                  <Image
                    src={demoDashborad}
                    alt="AI note sharing dashboard"
                    fill
                    className="object-cover object-bottom pt-44"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AI TOOLKIT
      ========================================================= */}
      <section className="py-24" id="ai-tools">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              AI Toolkit
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Turn one note into many ways to learn
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Your notes become the starting point for AI-powered learning
              experiences.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: "✦",
                title: "Summarize",
                text: "Get the key ideas instantly.",
              },
              {
                icon: "✓",
                title: "Create Quiz",
                text: "Test yourself automatically.",
              },
              {
                icon: "▣",
                title: "Generate Slides",
                text: "Turn notes into presentations.",
              },
              {
                icon: "☷",
                title: "Generate Report",
                text: "Create structured reports.",
              },
              {
                icon: "⌕",
                title: "Ask AI",
                text: "Ask questions about your notes.",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#4235CE]/30 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4235CE]/10 text-xl text-[#4235CE]">
                  {tool.icon}
                </div>

                <h3 className="mt-5 font-bold">{tool.title}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {tool.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          COLLABORATION
      ========================================================= */}
      <section className="overflow-hidden bg-[#4235CE] py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              Learn together
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Your friends can learn from the same notes.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Create a group for your class, project or exam preparation. Share
              notes, discuss material and use AI together to turn your shared
              knowledge into better learning resources.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Shared notes",
                "Study groups",
                "AI collaboration",
                "Easy sharing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/10 p-8">
            <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Study Group
                  </p>
                  <h3 className="mt-1 text-xl font-bold">Computer Science</h3>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  12 members
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Database Management Notes",
                  "Operating Systems Summary",
                  "Networking Quiz",
                  "Software Engineering Slides",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <span className="text-xs text-[#4235CE]">AI →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          POINTS + CREDITS
      ========================================================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Points */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                Earn Points
              </span>

              <h2 className="mt-6 text-3xl font-bold">
                Learn, contribute and earn.
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Your activity can help you earn points. Complete quizzes,
                participate in the learning community and use your points in the
                shop.
              </p>

              <div className="mt-8 rounded-2xl bg-amber-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Available Points
                  </span>

                  <span className="text-2xl font-bold text-amber-600">
                    2,450
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-gray-500">Quiz rewards</p>
                    <p className="mt-1 font-bold">+500</p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-gray-500">Community</p>
                    <p className="mt-1 font-bold">+250</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="rounded-3xl bg-gray-950 p-8 text-white shadow-sm sm:p-10">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                AI Credits
              </span>

              <h2 className="mt-6 text-3xl font-bold">
                Use AI when you need it.
              </h2>

              <p className="mt-4 leading-7 text-white/60">
                AI tools use credits. Get credits through your plan, rewards or
                the points shop and spend them on the AI features that matter
                most to you.
              </p>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">AI Credits</span>
                  <span className="text-2xl font-bold">850</span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-white" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Summary", "Quiz", "Slides", "Report", "AI Q&A"].map(
                    (tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs"
                      >
                        {tool}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="border-y border-gray-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["500K+", "Notes Shared"],
              ["12K+", "Study Groups"],
              ["4.9/5", "Student Rating"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="flex flex-col items-center px-6 py-6 text-center"
              >
                <Text
                  size="4xl"
                  weight="bold"
                  color="primary"
                  as="h2"
                  className="text-4xl font-bold"
                >
                  {number}
                </Text>

                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#4235CE] px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            Start learning smarter
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Your notes deserve more than just a folder.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Create notes, share them with friends, turn them into AI-powered
            learning material and earn rewards along the way.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-xl bg-white px-7 py-3.5 font-bold text-[#4235CE] transition hover:bg-gray-100">
              Start Learning Free
            </button>

            <button className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/20">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-[#4235CE]">
              AI Note Sharing
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Notes, friends and AI — all in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-[#4235CE]">
              Features
            </a>

            <a href="/subscription" className="hover:text-[#4235CE]">
              Pricing
            </a>

            <a href="/login" className="hover:text-[#4235CE]">
              Login
            </a>

            <a href="/signup" className="hover:text-[#4235CE]">
              Get Started
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
