import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "comp/SendButton";
import { Divider, Box } from "@material-ui/core";

import { checkBlankSpace } from "utils/ValidationUtil";
import ProjectBasicInfoForm from "comp/createProjPage/ProjectBasicInfoForm";
import ProjectTagForm from "comp/createProjPage/ProjectTagForm";
import ProjectSiteForm from "comp/createProjPage/ProjectSiteForm";
import { Site } from "api/Sites";

type ProjectError = "name" | "introduction" | "invalidUrl" | TagError;
type TagError = "tagBlank" | "tagDuplicate" | "tagUnusableChar";

type CreateProjectPageState = {
  name: string;
  introduction: string;
  tagIDs: string[];
  sites: Site[];
  errors: Set<ProjectError>;
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
      tagIDs: [],
      sites: [],
      errors: new Set<ProjectError>([]),
    };
  }

  errors = (
    previousErrors: Set<ProjectError>,
    error: ProjectError,
    isError: boolean
  ) => {
    const errors: Set<ProjectError> = new Set<ProjectError>([
      ...Array.from(previousErrors),
    ]);
    if (isError) {
      errors.add(error);
    } else {
      errors.delete(error);
    }
    return errors;
  };

  handleNameInputChange = (value: string, isValid: boolean) => {
    this.setState({
      name: value,
      errors: this.errors(this.state.errors, "name", !isValid),
    });
  };

  handleIntroductionInputChange = (value: string, isValid: boolean) => {
    this.setState({
      introduction: value,
      errors: this.errors(this.state.errors, "introduction", !isValid),
    });
  };

  handleTagChange = (tagIDs: string[]) => {
    this.setState({
      tagIDs: tagIDs,
    });
  };

  handleSitesChange = (sites: Site[]) => {
    this.setState({
      sites: sites,
    });
  };

  handleSendButton = () => {
    // TODO: ここでAPIに情報をぶん投げる
    const projectId = "7438921";
    this.props.history.push(`/projects/create/invite/${projectId}`);
  };

  render() {
    return (
      <>
        <div className={CommonStyles.form_wrapper}>
          <form autoComplete="off">
            <ProjectBasicInfoForm
              onNameChanged={this.handleNameInputChange}
              onIntroductionChanged={this.handleIntroductionInputChange}
            />
            <ProjectTagForm onTagsChange={this.handleTagChange} />
            <Box m={2} />
            <ProjectSiteForm onSitesChange={this.handleSitesChange} />
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
