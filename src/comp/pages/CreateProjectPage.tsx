import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "../SendButton";
import {
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@material-ui/core";
import { ScrollableTagList } from "../ScrollableTagList";
import CloseIcon from "@material-ui/icons/Close";

type Site = {
  title: string;
  url: string;
};

type CreateProjectPageState = {
  name: string;
  introduction: string;
  addingTagName: string;
  siteNameText: string;
  siteURLText: string;
  tagIDs: string[];
  sites: Site[];
  isNameError: boolean;
  isIntroductionError: boolean;
  isSiteNameError: boolean;
  siteUrlInvalid: boolean;
  tagIDErrorCode: number;
};

const checkBlankSpace = (value: string) => !!value.match(/\S/g);
const checkIsUrl = (value: string) => !!value.match(/^https?:\/\/.+$/g);

class CreateProjectPage extends React.Component<
  RouteComponentProps,
  CreateProjectPageState
> {
  static readonly TAG_ERROR_BLANK = 1;
  static readonly TAG_ERROR_DUPLICATE = 2;
  static readonly TAG_ERROR_UNUSABLE_CHAR = 3;

  static readonly SITE_URL_BLANK = 1;
  static readonly SITE_URL_NOT_URL = 2;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      addingTagName: "",
      siteNameText: "",
      siteURLText: "",
      tagIDs: [],
      sites: [],
      isNameError: false,
      isIntroductionError: false,
      isSiteNameError: false,
      siteUrlInvalid: false,
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
    this.props.history.push(`/projects/create/invite/${projectId}`);
  };

  handleTagNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;

    let errorCode = 0;
    if (!checkBlankSpace(e.target.value)) {
      errorCode = CreateProjectPage.TAG_ERROR_BLANK;
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

  handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.endsWith("\n")) return;
    const isError = !checkBlankSpace(e.target.value);
    this.setState({
      siteNameText: e.target.value,
      isSiteNameError: isError,
    });
  };

  handleSiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.endsWith("\n")) return;

    const isError =
      checkBlankSpace(e.target.value) && !checkIsUrl(e.target.value);

    this.setState({
      siteURLText: e.target.value,
      siteUrlInvalid: isError,
    });
  };

  handleSiteAddButton = () => {
    this.setState({
      sites: [
        ...this.state.sites,
        {
          title: this.state.siteNameText,
          url: this.state.siteURLText,
        },
      ],
      siteNameText: "",
      siteURLText: "",
      isSiteNameError: false,
      siteUrlInvalid: false,
    });
  };

  handleSiteRemoveButton = (index: number) => {
    const isUserDecided = window.confirm(`本当に削除しますか?`);
    if (isUserDecided) {
      this.setState({
        sites: this.state.sites.filter((_, elemIndex) => elemIndex !== index),
      });
    }
  };

  render() {
    let nameHelperText = "";
    let introductionHelperText = "";
    let tagIDHelperText = "";
    let siteUrlHelperText = "";

    if (this.state.isNameError) {
      nameHelperText = "プロジェクト名を入力してください";
    }
    if (this.state.isIntroductionError) {
      introductionHelperText = "プロジェクトの説明を入力してください";
    }
    if (this.state.siteUrlInvalid) {
      siteUrlHelperText = "正しい形式で入力されていません";
    }

    switch (this.state.tagIDErrorCode) {
      case CreateProjectPage.TAG_ERROR_BLANK:
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
        <div className={CommonStyles.form_wrapper}>
          <form autoComplete="off">
            <div className={CommonStyles.createProjectContentsBox}>
              <div className={CommonStyles.content_title}>プロジェクト作成</div>
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
              <div className={CommonStyles.content_subtitle}>タグ</div>
              <ScrollableTagList
                tagIDs={this.state.tagIDs}
                onTagClick={this.handleTagListClick}
              />
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
              <Box m={1} />
              <CreateSendButton
                canSend={
                  checkBlankSpace(this.state.addingTagName) &&
                  this.state.tagIDErrorCode === 0
                }
                handleSendButton={this.handleAddTagClick}
                outline
              >
                追加
              </CreateSendButton>
            </div>
            <Box m={2} />
            <div className={CommonStyles.createProjectContentsBox}>
              <div className={CommonStyles.content_subtitle}>関連サイト</div>
              <List style={{ padding: 0 }}>
                {this.state.sites.map((site, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={site.title} secondary={site.url} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          this.handleSiteRemoveButton(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <TextField
                id="site_name"
                label="サイトの名前"
                margin="normal"
                multiline
                variant="outlined"
                fullWidth
                onChange={this.handleSiteNameChange}
                value={this.state.siteNameText}
              />
              <TextField
                id="site_url"
                label="サイトのURL"
                margin="normal"
                multiline
                variant="outlined"
                fullWidth
                onChange={this.handleSiteUrlChange}
                error={this.state.siteUrlInvalid}
                value={this.state.siteURLText}
                helperText={siteUrlHelperText}
              />
              <Box m={1} />
              <CreateSendButton
                canSend={
                  checkBlankSpace(this.state.siteNameText) &&
                  checkBlankSpace(this.state.siteURLText) &&
                  !this.state.siteUrlInvalid
                }
                handleSendButton={this.handleSiteAddButton}
                outline
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
