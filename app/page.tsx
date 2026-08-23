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
    <div className="min-h-screen bg-slate-50/50">
      <LandingHeader />
      <HeroSection />

      {/* Main Feature Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {/* Row 1: 7-5 Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex">
            <InfoCard
              bgIcon="green"
              heading="AI Summary"
              icon={note}
              subHeading="Convert hours of lecture recordings and messy notes into concise, structured summaries. Focus on what actually matters for your exams."
              progress={false}
              links="Learn about AI tools"
              image={uiSummarized}
            />
          </div>
          <div className="lg:col-span-5 flex">
            <InfoCard
              bgIcon="orange"
              heading="Quiz & Earn"
              icon={brain}
              subHeading="Challenge yourself with auto-generated quizzes and earn tokens for helping your community learn better."
              progress={true}
            />
          </div>
        </div>

        {/* Row 2: 5-7 Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex">
            <InfoCard
              bgIcon="green"
              heading="Group Sharing"
              icon={note}
              subHeading="Create study pods for your classes. Sync notes, collaborate on study guides, and succeed together."
              progress={false}
              chainImage={brain}
            />
          </div>
          <div className="lg:col-span-7 relative min-h-[320px] overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all hover:shadow-md">
            <Image
              src={demoDashborad}
              alt="Dashboard Preview"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="border-y border-gray-200 bg-white py-16 my-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <Text size="4xl" weight="bold" color="primary" as="h2">
                500K+
              </Text>
              <Text
                size="sm"
                weight="medium"
                color="subHeading"
                as="p"
                className="mt-1 tracking-wider uppercase"
              >
                Notes Shared
              </Text>
            </div>

            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <Text size="4xl" weight="bold" color="primary" as="h2">
                12K+
              </Text>
              <Text
                size="sm"
                weight="medium"
                color="subHeading"
                as="p"
                className="mt-1 tracking-wider uppercase"
              >
                Study Groups
              </Text>
            </div>

            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <Text size="4xl" weight="bold" color="primary" as="h2">
                4.9/5
              </Text>
              <Text
                size="sm"
                weight="medium"
                color="subHeading"
                as="p"
                className="mt-1 tracking-wider uppercase"
              >
                Student Rating
              </Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
