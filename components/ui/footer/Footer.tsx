import SocialIcon from "./SocialIcon";
import { mdiInstagram, mdiFacebook, mdiTwitter, mdiLinkedin } from "@mdi/js";

interface FooterProps {
  height: string;
  bgColor: string;
  flex?: string;
  margin?: string;
}

export default function Footer({
  height,
  bgColor,
  flex = "",
  margin = "",
}: FooterProps) {
  return (
    <footer className={`${height} ${bgColor} ${flex} ${margin} `}>
      <address className="flex justify-center gap-medium ">
        <SocialIcon size={3} linkTo="/" mdiPath={mdiInstagram}></SocialIcon>
        <SocialIcon size={3} linkTo="/" mdiPath={mdiFacebook}></SocialIcon>
        <SocialIcon size={3} linkTo="/" mdiPath={mdiTwitter}></SocialIcon>
        <SocialIcon size={3} linkTo="/" mdiPath={mdiLinkedin}></SocialIcon>
      </address>
    </footer>
  );
}
