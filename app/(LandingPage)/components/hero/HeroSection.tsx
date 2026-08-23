import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";

const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center items-center py-20 sm:py-28 px-4 text-center mx-auto max-w-5xl">
      <Text
        size="7xl"
        weight="bold"
        color="heading"
        as="h1"
        className="text-4xl sm:text-6xl lg:text-7xl tracking-tight"
      >
        Share notes.
      </Text>

      <Text
        size="7xl"
        weight="bold"
        color="primary"
        as="h2"
        className="text-3xl sm:text-5xl lg:text-7xl text-teal-600 tracking-tight mt-1"
      >
        Learn smarter with AI
      </Text>

      <Text
        size="lg"
        weight="normal"
        color="subHeading"
        as="p"
        className="max-w-2xl mt-6 mb-8 text-base sm:text-lg text-gray-600 leading-relaxed"
      >
        The collaborative study platform that transforms your class notes into
        interactive quizzes, summaries, and shared knowledge bases instantly.
      </Text>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button className="w-full sm:w-auto px-8 py-3">Sign up free</Button>
        <Button variant="secondary" className="w-full sm:w-auto px-8 py-3">
          Log in
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
