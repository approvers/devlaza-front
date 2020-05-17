import * as React from "react";

import UserInputField from "comp/UserInputField";
import * as style from "css/comp/pages/UserInvitePage.module.css";
import * as CommonStyle from "css/comp/Common.module.css";
import CreateSendButton from "comp/SendButton";
import { Button } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { InviteSkipConfirmDialog } from "../userInvitePage/InviteSkipConfirmDialog";

type UserInvitePageState = {
  selectedUserIds: string[];
  openedConfirmDialog: boolean;
};

class UserInvitePage extends React.Component<
  RouteComponentProps<{ uuid: string }>,
  UserInvitePageState
> {
  constructor(props: RouteComponentProps<{ uuid: string }>) {
    super(props);

    this.state = {
      selectedUserIds: [],
      openedConfirmDialog: false,
    };
  }

  handleInviteUserChange = (newUserIds: string[]) => {
    this.setState({
      selectedUserIds: newUserIds,
    });
  };

  handleInviteButton = () => {
    // TODO: ここでAPIをぶっ叩いて招待を送る
    this.gotoNextPage();
  };

  handleSkipButton = () => {
    if (this.state.selectedUserIds.length > 0) {
      this.setState({
        openedConfirmDialog: true,
      });
      return;
    }
    this.gotoNextPage();
  };

  handleDialogClosed = () => {
    this.setState({
      openedConfirmDialog: false,
    });
  };

  gotoNextPage = () => {
    this.props.history.push(`/projects/detail/${this.props.match.params.uuid}`);
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
        <div className={style.user_form_wrapper}>
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <UserInputField onChange={this.handleInviteUserChange} />
          </form>
        </div>
        <div className={style.nav_button_wrapper}>
          <span className={style.nav_button}>
            <Button
              variant="outlined"
              size="large"
              onClick={this.handleSkipButton}
            >
              スキップ
            </Button>
          </span>
          <span className={style.nav_button}>
            <CreateSendButton
              canSend={this.state.selectedUserIds.length > 0}
              handleSendButton={this.handleInviteButton}
            >
              招待する
            </CreateSendButton>
          </span>
        </div>
        <InviteSkipConfirmDialog
          open={this.state.openedConfirmDialog}
          onClosed={this.handleDialogClosed}
          onConfirmed={this.gotoNextPage}
        />
      </div>
    );
  }
}

export default UserInvitePage;
