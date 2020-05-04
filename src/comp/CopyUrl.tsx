import React from "react";
import { Button, Tooltip, Zoom, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ClipboardJs from "clipboard";

type CopyUrlProps = {
  url: string;
  children: React.ReactNode;
};

const CopyUrl = (props: CopyUrlProps) => {
  const clipboard = new ClipboardJs(".btn");
  clipboard.on("success", (e) => {
    e.clearSelection();
  });
  clipboard.on("error", (e) => {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Tooltip TransitionComponent={Zoom} title="Copy" arrow>
        <Button
          color="secondary"
          className={"btn"}
          data-clipboard-text={props.url}
          onClick={handleClick}
        >
          {props.children}
        </Button>
      </Tooltip>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyUrl;
