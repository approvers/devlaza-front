import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as styles from "css/comp/pages/CreateProjectPage.module.css";
import * as CommonStyles from "css/comp/Common.module.css";
import { Box, Button, TextField } from "@material-ui/core";

type CreateProjectPageProps = {} & RouteComponentProps;
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

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;
    this.setState({
      name: e.target.value,
      isNameError: e.target.value.length === 0,
    });
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      introduction: e.target.value,
      isIntroductionError: e.target.value.length === 0,
    });
  };

  handleSendButton = () => {
    const isNameError = this.state.name.length === 0;
    const isIntroductionError = this.state.introduction.length === 0;
    this.setState({
      isNameError: isNameError,
      isIntroductionError: isIntroductionError,
    });
    if (isNameError || isIntroductionError) return;

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
          <Box m="0.75rem" />
          <form autoComplete="off">
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
            <div className={CommonStyles.for_computer}>
              <Box m="1rem" />
            </div>
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
            <div className={CommonStyles.for_computer}>
              <Box m="1rem" />
            </div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={this.handleSendButton}
            >
              作成
            </Button>
          </form>
        </div>
      </>
    );
  }
}

export default CreateProjectPage;
