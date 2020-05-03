import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListItem } from "@material-ui/core";
import { Icon } from "./shareButtonData/data";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  iconsName: Array<keyof Icon>;
  icons: Icon;
};
const OtherShareButton = (props: ShareButtonProps) => {
  return (
    <>
      {props.iconsName.map((icon: keyof Icon, key: number) => (
        <ListItem key={key} className={styles.listItem}>
          <Button
            color="secondary"
            href={props.icons[icon].url}
            className={styles.otherButton}
          >
            <FontAwesomeIcon icon={props.icons[icon].definition} />
            <p>{icon}</p>
          </Button>
        </ListItem>
      ))}
    </>
  );
};

export default OtherShareButton;
