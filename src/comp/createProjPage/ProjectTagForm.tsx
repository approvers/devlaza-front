import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import { ScrollableTagList } from "comp/ScrollableTagList";
import { Box, TextField } from "@material-ui/core";
import CreateSendButton from "comp/SendButton";
import { checkBlankSpace } from "utils/ValidationUtil";

type ErrorType = "tagBlank" | "tagDuplicate" | "tagUnusableChar";

type ProjectTagFormProps = {
  onTagsChange: (tagIDs: string[]) => void;
};

type ProjectTagFormState = {
  addingTagName: string;
  tagIDs: string[];
  errors: Set<ErrorType>;
};

class ProjectTagForm extends React.Component<
  ProjectTagFormProps,
  ProjectTagFormState
> {
  private errorMessages: { [name in ErrorType]: string } = {
    tagBlank: "タグの名前は空白にはできません",
    tagDuplicate: "重複しているタグがあります",
    tagUnusableChar: "使用できない文字が含まれています",
  };

  constructor(props: ProjectTagFormProps) {
    super(props);

    this.state = {
      addingTagName: "",
      tagIDs: [],
      errors: new Set<ErrorType>([]),
    };
  }

  errors = (
    previousErrors: Set<ErrorType>,
    error: ErrorType,
    isError: boolean
  ) => {
    const errors: Set<ErrorType> = new Set<ErrorType>([
      ...Array.from(previousErrors),
    ]);
    if (isError) {
      errors.add(error);
    } else {
      errors.delete(error);
    }
    return errors;
  };

  handleTagNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;

    let newErrors = this.errors(
      this.state.errors,
      "tagBlank",
      !checkBlankSpace(e.target.value)
    );
    newErrors = this.errors(
      newErrors,
      "tagUnusableChar",
      e.target.value.indexOf("+") !== -1
    );

    this.setState({
      addingTagName: e.target.value,
      errors: newErrors,
    });
  };

  handleAddTagClick = () => {
    // TODO: APIをぶっ叩く
    // タグがすでに存在する場合はそのIDを結合します
    // 存在しない場合は新しく作成してIDをもらって、そのIDを結合します
    const tagID = "tag-" + this.state.addingTagName;

    if (this.state.tagIDs.indexOf(tagID) !== -1) {
      this.setState({
        errors: this.errors(this.state.errors, "tagUnusableChar", true),
      });
      return;
    }

    const newTagIDs = [...this.state.tagIDs, tagID];

    this.setState({
      tagIDs: newTagIDs,
      addingTagName: "",
    });

    this.props.onTagsChange(newTagIDs);
  };

  handleTagListClick = (id: string) => {
    const isUserDecided = window.confirm(`本当に削除しますか?`);
    if (!isUserDecided) return;

    const newTagsId: string[] = this.state.tagIDs.filter((e) => e !== id);
    this.setState({
      tagIDs: newTagsId,
    });
    this.props.onTagsChange(newTagsId);
  };

  render() {
    let tagIDHelperText = "";

    if (this.state.errors.has("tagBlank")) {
      tagIDHelperText = this.errorMessages["tagBlank"];
    }
    if (this.state.errors.has("tagDuplicate")) {
      tagIDHelperText = this.errorMessages["tagDuplicate"];
    }
    if (this.state.errors.has("tagUnusableChar")) {
      tagIDHelperText = this.errorMessages["tagUnusableChar"];
    }

    return (
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
          error={
            this.state.errors.has("tagBlank") ||
            this.state.errors.has("tagUnusableChar") ||
            this.state.errors.has("tagDuplicate")
          }
          value={this.state.addingTagName}
          helperText={tagIDHelperText}
        />
        <Box m={1} />
        <CreateSendButton
          canSend={
            checkBlankSpace(this.state.addingTagName) &&
            !this.state.errors.has("tagBlank") &&
            !this.state.errors.has("tagUnusableChar") &&
            !this.state.errors.has("tagDuplicate")
          }
          handleSendButton={this.handleAddTagClick}
          outline
        >
          追加
        </CreateSendButton>
      </div>
    );
  }
}

export default ProjectTagForm;
