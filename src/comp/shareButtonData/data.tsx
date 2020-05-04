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

export type IconName = "Twitter" | "Facebook" | "LINE" | "Mail" | "Pocket";

export type ShareButton = {
  name: IconName;
  definition: IconDefinition;
  url: string;
};

type ShareButtonSet = Record<IconName, ShareButton>;

export const mainIconName: IconName[] = ["Twitter", "Facebook"];
export const subIconName: IconName[] = ["LINE", "Mail", "Pocket"];

type NeededIcon = "main" | "sub" | "both";
type UrlProps = {
  url: string;
  introduction: string;
  title: string;
};
const shareSet = ({ url, introduction, title }: UrlProps) => {
  const sentenceLengthLimits = 30;
  const twitterIndention = "%0a";
  const introEnd = introduction.length > sentenceLengthLimits ? "..." : "";
  const intro =
    twitterIndention +
    introduction.substr(0, sentenceLengthLimits) +
    introEnd +
    twitterIndention;
  const iconsData: ShareButtonSet = {
    Twitter: {
      name: "Twitter",
      definition: faTwitter,
      url: `https://twitter.com/intent/tweet?url=${url}&text=${title}${intro}`,
    },
    Facebook: {
      name: "Facebook",
      definition: faFacebookF,
      url: `http://www.facebook.com/share.php?u=${url}`,
    },
    LINE: {
      name: "LINE",
      definition: faLine,
      url: `https://social-plugins.line.me/lineit/share?url=${url}`,
    },
    Mail: {
      name: "Mail",
      definition: faEnvelope,
      url: `mailto:?body=${url}`,
    },
    Pocket: {
      name: "Pocket",
      definition: faGetPocket,
      url: `http://getpocket.com/edit?url=${url}&title=${title}`,
    },
  };
  return iconsData;
};
export const ReturnShareSet = (props: UrlProps) => (needed: NeededIcon) => {
  let returnSet: ShareButton[] = [];
  const iconsData = shareSet(props);
  if (needed === "main") {
    returnSet = mainIconName.map((iconName: IconName) => iconsData[iconName]);
  }
  if (needed === "sub") {
    returnSet = subIconName.map((iconName: IconName) => iconsData[iconName]);
  }
  if (needed === "both") {
    returnSet = mainIconName
      .concat(subIconName)
      .map((iconName: IconName) => iconsData[iconName]);
  }
  return returnSet;
};

export const otherIcon = { other: faShareAlt, copy: faLink };
