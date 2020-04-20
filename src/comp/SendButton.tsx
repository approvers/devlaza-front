import * as React from "react";
import { Button } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";

type SendButtonProps = {
  name: string;
  introduction: string;
  props: RouteComponentProps;
};

const checkBlankSpace = (value: string) => {
  let isError = true;
  if (value.match(/\S/g)) {
    isError = false;
  }
  return isError;
};

const handleSendButton = (props: RouteComponentProps) => {
  // TODO: ここでAPIに情報をぶん投げる
  const projectId = "7438921";
  props.history.push(`/projects/detail/${projectId}`);
};

const CreateSendButton = (props: SendButtonProps) => {
  const canSend =
    !checkBlankSpace(props.name) && !checkBlankSpace(props.introduction);
  const enabledButton = (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={() => handleSendButton(props.props)}
    >
      作成
    </Button>
  );
  const disabledButton = (
    <Button variant="contained" size="large" disabled>
      作成
    </Button>
  );
  return canSend ? enabledButton : disabledButton;
};

export default CreateSendButton;
