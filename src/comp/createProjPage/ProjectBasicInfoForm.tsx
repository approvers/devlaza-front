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

  addError = (oldErrors: Set<ErrorType>, error: ErrorType) => {
    return new Set<ErrorType>([...Array.from(oldErrors), error]);
  };

  removeError = (oldErrors: Set<ErrorType>, error: ErrorType) => {
    const newErrors = new Set<ErrorType>([...Array.from(oldErrors)]);
    newErrors.delete(error);
    return newErrors;
  };

  handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // multiline属性を消すと表示が乱れるのでこっちで複数行入力を阻止する
    if (e.target.value.includes("\n")) return;
    const isError = !checkBlankSpace(e.target.value);

    let newErrors: Set<ErrorType> = this.state.errors;
    if (isError) {
      newErrors = this.addError(newErrors, "name");
    } else {
      newErrors = this.removeError(newErrors, "name");
    }
    this.setState({
      name: e.target.value,
      errors: newErrors,
    });
    this.props.onNameChanged(e.target.value, !isError);
  };

  handleIntroductionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isError = !checkBlankSpace(e.target.value);

    let newErrors: Set<ErrorType> = this.state.errors;
    if (isError) {
      newErrors = this.addError(newErrors, "introduction");
    } else {
      newErrors = this.removeError(newErrors, "introduction");
    }

    this.setState({
      introduction: e.target.value,
      errors: newErrors,
    });
    this.props.onIntroductionChanged(e.target.value, !isError);
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
