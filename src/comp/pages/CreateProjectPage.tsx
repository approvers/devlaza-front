import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as styles from "css/comp/pages/CreateProjectPage.module.css";
import * as CommonStyles from "css/comp/Common.module.css";
import { Button, TextField } from "@material-ui/core";

type CreateProjectPageProps = RouteComponentProps;
type CreateProjectPageState = {
  name: string;
  introduction: string;
  isNameError: boolean;
  isIntroductionError: boolean;
};

class CreateProjectPage extends React.Component<
  CreateProjectPageProps,
  CreateProjectPageState
> {
  constructor(props: CreateProjectPageProps) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      isNameError: false,
      isIntroductionError: false,
    };
  }

  checkBlankSpace = (value: string) => {
    let isError = true;
    if (value.match(/\S/g)) {
      isError = false;
    }
    return isError;
  };

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;
    const isError = this.checkBlankSpace(e.target.value);
    this.setState({
      name: e.target.value,
      isNameError: isError,
    });
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = this.checkBlankSpace(e.target.value);
    this.setState({
      introduction: e.target.value,
      isIntroductionError: isError,
    });
  };

  handleSendButton = () => {
    // TODO: ここでAPIに情報をぶん投げる
    const projectId = "7438921";
    this.props.history.push(`/projects/detail/${projectId}`);
  };

  changeButtonType = () => {
    const ableSendFlag =
      !this.checkBlankSpace(this.state.name) &&
      !this.checkBlankSpace(this.state.introduction);
    const ableSend = (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={this.handleSendButton}
      >
        作成
      </Button>
    );
    const disableSend = (
      <Button variant="contained" size="large" disabled>
        作成
      </Button>
    );
    if (ableSendFlag) {
      return ableSend;
    } else {
      return disableSend;
    }
  };

  render() {
    let nameHelperText = "";
    let introductionHelperText = "";

    if (this.state.isNameError) {
      nameHelperText = "プロジェクト名を入力してください";
    }
    if (this.state.isIntroductionError) {
      introductionHelperText = "プロジェクトの説明を入力してください";
    }

    return (
      <>
        <div className={styles.form_wrapper}>
          <div className={CommonStyles.content_title}>プロジェクト作成</div>
          <form autoComplete="off">
            <div className={CommonStyles.createProjectContentsBox}>
              <TextField
                id="project-name"
                label="名前"
                margin="normal"
                multiline
                variant="outlined"
                fullWidth
                required
                onChange={this.handleNameInputChange}
                error={this.state.isNameError}
                value={this.state.name}
                helperText={nameHelperText}
              />
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              <TextField
                id="project-intro"
                label="プロジェクトの説明"
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
                style={{ marginBottom: "1rem" }}
                fullWidth
                required
                onChange={this.handleIntroductionInputChange}
                error={this.state.isIntroductionError}
                helperText={introductionHelperText}
              />
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              {this.changeButtonType()}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateProjectPage;
