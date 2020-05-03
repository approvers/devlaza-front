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

export type IconName =
  | "Twitter"
  | "Facebook"
  | "LINE"
  | "Mail"
  | "Pocket"
  | "Copy";
export type Icon = Record<
  IconName,
  {
    definition: IconDefinition;
    url: string;
  }
>;

export const mainIconName: IconName[] = ["Twitter", "Facebook"];
export const subIconName: IconName[] = ["LINE", "Mail", "Pocket"];

type UrlProps = {
  url: string;
  introduction: string;
  title: string;
};
export const Url = (props: UrlProps) => {
  const sentenceLengthLimits = 40;
  const intro = props.introduction.substr(0, sentenceLengthLimits);
  const iconsUrl: Icon = {
    Twitter: {
      definition: faTwitter,
      url: `https://twitter.com/share?url=${props.url}&text=${intro}`,
    },
    Facebook: {
      definition: faFacebookF,
      url: `http://www.facebook.com/share.php?u=${props.url}`,
    },
    LINE: {
      definition: faLine,
      url: `https://social-plugins.line.me/lineit/share?url=${props.url}`,
    },
    Mail: {
      definition: faEnvelope,
      url: `mailto:?body=${props.url}`,
    },
    Pocket: {
      definition: faGetPocket,
      url: `http://getpocket.com/edit?url=${props.url}&title=${props.title}`,
    },
    Copy: {
      definition: faLink,
      url: props.url,
    },
  };
  return iconsUrl;
};

export const otherIcon = faShareAlt;
