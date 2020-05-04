import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListItem } from "@material-ui/core";
import { ShareButton } from "./shareButtonData/data";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  share: ShareButton;
};

const OtherShareButton = (props: ShareButtonProps) => {
  return (
    <ListItem className={styles.listItem}>
      <Button
        color="secondary"
        href={props.share.url}
        className={styles.otherButton}
      >
        <FontAwesomeIcon icon={props.share.definition} />
        <p>{props.share.name}</p>
      </Button>
    </ListItem>
  );
};

export default OtherShareButton;
