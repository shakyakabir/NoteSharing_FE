import Text from "@/app/components/ui/Text";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const bgVariants: Record<string, string> = {
  primary: "bg-[#4235CE]/10 text-[#4235CE]",
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
};

interface InfoProps {
  heading: string;
  subHeading: string;
  links?: string;
  progress?: boolean;
  image?: string | StaticImageData;
  chainImage?: string | StaticImageData;
  icon?: string | StaticImageData;
  bgIcon?: "primary" | "green" | "orange" | "blue" | "purple";
  badge?: string;
  badgeColor?: "primary" | "green" | "orange" | "blue" | "purple";
  className?: string;
}

const InfoCard = ({
  heading,
  subHeading,
  links,
  bgIcon = "primary",
  chainImage,
  image,
  progress,
  icon,
  badge,
  badgeColor = "primary",
  className = "",
}: InfoProps) => {
  return (
    <div
      className={`group relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#4235CE]/5 blur-3xl transition-all duration-500 group-hover:bg-[#4235CE]/10" />

      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between">
          {icon && (
            <div
              className={`${bgVariants[bgIcon]} inline-flex rounded-2xl p-3.5`}
            >
              <Image
                src={icon}
                alt={`${heading} icon`}
                width={26}
                height={26}
                className="h-6 w-6"
              />
            </div>
          )}

          {badge && (
            <span
              className={`${bgVariants[badgeColor]} rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {badge}
            </span>
          )}
        </div>

        <div>
          <Text
            size="lg"
            weight="bold"
            color="heading"
            as="h3"
            className="text-2xl font-bold tracking-tight"
          >
            {heading}
          </Text>

          <Text
            size="md"
            weight="normal"
            color="subHeading"
            as="p"
            className="mt-3 leading-7 text-gray-600"
          >
            {subHeading}
          </Text>
        </div>

        {links && (
          <Link
            href="#features"
            className="inline-flex items-center gap-2 font-semibold text-[#4235CE] transition-all hover:gap-3"
          >
            {links}
            <span>→</span>
          </Link>
        )}
      </div>

      {progress && (
        <div className="relative z-10 mt-8 rounded-2xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Weekly AI Goal
            </span>
            <span className="text-sm font-bold text-[#4235CE]">80%</span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[80%] rounded-full bg-[#4235CE]" />
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>4 AI tasks completed</span>
            <span>1,200 points</span>
          </div>
        </div>
      )}

      {chainImage && (
        <div className="relative z-10 mt-7">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-50 p-2 shadow-sm"
                >
                  <Image
                    src={chainImage}
                    alt="Study group member"
                    width={24}
                    height={24}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>

            <span className="ml-3 text-sm font-medium text-gray-500">
              Your study group
            </span>
          </div>
        </div>
      )}

      {image && (
        <div className="relative z-10 mt-7 h-56 w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
    </div>
  );
};

export default InfoCard;
