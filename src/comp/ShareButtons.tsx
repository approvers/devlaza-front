import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip, Zoom } from "@material-ui/core";
import { PhoneContext } from "../App";
import OtherShareButton from "./OtherShareButton";
import { ReturnShareSet, otherIcon, ShareButton } from "./shareButtonData/data";
import ShareDialog from "./ShareDialog";
import CopyUrl from "./CopyUrl";
import ShareButtonComp from "./ShareButtonComp";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  introduction: string;
  projectName: string;
  pathName: string;
};

const ShareButtons = (props: ShareButtonProps) => {
  const isPhone = useContext(PhoneContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let otherButtonIcon: JSX.Element;
  let iconList: ShareButton[];
  let children: ShareButton[];
  const pageData = {
    url: "ここに https:// とかを入れる" + props.pathName,
    title: props.projectName,
    introduction: props.introduction,
  };
  const ShareSet = ReturnShareSet(pageData);
  if (isPhone) {
    iconList = ShareSet("main");
    otherButtonIcon = (
      <Button color="secondary" onClick={handleClickOpen}>
        <FontAwesomeIcon icon={otherIcon.other} />
      </Button>
    );
    children = ShareSet("sub");
  } else {
    iconList = ShareSet("both");
    otherButtonIcon = <></>;
    children = [];
  }

  return (
    <>
      <div className={styles.buttonGroup}>
        <CopyUrl url={pageData.url}>
          <FontAwesomeIcon icon={otherIcon.copy} />
        </CopyUrl>
        {iconList.map((icon: ShareButton, key: number) => (
          <ShareButtonComp key={key} iconName={icon.name} url={icon.url}>
            <FontAwesomeIcon icon={icon.definition} />
          </ShareButtonComp>
        ))}
        <Tooltip TransitionComponent={Zoom} title="Share" arrow>
          {otherButtonIcon}
        </Tooltip>
      </div>
      <ShareDialog open={open} handleClose={handleClose}>
        {children?.map((icon: ShareButton, key: number) => (
          <OtherShareButton key={key} share={icon} />
        ))}
      </ShareDialog>
    </>
  );
};

export default ShareButtons;
