import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as styles from "css/comp/pages/CreateProjectPage.module.css";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "../SendButton";
import { TextField } from "@material-ui/core";

type CreateProjectPageState = {
  name: string;
  introduction: string;
  isNameError: boolean;
  isIntroductionError: boolean;
};

const checkBlankSpace = (value: string) => {
  return !value.match(/\S/g);
};

class CreateProjectPage extends React.Component<
  RouteComponentProps,
  CreateProjectPageState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      isNameError: false,
      isIntroductionError: false,
    };
  }

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;
    const isError = checkBlankSpace(e.target.value);
    this.setState({
      name: e.target.value,
      isNameError: isError,
    });
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = checkBlankSpace(e.target.value);
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
              <CreateSendButton
                canSend={
                  !checkBlankSpace(this.state.name) &&
                  !checkBlankSpace(this.state.introduction)
                }
                handleSendButton={this.handleSendButton}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateProjectPage;
