import Text from "@/app/components/ui/Text";

const LandingHeader = () => {
  return (
    <div className="flex justify-between ps-20 pe-20 pt-5 pb-5 bg-[#fff] border-b-1 border-gray-300  ">
      <div>
        <Text size={"lg"} weight={"bold"} color={"primary"} as={"h2"}>
          NoteShare
        </Text>
      </div>
      <div className="flex gap-7">
        <Text size={"md"} weight={"medium"} color={"primary"} as={"h2"}>
          Home
        </Text>
        <Text size={"md"} weight={"medium"} color={"subHeading"} as={"p"}>
          Community
        </Text>
        <Text size={"md"} weight={"medium"} color={"subHeading"} as={"p"}>
          Ai Assistant
        </Text>
      </div>
      <>
        <Text size={"lg"} weight={"bold"} color={"primary"} as={"h2"}>
          login
        </Text>
      </>
    </div>
  );
};
export default LandingHeader;
