import {
  faGetPocket,
  faLine,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faShareAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export type Icon = {
  Twitter: IconDefinition;
  Facebook: IconDefinition;
  LINE: IconDefinition;
  Mail: IconDefinition;
  Pocket: IconDefinition;
  Copy: IconDefinition;
};
export type IconUrl = {
  Twitter: string;
  Facebook: string;
  LINE: string;
  Mail: string;
  Pocket: string;
  Copy: string;
};
export type IconName = Array<keyof Icon>;

export const mainIconName: IconName = ["Twitter", "Facebook"];
export const subIconName: IconName = ["LINE", "Mail", "Pocket"];
export const icons: Icon = {
  Twitter: faTwitter,
  Facebook: faFacebookF,
  LINE: faLine,
  Mail: faEnvelope,
  Pocket: faGetPocket,
  Copy: faLink,
};

type UrlProps = {
  url: string;
  introduction: string;
  title: string;
};
export const Url = (props: UrlProps) => {
  const sentenceLengthLimits = 40;
  const intro = props.introduction.substr(0, sentenceLengthLimits);
  const iconsUrl: IconUrl = {
    Twitter: `https://twitter.com/share?url=${props.url}&text=${intro}`,
    Facebook: `http://www.facebook.com/share.php?u=${props.url}`,
    LINE: `https://social-plugins.line.me/lineit/share?url=${props.url}`,
    Mail: `mailto:body=${props.url}`,
    Pocket: `http://getpocket.com/edit?url=${props.url}&title=${props.title}`,
    Copy: props.url,
  };
  return iconsUrl;
};
export const otherIcon = faShareAlt;
