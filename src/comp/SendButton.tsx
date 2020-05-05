import * as React from "react";
import { Button } from "@material-ui/core";

type SendButtonProps = {
  canSend: boolean;
  handleSendButton: () => void;
  outline?: boolean;
};

const CreateSendButton: React.FunctionComponent<SendButtonProps> = (props) => {
  const isOutlineSelected: boolean = props.outline ?? false;

  const enabledButton = (
    <Button
      variant={isOutlineSelected ? "outlined" : "contained"}
      color="secondary"
      size="large"
      onClick={() => props.handleSendButton()}
    >
      {props.children}
    </Button>
  );
  const disabledButton = (
    <Button
      variant={isOutlineSelected ? "outlined" : "contained"}
      size="large"
      disabled
    >
      {props.children}
    </Button>
  );
  return props.canSend ? enabledButton : disabledButton;
};

CreateSendButton.defaultProps = {
  outline: false,
};

export default CreateSendButton;
