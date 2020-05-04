import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListItem } from "@material-ui/core";
import { ShareButtonSet } from "./shareButtonData/data";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  shareSet: ShareButtonSet;
};

const OtherShareButton = (props: ShareButtonProps) => {
  return (
    <ListItem className={styles.listItem}>
      <Button
        color="secondary"
        href={props.shareSet.url}
        className={styles.otherButton}
      >
        <FontAwesomeIcon icon={props.shareSet.definition} />
        <p>{props.shareSet.name}</p>
      </Button>
    </ListItem>
  );
};

export default OtherShareButton;
