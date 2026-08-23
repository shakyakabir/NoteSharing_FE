import Text from "@/app/components/ui/Text";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const bgVariants: Record<string, string> = {
  primary: "bg-gray-100 text-gray-900",
  green: "bg-teal-100 text-teal-800",
  orange: "bg-amber-100 text-amber-800",
};

interface InfoProps {
  heading: string;
  subHeading: string;
  links?: string;
  progress?: boolean;
  image?: string | StaticImageData;
  chainImage?: string | StaticImageData;
  icon?: string | StaticImageData;
  bgIcon?: "primary" | "green" | "orange";
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
}: InfoProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {icon && (
          <div className={`${bgVariants[bgIcon]} inline-flex p-3 rounded-xl`}>
            <Image
              src={icon}
              alt={`${heading} icon`}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        )}

        <div>
          <Text
            size="lg"
            weight="bold"
            color="heading"
            as="h3"
            className="text-xl font-semibold"
          >
            {heading}
          </Text>
          <Text
            size="md"
            weight="normal"
            color="subHeading"
            as="p"
            className="mt-2 text-gray-600 leading-relaxed"
          >
            {subHeading}
          </Text>
        </div>

        {links && (
          <div className="pt-2">
            <Link
              href="#"
              className="inline-flex items-center text-teal-600 font-medium hover:underline gap-1"
            >
              {links} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </div>

      {progress && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-amber-500 h-2.5 rounded-full w-[80%]" />
          </div>
          <div className="flex justify-between items-center mt-3 text-sm">
            <Text size="sm" weight="semibold" color="subHeading" as="span">
              Weekly Goal
            </Text>
            <span className="font-semibold text-amber-600">80%</span>
          </div>
        </div>
      )}

      {chainImage && (
        <div className="flex -space-x-2 mt-6 pt-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-teal-50 p-1"
            >
              <Image
                alt="Member avatar"
                src={chainImage}
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {image && (
        <div className="mt-6 relative w-full h-48 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
};

export default InfoCard;
