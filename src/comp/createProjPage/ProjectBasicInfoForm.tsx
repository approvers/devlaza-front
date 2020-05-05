import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import { TextField } from "@material-ui/core";
import { checkBlankSpace } from "utils/ValidationUtil";

type ErrorType = "name" | "introduction";

type ProjectBasicInfoFormProps = {
  onNameChanged: (value: string, isValid: boolean) => void;
  onIntroductionChanged: (value: string, isValid: boolean) => void;
};

type ProjectBasicInfoFormState = {
  name: string;
  introduction: string;
  errors: Set<ErrorType>;
};

class ProjectBasicInfoForm extends React.Component<
  ProjectBasicInfoFormProps,
  ProjectBasicInfoFormState
> {
  private errorMessages: { [name in ErrorType]: string } = {
    name: "プロジェクト名を入力してください",
    introduction: "プロジェクトの説明を入力してください",
  };

  constructor(props: ProjectBasicInfoFormProps) {
    super(props);

    this.state = {
      name: "",
      introduction: "",
      errors: new Set<ErrorType>([]),
    };
  }

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.endsWith("\n")) return;
    const isError = !checkBlankSpace(e.target.value);

    this.setState({
      name: e.target.value,
      errors: this.errors(this.state.errors, "name", isError),
    });
    this.props.onNameChanged(e.target.value, !isError);
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = !checkBlankSpace(e.target.value);

    this.setState({
      introduction: e.target.value,
      errors: this.errors(this.state.errors, "introduction", isError),
    });
    this.props.onIntroductionChanged(e.target.value, !isError);
  };

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

  render() {
    let nameHelperText = "";
    let introductionHelperText = "";

    if (this.state.errors.has("name")) {
      nameHelperText = this.errorMessages["name"];
    }
    if (this.state.errors.has("introduction")) {
      introductionHelperText = this.errorMessages["introduction"];
    }

    return (
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
          error={this.state.errors.has("name")}
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
          error={this.state.errors.has("introduction")}
          helperText={introductionHelperText}
        />
      </div>
    );
  }
}

export default ProjectBasicInfoForm;
