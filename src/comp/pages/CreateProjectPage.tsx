import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "comp/SendButton";
import { Divider, Box } from "@material-ui/core";

import { checkBlankSpace } from "utils/ValidationUtil";
import ProjectBasicInfoForm from "comp/createProjPage/ProjectBasicInfoForm";
import ProjectTagForm from "comp/createProjPage/ProjectTagForm";
import ProjectSiteForm from "comp/createProjPage/ProjectSiteForm";
import { ProjectAPI } from "lib/api/ProjectAPI";
import { SiteAPI } from "lib/api/SiteAPI";
import { TagAPI } from "lib/api/TagAPI";

type PendingSite = {
  description: string;
  url: string;
};

type ProjectError = "name" | "introduction" | "invalidUrl" | TagError;
type TagError = "tagBlank" | "tagDuplicate" | "tagUnusableChar";

type CreateProjectPageState = {
  name: string;
  introduction: string;
  tagIDs: string[];
  sites: PendingSite[];
  errors: Set<ProjectError>;
  isSending: boolean;
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
      isSending: false,
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

  handleSitesChange = (sites: PendingSite[]) => {
    this.setState({
      sites: sites,
    });
  };

  handleSendButton = async () => {
    this.setState({
      isSending: true,
    });

    const projectAPIResult = await ProjectAPI.create(
      this.state.name,
      this.state.introduction
    );
    const projectId = projectAPIResult.received[0].uuid;

    for (const tagID of this.state.tagIDs) {
      await TagAPI.belongToProject(tagID, projectId);
    }
    for (const site of this.state.sites) {
      await SiteAPI.create(site.description, site.url, projectId);
    }
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
                  checkBlankSpace(this.state.introduction) &&
                  !this.state.isSending
                }
                handleSendButton={this.handleSendButton}
              >
                {this.state.isSending ? "作成中" : "作成"}
              </CreateSendButton>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateProjectPage;
