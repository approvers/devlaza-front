import React from "react";
import { Button, Tooltip, Zoom } from "@material-ui/core";

type ShareButtonCompProps = {
  iconName: string;
  url: string;
  children: React.ReactNode;
};

const ShareButtonComp = (props: ShareButtonCompProps) => {
  return (
    <Tooltip TransitionComponent={Zoom} title={props.iconName} arrow>
      <Button color="secondary" href={props.url}>
        {props.children}
      </Button>
    </Tooltip>
  );
};

export default ShareButtonComp;
