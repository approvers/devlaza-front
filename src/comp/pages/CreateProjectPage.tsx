import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as styles from "css/comp/pages/CreateProjectPage.module.css";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "../SendButton";
import { Divider, TextField } from "@material-ui/core";
import { ScrollableTagList } from "../ScrollableTagList";

type CreateProjectPageState = {
  name: string;
  introduction: string;
  addingTagName: string;
  tagIDs: string[];
  isNameError: boolean;
  isIntroductionError: boolean;
  tagIDErrorCode: number;
};

const checkBlankSpace = (value: string) => !!value.match(/\S/g);

class CreateProjectPage extends React.Component<
  RouteComponentProps,
  CreateProjectPageState
> {
  static readonly TAG_ERROR_ONLY_SPACE = 1;
  static readonly TAG_ERROR_DUPLICATE = 2;
  static readonly TAG_ERROR_UNUSABLE_CHAR = 3;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      addingTagName: "",
      tagIDs: [],
      isNameError: false,
      isIntroductionError: false,
      tagIDErrorCode: 0,
    };
  }

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;
    const isError = !checkBlankSpace(e.target.value);
    this.setState({
      name: e.target.value,
      isNameError: isError,
    });
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = !checkBlankSpace(e.target.value);
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

  handleTagNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;

    let errorCode = 0;
    if (!checkBlankSpace(e.target.value)) {
      errorCode = CreateProjectPage.TAG_ERROR_ONLY_SPACE;
    }
    if (e.target.value.indexOf("+") !== -1) {
      // +は使用できない(APIリクエストのときに区切り文字に使う)
      errorCode = CreateProjectPage.TAG_ERROR_UNUSABLE_CHAR;
    }

    this.setState({
      addingTagName: e.target.value,
      tagIDErrorCode: errorCode,
    });
  };

  handleAddTagClick = () => {
    // TODO: APIをぶっ叩く
    // タグがすでに存在する場合はそのIDを結合します
    // 存在しない場合は新しく作成してIDをもらって、そのIDを結合します
    const tagID = "tag-" + this.state.addingTagName;

    if (this.state.tagIDs.indexOf(tagID) !== -1) {
      this.setState({
        tagIDErrorCode: CreateProjectPage.TAG_ERROR_DUPLICATE,
      });
      return;
    }

    this.setState({
      tagIDs: this.state.tagIDs.concat(tagID),
      addingTagName: "",
    });
  };

  handleTagListClick = (id: string) => {
    const isUserDecided = window.confirm(`本当に削除しますか?`);
    if (isUserDecided) {
      const newTagsId: string[] = this.state.tagIDs.filter((e) => e !== id);
      this.setState({
        tagIDs: newTagsId,
      });
    }
  };

  render() {
    let nameHelperText = "";
    let introductionHelperText = "";
    let tagIDHelperText = "";

    if (this.state.isNameError) {
      nameHelperText = "プロジェクト名を入力してください";
    }
    if (this.state.isIntroductionError) {
      introductionHelperText = "プロジェクトの説明を入力してください";
    }

    switch (this.state.tagIDErrorCode) {
      case CreateProjectPage.TAG_ERROR_ONLY_SPACE:
        tagIDHelperText = "タグの名前は空白にはできません";
        break;
      case CreateProjectPage.TAG_ERROR_DUPLICATE:
        tagIDHelperText = "重複しているタグがあります";
        break;
      case CreateProjectPage.TAG_ERROR_UNUSABLE_CHAR:
        tagIDHelperText = "使用できない文字が含まれています";
        break;
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
            <div className={CommonStyles.content_subtitle}>タグ</div>
            <div className={CommonStyles.createProjectContentsBox}>
              <ScrollableTagList
                tagIDs={this.state.tagIDs}
                onTagClick={this.handleTagListClick}
              />
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              <TextField
                id="add_tag_name"
                label="追加するタグの名前"
                margin="normal"
                multiline
                variant="outlined"
                fullWidth
                onChange={this.handleTagNameInputChange}
                error={this.state.tagIDErrorCode !== 0}
                value={this.state.addingTagName}
                helperText={tagIDHelperText}
              />
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              <CreateSendButton
                canSend={
                  checkBlankSpace(this.state.addingTagName) &&
                  this.state.tagIDErrorCode === 0
                }
                handleSendButton={this.handleAddTagClick}
              >
                追加
              </CreateSendButton>
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              <Divider />
            </div>
            <div className={CommonStyles.createProjectContentsBox}>
              <CreateSendButton
                canSend={
                  checkBlankSpace(this.state.name) &&
                  checkBlankSpace(this.state.introduction)
                }
                handleSendButton={this.handleSendButton}
              >
                送信
              </CreateSendButton>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateProjectPage;
