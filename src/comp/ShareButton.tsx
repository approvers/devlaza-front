import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip, Zoom } from "@material-ui/core";
import { PhoneContext } from "../App";
import OtherShareButton from "./OtherShareButton";
import {
  IconName,
  mainIconName,
  subIconName,
  Url,
  otherIcon,
} from "./shareButtonData/data";
import ShareDialog from "./ShareDialog";
import CopyUrl from "./CopyUrl";
import ShareButtonComp from "./ShareButtonComp";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  introduction: string;
  pathName: string;
};

const ShareButton = (props: ShareButtonProps) => {
  const isPhone = useContext(PhoneContext);
  const [open, setOpen] = React.useState(false);
  const pageData = {
    url: "ここに https:// とかを入れる" + props.pathName,
    title: document.title,
    introduction: props.introduction,
  };
  const iconsUrl = Url(pageData);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let otherButtonIcon: JSX.Element;
  let iconList: IconName[];
  let child: IconName[];
  if (isPhone) {
    iconList = mainIconName;
    otherButtonIcon = (
      <Button color="secondary" onClick={handleClickOpen}>
        <FontAwesomeIcon icon={otherIcon} />
      </Button>
    );
    child = subIconName;
  } else {
    iconList = mainIconName.concat(subIconName);
    otherButtonIcon = <></>;
    child = [];
  }

  return (
    <>
      <div className={styles.buttonGroup}>
        <CopyUrl url={pageData.url}>
          <FontAwesomeIcon icon={iconsUrl.Copy.definition} />
        </CopyUrl>
        {iconList.map((icon: IconName, key: number) => (
          <ShareButtonComp key={key} iconName={icon} url={iconsUrl[icon].url}>
            <FontAwesomeIcon icon={iconsUrl[icon].definition} />
          </ShareButtonComp>
        ))}
        <Tooltip TransitionComponent={Zoom} title="Share" arrow>
          {otherButtonIcon}
        </Tooltip>
      </div>
      <ShareDialog open={open} handleClose={handleClose}>
        {child?.map((icon: IconName, key: number) => (
          <OtherShareButton key={key} shareSet={iconsUrl[icon]} />
        ))}
      </ShareDialog>
    </>
  );
};

export default ShareButton;
