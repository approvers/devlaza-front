import React from "react";
import { Dialog, Divider, List, Typography } from "@material-ui/core";
import * as styles from "css/comp/ShareButton.module.css";

type ShareDialogProps = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

const ShareDialog = (props: ShareDialogProps) => {
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <div className={styles.dialogTitle}>
        <Typography className={styles.otherTitle}>Share</Typography>
      </div>
      <Divider />
      <List>{props.children}</List>
    </Dialog>
  );
};

export default ShareDialog;
