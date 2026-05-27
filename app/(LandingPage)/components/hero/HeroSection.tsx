import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] px-4 text-center">
      {/* Heading */}
      <Text
        size="7xl"
        weight="bold"
        color="heading"
        as="h1"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Share note
      </Text>

      <Text
        size="7xl"
        weight="bold"
        color="primary"
        as="h2"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
      >
        Learn smarter with AI
      </Text>

      {/* Description */}
      <Text
        size="lg"
        weight="normal"
        color="subHeading"
        as="p"
        className="w-full sm:w-3/4 md:w-2/3 lg:w-[50%] mt-5 sm:mt-6 md:mt-7 mb-6 sm:mb-7"
      >
        The collaborative study platform that transforms your class notes into
        interactive quizzes, summaries, and shared knowledge bases instantly.
      </Text>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
        <Button className="w-full sm:w-auto">Sign up free</Button>
        <Button variant="secondary" className="w-full sm:w-auto">
          Log in
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
