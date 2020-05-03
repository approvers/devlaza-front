import React from "react";
import { Button, Tooltip, Zoom } from "@material-ui/core";
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

  return (
    <Tooltip TransitionComponent={Zoom} title="Copy" arrow>
      <Button
        color="secondary"
        className={"btn"}
        data-clipboard-text={props.url}
      >
        {props.children}
      </Button>
    </Tooltip>
  );
};

export default CopyUrl;
