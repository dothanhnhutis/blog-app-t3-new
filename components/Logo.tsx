import React from "react";
import LogoImage from "@/logos/logo.png";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { classNames } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      prefetch={false}
      className={classNames("overflow-hidden", className ?? "")}
    >
      <div className="flex items-center h-14 w-14">
        <AspectRatio ratio={1 / 1} className="flex items-center justify-center">
          <Image priority src={LogoImage} alt="logo" className="" />
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;