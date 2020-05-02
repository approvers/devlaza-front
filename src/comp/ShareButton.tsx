import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  Divider,
  List,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import EventListener from "react-event-listener";
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
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  introduction: string;
};

const ShareButton = (props: ShareButtonProps) => {
  const [isPhone, changeState] = React.useState(window.innerWidth <= 600);
  const [open, setOpen] = React.useState(false);
  const pageData = {
    url: "#",
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
        {iconList.map((icon: keyof Icon | keyof IconUrl, key: number) => (
          <Button key={key} href={iconsUrl[icon]}>
            <FontAwesomeIcon icon={icons[icon]} />
          </Button>
        ))}
        {otherButtonIcon}
      </ButtonGroup>
      <Dialog onClose={handleClose} open={open}>
        <div className={styles.dialogTitle}>
          <Typography className={styles.otherTitle}>Share</Typography>
        </div>
        <Divider />
        <List>
          <OtherShareButton
            icons={child}
            iconsList={icons}
            iconsUrl={iconsUrl}
          />
        </List>
      </Dialog>
    </>
  );
};

export default ShareButton;
