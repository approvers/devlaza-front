import * as React from "react";
import { Button } from "@material-ui/core";

import styles from "css/comp/SendButton.module.css";
import { PropsWithChildren } from "react";

type SendButtonProps = {
  canSend: boolean;
  handleSendButton: () => void;
  outline?: boolean;
};

const CreateSendButton: React.FC<SendButtonProps> = (
  props: PropsWithChildren<SendButtonProps>
) => {
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
  return (
    <div className={styles.button_wrapper}>
      {props.canSend ? enabledButton : disabledButton}
    </div>
  );
};

CreateSendButton.defaultProps = {
  outline: false,
};

export default CreateSendButton;
