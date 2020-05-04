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

export type ShareButtonSet = {
  name: IconName;
  definition: IconDefinition;
  url: string;
};

export type Icon = Record<IconName, ShareButtonSet>;

export const mainIconName: IconName[] = ["Twitter", "Facebook"];
export const subIconName: IconName[] = ["LINE", "Mail", "Pocket"];

type NeededIcon = "main" | "sub" | "both";
type UrlProps = {
  url: string;
  introduction: string;
  title: string;
};
const ShareSet = ({ url, introduction, title }: UrlProps) => {
  const sentenceLengthLimits = 40;
  const intro = introduction.substr(0, sentenceLengthLimits);
  const iconsData: Icon = {
    Twitter: {
      name: "Twitter",
      definition: faTwitter,
      url: `https://twitter.com/share?url=${url}&text=${intro}`,
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
  const returnSet: ShareButtonSet[] = [];
  const iconsData = ShareSet(props);
  if (needed === "main") {
    mainIconName.map((iconName: IconName) =>
      returnSet.push(iconsData[iconName])
    );
  }
  if (needed === "sub") {
    subIconName.map((iconName: IconName) =>
      returnSet.push(iconsData[iconName])
    );
  }
  if (needed === "both") {
    mainIconName
      .concat(subIconName)
      .map((iconName: IconName) => returnSet.push(iconsData[iconName]));
  }
  return returnSet;
};

export const otherIcon = { other: faShareAlt, copy: faLink };
