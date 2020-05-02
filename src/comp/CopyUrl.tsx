import React from "react";
import { Tooltip, Zoom } from "@material-ui/core";
import ClipboardJs from "clipboard";
import * as styles from "css/comp/ShareButton.module.css";

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
      <span className={"btn " + styles.copyUrl} data-clipboard-text={props.url}>
        {props.children}
      </span>
    </Tooltip>
  );
};

export default CopyUrl;
