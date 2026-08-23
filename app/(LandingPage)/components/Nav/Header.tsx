import Link from "next/link";
import Text from "@/app/components/ui/Text";
import Button from "@/app/components/ui/Button";

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Text size="lg" weight="bold" color="primary" as="h2">
            NoteShare
          </Text>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="hover:text-teal-600 transition-colors">
            <Text size="md" weight="medium" color="primary" as="span">
              Home
            </Text>
          </Link>
          <Link href="#" className="hover:text-teal-600 transition-colors">
            <Text size="md" weight="medium" color="subHeading" as="span">
              Community
            </Text>
          </Link>
          <Link href="#" className="hover:text-teal-600 transition-colors">
            <Text size="md" weight="medium" color="subHeading" as="span">
              AI Assistant
            </Text>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Text
              size="md"
              weight="semibold"
              color="primary"
              as="span"
              className="px-3 py-2 hover:opacity-80"
            >
              Log in
            </Text>
          </Link>
          <Button className="hidden sm:inline-flex">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
