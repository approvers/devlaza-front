import * as React from "react";
import { Button } from "@material-ui/core";

type SendButtonProps = {
  canSend: boolean;
  handleSendButton: () => void;
};

const CreateSendButton: React.FunctionComponent<SendButtonProps> = (props) => {
  const enabledButton = (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={() => props.handleSendButton()}
    >
      {props.children}
    </Button>
  );
  const disabledButton = (
    <Button variant="contained" size="large" disabled>
      {props.children}
    </Button>
  );
  return props.canSend ? enabledButton : disabledButton;
};

export default CreateSendButton;
