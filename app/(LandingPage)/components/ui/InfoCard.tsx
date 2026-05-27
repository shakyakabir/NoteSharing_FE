import Text from "@/app/components/ui/Text";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
const bgVariants: Record<string, string> = {
  primary: "bg-[#000000]",
  green: "bg-[#CCFBF1]",
  orange: "bg-[#FEF3C7]",
};
interface infoProps {
  heading: string;
  subHeading: string;
  links?: string;
  progress?: boolean;
  image?: string | StaticImageData;
  chainImage?: string | StaticImageData;
  icon?: string;
  bgIcon?: string;
}
const InfoCard = ({
  heading,
  subHeading,
  links,
  bgIcon,
  chainImage,
  image,
  progress,
  icon,
}: infoProps) => {
  return (
    <div className="flex gap-4 bg-white border-1 border-[#E2E8F0] p-5 rounded-2xl">
      <div className="flex flex-col justify-between">
        <div>
          {/* {icon && <div>{icon}</div>} */}
          {icon && (
            <div
              className={`${bgVariants[bgIcon || "primary"]} inline-block p-2 rounded-md`}
            >
              <Image src={icon} alt="icon" />
            </div>
          )}

          <Text
            size={"lg"}
            weight={"bold"}
            color={"heading"}
            as={"h3"}
            className="mt-3"
          >
            {heading}
          </Text>
          <Text
            size={"md"}
            weight={"normal"}
            color={"subHeading"}
            as={"h3"}
            className="mt-3"
          >
            {subHeading}
          </Text>
        </div>
        <div>
          {" "}
          {links && (
            <Link href={"link"} className="text-[#0D9488]">
              {links} {"->"}
            </Link>
          )}
        </div>

        {progress && (
          <>
            <div className="w-full mt-10 bg-gray-200 rounded-full h-3">
              <div
                className="bg-amber-600 h-3 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <div className="flex justify-between mt-3">
              <Text
                size={"sm"}
                weight={"semibold"}
                color={"subHeading"}
                as={"p"}
              >
                Weekly Goal
              </Text>

              <p className="text-amber-600">750px</p>
            </div>
          </>
        )}
        {chainImage && (
          <div className="flex mt-5 mb-3">
            <Image alt="chainImage" src={chainImage} width={20} />
            <Image alt="chainImage" src={chainImage} width={20} />
            <Image alt="chainImage" src={chainImage} width={20} />
          </div>
        )}
      </div>
      {image && (
        <div>
          <Image src={image} width={500} alt="chainImage" />
        </div>
      )}
    </div>
  );
};
export default InfoCard;
