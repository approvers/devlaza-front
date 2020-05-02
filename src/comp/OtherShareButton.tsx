import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListItem } from "@material-ui/core";
import { Icon, IconUrl } from "./shareButtonData/data";
import * as styles from "css/comp/ShareButton.module.css";

type ShareButtonProps = {
  icons: Array<keyof Icon>;
  iconsList: Icon;
  iconsUrl: IconUrl;
};
const OtherShareButton = (props: ShareButtonProps) => {
  return (
    <>
      {props.icons.map((icon: keyof Icon, key: number) => (
        <ListItem key={key} className={styles.listItem}>
          <Button
            color="secondary"
            href={props.iconsUrl[icon]}
            className={styles.otherButton}
          >
            <FontAwesomeIcon icon={props.iconsList[icon]} />
            <p>{icon}</p>
          </Button>
        </ListItem>
      ))}
    </>
  );
};

export default OtherShareButton;
