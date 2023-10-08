import { FC, HTMLProps } from "react";
import SocialIcon from "./SocialIcon";
import { mdiInstagram, mdiFacebook, mdiTwitter, mdiLinkedin } from "@mdi/js";

interface FooterProps {
  height: string;
  bgColor: string;
  flex?: string;
  margin?: string;
}

const Footer: FC<FooterProps> = ({
  height,
  bgColor,
  flex = "",
  margin = "",
}: FooterProps) => {
  return (
    <footer className={`${height} ${bgColor} ${flex} ${margin} `}>
      <address className="flex justify-center gap-medium ">
        <SocialIcon size={3} href="/" mdiPath={mdiInstagram}></SocialIcon>
        <SocialIcon size={3} href="/" mdiPath={mdiFacebook}></SocialIcon>
        <SocialIcon size={3} href="/" mdiPath={mdiTwitter}></SocialIcon>
        <SocialIcon size={3} href="/" mdiPath={mdiLinkedin}></SocialIcon>
      </address>
    </footer>
  );
};

export default Footer;
