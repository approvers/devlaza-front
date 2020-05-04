import * as React from "react";

import UserInputField from "comp/UserInputField";
import * as style from "css/comp/pages/UserInvitePage.module.css";
import * as CommonStyle from "css/comp/Common.module.css";
import CreateSendButton from "../SendButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";

type UserInvitePageState = {
  selectedUserId: string[];
  isConfirmDialogOpen: boolean;
};

class UserInvitePage extends React.Component<
  RouteComponentProps<{ uuid: string }>,
  UserInvitePageState
> {
  constructor(props: RouteComponentProps<{ uuid: string }>) {
    super(props);

    this.state = {
      selectedUserId: [],
      isConfirmDialogOpen: false,
    };
  }

  handleInviteUserChange = (newUserIds: string[]) => {
    this.setState({
      selectedUserId: newUserIds,
    });
  };

  handleInviteButton = () => {
    // TODO: ここでAPIをぶっ叩いて招待を送る
    this.gotoNextPage();
  };

  handleSkipButton = () => {
    if (this.state.selectedUserId.length > 0) {
      this.setState({
        isConfirmDialogOpen: true,
      });
      return;
    }
    this.gotoNextPage();
  };

  gotoNextPage = () => {
    this.props.history.push(`/projects/detail/${this.props.match.params.uuid}`);
  };

  handleConfirmDialogClose = () => {
    this.setState({
      isConfirmDialogOpen: false,
    });
  };

  render() {
    return (
      <div className={CommonStyle.form_wrapper}>
        <div className={style.introduction_wrapper}>
          <div className={style.welcome_text}>Welcome!</div>
          <div className={style.introduction_text}>
            プロジェクトの初期メンバーを明確にするために、ユーザーを招待しましょう。
          </div>
        </div>
        <form autoComplete="off">
          <UserInputField onChange={this.handleInviteUserChange} />
        </form>

        <div className={style.nav_button_wrapper}>
          <span className={style.nav_button}>
            <CreateSendButton
              canSend={this.state.selectedUserId.length > 0}
              handleSendButton={this.handleInviteButton}
            >
              招待する
            </CreateSendButton>
          </span>
          <span className={style.nav_button}>
            <Button
              variant="contained"
              size="large"
              onClick={this.handleSkipButton}
            >
              スキップ
            </Button>
          </span>
        </div>
        <Dialog
          open={this.state.isConfirmDialogOpen}
          onClose={this.handleConfirmDialogClose}
        >
          <DialogTitle>招待せずに移動しますか?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              選択されたユーザーがいます。
              <br />
              このまま移動すると、選択したユーザーへの招待はされません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleConfirmDialogClose}
              color="secondary"
            >
              キャンセル
            </Button>
            <Button onClick={this.gotoNextPage} color="secondary">
              移動する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserInvitePage;
