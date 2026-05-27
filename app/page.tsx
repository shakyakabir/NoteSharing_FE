import Image from "next/image";
import HeroSection from "./(LandingPage)/components/hero/HeroSection";
import LandingHeader from "./(LandingPage)/components/Nav/Header";
import InfoCard from "./(LandingPage)/components/ui/InfoCard";
import brain from "@/public/brain.svg";
import note from "@/public/note.svg";
import uiSummarized from "@/public/uiSummarized.png";
import demoDashborad from "@/public/demoDashborad.png";
import Text from "./components/ui/Text";

export default function Home() {
  return (
    <div>
      <LandingHeader />
      <HeroSection />
      <div className="flex justify-start  gap-4 ps-20 pe-20">
        <div className="w-4xl">
          <InfoCard
            bgIcon="green"
            heading={"AI Summary"}
            icon={note}
            subHeading={
              "Convert hours of lecture recordings and messy notes into concise, structured summaries. Focus on what actually matters for your exams."
            }
            progress={false}
            links="Learn about AI tools"
            image={uiSummarized}
          />
        </div>
        <div className="w-3xl">
          <InfoCard
            bgIcon="orange"
            heading={"Quiz & earn"}
            icon={brain}
            subHeading={
              "Challenge yourself with auto-generated quizzes and earn tokens for helping your community learn better."
            }
            progress={true}
            // links="Learn about AI tools"
            // image={uiSummarized}
          />
        </div>
      </div>

      <div className="flex justify-start  mt-5 gap-4 ps-20 pe-20">
        <div className="w-sm">
          <InfoCard
            bgIcon="green"
            heading={"Group sharing"}
            icon={note}
            subHeading={
              "Create study pods for your classes.Sync notes, collaborate on studyguides, and succeed together."
            }
            progress={false}
            chainImage={brain}
            // links="Learn about AI tools"
            // image={uiSummarized}
          />
        </div>
        <div className="w-5xl">
          <Image
            src={demoDashborad}
            className="h-64 w-full rounded-xl"
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-evenly mt-16 border-t border-b border-gray-300 pt-16 pb-16">
        <div className="flex flex-col items-center">
          <Text size={"4xl"} weight={"bold"} color={"primary"} as={"h2"}>
            500K +
          </Text>
          <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
            NOTE SHARED
          </Text>
        </div>
        <div className="flex flex-col items-center">
          <Text size={"4xl"} weight={"bold"} color={"primary"} as={"h2"}>
            12K+
          </Text>
          <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
            STUDY GROUPS
          </Text>
        </div>
        <div className="flex flex-col items-center">
          <Text size={"4xl"} weight={"bold"} color={"primary"} as={"h2"}>
            4.9/5
          </Text>
          <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
            STUDENT RATING
          </Text>
        </div>
      </div>
    </div>
  );
}
