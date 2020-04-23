import * as React from "react";
import { Button } from "@material-ui/core";

type SendButtonProps = {
  canSend: boolean;
  handleSendButton: () => void;
};

const CreateSendButton = (props: SendButtonProps) => {
  const enabledButton = (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={() => props.handleSendButton()}
    >
      作成
    </Button>
  );
  const disabledButton = (
    <Button variant="contained" size="large" disabled>
      作成
    </Button>
  );
  return props.canSend ? enabledButton : disabledButton;
};

export default CreateSendButton;
