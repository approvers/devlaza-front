import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Tooltip, Zoom } from "@material-ui/core";
import EventListener from "react-event-listener";
import { RouteComponentProps } from "react-router-dom";
import OtherShareButton from "./OtherShareButton";
import {
  Icon,
  IconName,
  IconUrl,
  mainIconName,
  subIconName,
  icons,
  Url,
  otherIcon,
} from "./shareButtonData/data";
import ShareDialog from "./ShareDialog";
import CopyUrl from "./CopyUrl";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  introduction: string;
  route: RouteComponentProps<{ id: string }>;
};

const ShareButton = (props: ShareButtonProps) => {
  const [isPhone, changeState] = React.useState(window.innerWidth <= 600);
  const [open, setOpen] = React.useState(false);
  const pageData = {
    url: "ここに https:// とかを入れる" + props.route.location.pathname,
    title: document.title,
    introduction: props.introduction,
  };
  const iconsUrl = Url(pageData);

  const handleResize = () => {
    changeState(window.innerWidth <= 600);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let otherButtonIcon: JSX.Element;
  let iconList: IconName;
  let child: IconName;
  if (isPhone) {
    iconList = mainIconName;
    otherButtonIcon = (
      <Button onClick={handleClickOpen}>
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
      <EventListener target="window" onResize={handleResize} />
      <ButtonGroup
        className={styles.buttonGroup}
        color="secondary"
        aria-label="share button"
      >
        <Button>
          <CopyUrl url={pageData.url}>
            <FontAwesomeIcon icon={icons["Copy"]} />
          </CopyUrl>
        </Button>
        {iconList.map((icon: keyof Icon | keyof IconUrl, key: number) => (
          <Tooltip key={key} TransitionComponent={Zoom} title={icon} arrow>
            <Button href={iconsUrl[icon]}>
              <FontAwesomeIcon icon={icons[icon]} />
            </Button>
          </Tooltip>
        ))}
        <Tooltip TransitionComponent={Zoom} title="Share" arrow>
          {otherButtonIcon}
        </Tooltip>
      </ButtonGroup>
      <ShareDialog open={open} handleClose={handleClose}>
        <OtherShareButton icons={child} iconsList={icons} iconsUrl={iconsUrl} />
      </ShareDialog>
    </>
  );
};

export default ShareButton;
