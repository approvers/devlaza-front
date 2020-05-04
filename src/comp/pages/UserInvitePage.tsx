import * as React from "react";

import UserInputField from "comp/UserInputField";
import * as style from "css/comp/pages/UserInvitePage.module.css";
import * as CommonStyle from "css/comp/Common.module.css";
import CreateSendButton from "../SendButton";
import { Button } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";

type UserInvitePageState = {
  selectedUserId: string[];
};

class UserInvitePage extends React.Component<
  RouteComponentProps<{ uuid: string }>,
  UserInvitePageState
> {
  constructor(props: RouteComponentProps<{ uuid: string }>) {
    super(props);

    this.state = {
      selectedUserId: [],
    };
  }

  handleInviteUserChange = (newUserIds: string[]) => {
    this.setState({
      selectedUserId: newUserIds,
    });
  };

  handleInviteButton = () => {
    // TODO: ここでAPIをぶっ叩いて招待を送る
    this.props.history.push(`/projects/detail/${this.props.match.params.uuid}`);
  };

  handleSkipButton = () => {
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
      </div>
    );
  }
}

export default UserInvitePage;
