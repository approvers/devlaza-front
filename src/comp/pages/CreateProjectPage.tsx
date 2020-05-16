import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as CommonStyles from "css/comp/Common.module.css";
import CreateSendButton from "comp/SendButton";
import { Divider } from "@material-ui/core";

import { checkBlankSpace } from "utils/ValidationUtil";
import ProjectBasicInfoForm from "comp/createProjPage/ProjectBasicInfoForm";
import ProjectTagForm from "comp/createProjPage/ProjectTagForm";
import ProjectSiteForm from "comp/createProjPage/ProjectSiteForm";
import * as ProjectAPI from "lib/api/ProjectAPI";
import * as SiteAPI from "lib/api/SiteAPI";
import * as TagAPI from "lib/api/TagAPI";

type PendingSite = {
  description: string;
  url: string;
};

type ProjectError = "name" | "introduction";

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

  addError = (oldErrors: Set<ProjectError>, error: ProjectError) => {
    return new Set<ProjectError>([...Array.from(oldErrors), error]);
  };

  removeError = (oldErrors: Set<ProjectError>, error: ProjectError) => {
    const newErrors = new Set<ProjectError>([...Array.from(oldErrors)]);
    newErrors.delete(error);
    return newErrors;
  };

  handleNameInputChange = (value: string, isValid: boolean) => {
    let newErrors = this.state.errors;
    if (isValid) {
      newErrors = this.removeError(newErrors, "name");
    } else {
      newErrors = this.addError(newErrors, "name");
    }

    this.setState({
      errors: newErrors,
      name: value,
    });
  };

  handleIntroductionInputChange = (value: string, isValid: boolean) => {
    let newErrors = this.state.errors;
    if (isValid) {
      newErrors = this.removeError(newErrors, "introduction");
    } else {
      newErrors = this.addError(newErrors, "introduction");
    }

    this.setState({
      errors: newErrors,
      introduction: value,
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
