import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import { TextInputField } from "comp/TextInputField";
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
    if (e.target.value.includes("\n")) return;
    const isError = !checkBlankSpace(e.target.value);

    if (isError) {
      this.addError("name");
    } else {
      this.removeError("name");
    }
    this.setState({
      name: e.target.value,
    });
    this.props.onNameChanged(e.target.value, !isError);
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = !checkBlankSpace(e.target.value);

    if (isError) {
      this.addError("introduction");
    } else {
      this.removeError("introduction");
    }

    this.setState({
      introduction: e.target.value,
    });
    this.props.onIntroductionChanged(e.target.value, !isError);
  };

  addError = (error: ErrorType) => {
    this.setState({
      errors: new Set<ErrorType>([...Array.from(this.state.errors), error]),
    });
  };

  removeError = (error: ErrorType) => {
    const newErrors = new Set<ErrorType>([...Array.from(this.state.errors)]);
    newErrors.delete(error);
    this.setState({
      errors: newErrors,
    });
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
        <TextInputField
          id="project-name"
          label="名前"
          required
          onChange={this.handleNameInputChange}
          error={this.state.errors.has("name")}
          value={this.state.name}
          helperText={nameHelperText}
        />
        <TextInputField
          id="project-intro"
          label="プロジェクトの説明"
          required
          rows={4}
          onChange={this.handleIntroductionInputChange}
          error={this.state.errors.has("introduction")}
          helperText={introductionHelperText}
        />
      </div>
    );
  }
}

export default ProjectBasicInfoForm;
