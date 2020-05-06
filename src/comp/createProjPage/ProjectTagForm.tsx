import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import { ScrollableTagList } from "comp/ScrollableTagList";
import { Box, TextField } from "@material-ui/core";
import CreateSendButton from "comp/SendButton";
import { checkBlankSpace } from "utils/ValidationUtil";
import { TagList } from "lib/util/TagList";

type ErrorType = "tagBlank" | "tagDuplicate" | "tagUnusableChar";

type ProjectTagFormProps = {
  onTagsChange: (tagIDs: string[]) => void;
};

type ProjectTagFormState = {
  addingTagName: string;
  tags: TagList;
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
      tags: new TagList(),
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
    newErrors.delete("tagDuplicate");

    this.setState({
      addingTagName: e.target.value,
      errors: newErrors,
    });
  };

  handleAddTagClick = async () => {
    const newTags = await this.state.tags.concatFromName(
      this.state.addingTagName
    );

    if (newTags.length === this.state.tags.length) {
      this.setState({
        errors: this.errors(this.state.errors, "tagDuplicate", true),
      });
      return;
    }

    this.setState({
      tags: newTags,
      addingTagName: "",
    });

    this.props.onTagsChange(Array.from(newTags).map((value) => value.uuid));
  };

  handleTagListClick = (id: string) => {
    const isUserDecided = window.confirm(`本当に削除しますか?`);
    if (!isUserDecided) return;

    const newTagsId = this.state.tags.deleteFromId(id);
    this.setState({
      tags: newTagsId,
    });

    this.props.onTagsChange(Array.from(newTagsId).map((value) => value.uuid));
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
          tagIDs={Array.from(this.state.tags).map((value) => value.uuid)}
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
