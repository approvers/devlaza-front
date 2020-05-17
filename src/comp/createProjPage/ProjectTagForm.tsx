import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import { ScrollableTagList } from "comp/ScrollableTagList";
import { TextInputField } from "comp/TextInputField";
import CreateSendButton from "comp/SendButton";
import { checkBlankSpace } from "utils/ValidationUtil";
import { TagList } from "lib/util/TagList";
import { Tag } from "../../lib/model/Tag";

type ErrorType = "tagBlank" | "tagDuplicate";

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
  private readonly errorMessages: { [name in ErrorType]: string } = {
    tagBlank: "タグの名前は空白にはできません",
    tagDuplicate: "重複しているタグがあります",
  };

  constructor(props: ProjectTagFormProps) {
    super(props);

    this.state = {
      addingTagName: "",
      tags: new TagList(),
      errors: new Set<ErrorType>([]),
    };
  }

  addError = (oldErrors: Set<ErrorType>, error: ErrorType) => {
    return new Set<ErrorType>([...Array.from(oldErrors), error]);
  };

  removeError = (oldErrors: Set<ErrorType>, error: ErrorType) => {
    const newErrors = new Set<ErrorType>([...Array.from(oldErrors)]);
    newErrors.delete(error);
    return newErrors;
  };

  handleTagNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.includes("\n")) return;

    let newErrors: Set<ErrorType> = this.state.errors;
    newErrors = this.removeError(newErrors, "tagDuplicate");
    newErrors = this.removeError(newErrors, "tagBlank");
    if (!checkBlankSpace(e.target.value)) {
      newErrors = this.addError(newErrors, "tagBlank");
    }

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
        errors: this.addError(this.state.errors, "tagDuplicate"),
      });
      return;
    }

    this.setState({
      tags: newTags,
      addingTagName: "",
    });

    this.props.onTagsChange(Array.from(newTags).map((value) => value.uuid));
  };

  handleTagListClick = (tag: Tag) => {
    const newTagsId = this.state.tags.deleteFromId(tag.uuid);
    this.setState({
      tags: newTagsId,
    });

    this.props.onTagsChange(Array.from(newTagsId).map((value) => value.uuid));
    this.setState({
      errors: this.removeError(this.state.errors, "tagDuplicate"),
    });
  };

  render() {
    const tagIDHelperText =
      (this.state.errors.has("tagBlank") && this.errorMessages["tagBlank"]) ||
      (this.state.errors.has("tagDuplicate") &&
        this.errorMessages["tagDuplicate"]);

    return (
      <div className={CommonStyles.createProjectContentsBox}>
        <div className={CommonStyles.content_subtitle}>タグ</div>
        <ScrollableTagList
          tags={Array.from(this.state.tags)}
          onTagClick={this.handleTagListClick}
        />
        <TextInputField
          id="add_tag_name"
          label="追加するタグの名前"
          onChange={this.handleTagNameInputChange}
          error={
            this.state.errors.has("tagBlank") ||
            this.state.errors.has("tagDuplicate")
          }
          value={this.state.addingTagName}
          helperText={tagIDHelperText}
        />
        <CreateSendButton
          canSend={
            checkBlankSpace(this.state.addingTagName) &&
            !this.state.errors.has("tagBlank") &&
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
