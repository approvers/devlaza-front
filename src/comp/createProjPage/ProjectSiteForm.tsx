import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
import * as style from "css/comp/createProjectPage/ProjectSiteForm.module.css";
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { TextInputField } from "comp/TextInputField";
import CloseIcon from "@material-ui/icons/Close";
import CreateSendButton from "comp/SendButton";
import { checkBlankSpace, checkIsUrl } from "utils/ValidationUtil";

type SiteError = "UrlInvalid" | "UrlDuplicate" | "DescriptionDuplicate";

type PendingSite = {
  description: string;
  url: string;
};

type ProjectSiteFormProps = {
  onSitesChange: (tagIDs: PendingSite[]) => void;
};

type ProjectSiteFormState = {
  description: string;
  siteUrl: string;
  sites: PendingSite[];
  errors: Set<SiteError>;
};

const errorMessages: { [name in SiteError]: string } = {
  UrlInvalid: "正しい形式で入力されていません",
  UrlDuplicate: "URLが重複しています",
  DescriptionDuplicate: "名前が重複しています",
};

const getHelperText = (errors: Set<SiteError>) => {
  const siteDescriptionHelperText =
    errors.has("DescriptionDuplicate") && errorMessages["DescriptionDuplicate"];
  const siteUrlHelperText =
    (errors.has("UrlDuplicate") && errorMessages["UrlDuplicate"]) ||
    (errors.has("UrlInvalid") && errorMessages["UrlInvalid"]);

  return { siteDescriptionHelperText, siteUrlHelperText };
};

class ProjectSiteForm extends React.Component<
  ProjectSiteFormProps,
  ProjectSiteFormState
> {
  constructor(props: ProjectSiteFormProps) {
    super(props);

    this.state = {
      description: "",
      siteUrl: "",
      sites: [],
      errors: new Set<SiteError>([]),
    };
  }

  addError = (oldErrors: Set<SiteError>, error: SiteError) => {
    return new Set<SiteError>([...Array.from(oldErrors), error]);
  };

  removeError = (oldErrors: Set<SiteError>, error: SiteError) => {
    const newErrors = new Set<SiteError>([...Array.from(oldErrors)]);
    newErrors.delete(error);
    return newErrors;
  };

  handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("\n")) return;

    this.setState({
      description: e.target.value,
      errors: this.removeError(this.state.errors, "DescriptionDuplicate"),
    });
  };

  handleSiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("\n")) return;

    let newErrors = this.state.errors;
    newErrors = this.removeError(newErrors, "UrlDuplicate");

    if (checkBlankSpace(e.target.value) && !checkIsUrl(e.target.value)) {
      newErrors = this.addError(newErrors, "UrlInvalid");
    } else {
      newErrors = this.removeError(newErrors, "UrlInvalid");
    }

    this.removeError(newErrors, "UrlDuplicate");

    this.setState({
      siteUrl: e.target.value,
      errors: newErrors,
    });
  };

  handleSiteAddButton = () => {
    const newSites: PendingSite[] = [
      ...this.state.sites,
      {
        description: this.state.description,
        url: this.state.siteUrl,
      },
    ];

    let newErrors: Set<SiteError> = this.state.errors;
    const isDescriptionDuplicate =
      this.state.sites.find(
        (value) => value.description === this.state.description
      ) !== undefined;
    const isUrlDuplicate =
      this.state.sites.find((value) => value.url === this.state.siteUrl) !==
      undefined;
    if (isDescriptionDuplicate) {
      newErrors = this.addError(newErrors, "DescriptionDuplicate");
    }
    if (isUrlDuplicate) {
      newErrors = this.addError(newErrors, "UrlDuplicate");
    }

    if (newErrors.size > this.state.errors.size) {
      this.setState({
        errors: newErrors,
      });
      return;
    }

    this.setState({
      sites: newSites,
      description: "",
      siteUrl: "",
    });

    this.props.onSitesChange(newSites);
  };

  handleSiteRemoveButton = (index: number) => {
    const descriptionDuplicated =
      this.state.sites[index].description === this.state.description;
    const urlDuplicated = this.state.sites[index].url === this.state.siteUrl;

    let newErrors: Set<SiteError> = this.state.errors;
    if (descriptionDuplicated) {
      newErrors = this.removeError(newErrors, "DescriptionDuplicate");
    }
    if (urlDuplicated) {
      newErrors = this.removeError(newErrors, "UrlDuplicate");
    }

    const newSites = this.state.sites.filter(
      (_, elemIndex) => elemIndex !== index
    );

    this.setState({
      sites: newSites,
      errors: newErrors,
    });
    this.props.onSitesChange(newSites);
  };

  render() {
    const { siteDescriptionHelperText, siteUrlHelperText } = getHelperText(
      this.state.errors
    );

    return (
      <div className={CommonStyles.createProjectContentsBox}>
        <div className={CommonStyles.content_subtitle}>関連サイト</div>
        <List className={style.site_list_wrapper}>
          {this.state.sites.map((site, index) => (
            <Card variant="outlined" key={index}>
              <ListItem>
                <ListItemText primary={site.description} secondary={site.url} />
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
            </Card>
          ))}
        </List>
        <TextInputField
          id="site_name"
          label="サイトの名前"
          onChange={this.handleSiteNameChange}
          value={this.state.description}
          error={this.state.errors.has("DescriptionDuplicate")}
          helperText={siteDescriptionHelperText}
        />
        <TextInputField
          id="site_url"
          label="サイトのURL"
          onChange={this.handleSiteUrlChange}
          error={
            this.state.errors.has("UrlDuplicate") ||
            this.state.errors.has("UrlInvalid")
          }
          value={this.state.siteUrl}
          helperText={siteUrlHelperText}
        />
        <CreateSendButton
          canSend={
            checkBlankSpace(this.state.description) &&
            checkBlankSpace(this.state.siteUrl) &&
            !(this.state.errors.size > 0)
          }
          handleSendButton={this.handleSiteAddButton}
          outline
        >
          追加
        </CreateSendButton>
      </div>
    );
  }
}

export default ProjectSiteForm;
