import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const InviteSkipConfirmDialog = (props: {
  open: boolean;
  onClosed: () => void;
  onConfirmed: () => void;
}) => {
  return (
    <Dialog open={props.open} onClose={props.onClosed}>
      <DialogTitle>招待せずに移動しますか?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          選択されたユーザーがいます。
          <br />
          このまま移動すると、選択したユーザーへの招待はされません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onConfirmed} color="secondary">
          移動する
        </Button>
        <Button autoFocus onClick={props.onClosed} color="secondary">
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};
