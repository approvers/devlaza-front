import * as React from "react";
import * as CommonStyles from "css/comp/Common.module.css";
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

type PendingSite = {
  description: string;
  url: string;
};

type ProjectSiteFormProps = {
  onSitesChange: (tagIDs: PendingSite[]) => void;
};

type ProjectSiteFormState = {
  siteName: string;
  siteUrl: string;
  sites: PendingSite[];
  isUrlInvalid: boolean;
};

class ProjectSiteForm extends React.Component<
  ProjectSiteFormProps,
  ProjectSiteFormState
> {
  constructor(props: ProjectSiteFormProps) {
    super(props);

    this.state = {
      siteName: "",
      siteUrl: "",
      sites: [],
      isUrlInvalid: false,
    };
  }

  handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf("\n") !== -1) return;

    this.setState({
      siteName: e.target.value,
    });
  };

  handleSiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf("\n") !== -1) return;

    const isError =
      checkBlankSpace(e.target.value) && !checkIsUrl(e.target.value);

    this.setState({
      siteUrl: e.target.value,
      isUrlInvalid: isError,
    });
  };

  handleSiteAddButton = () => {
    const newSites: PendingSite[] = [
      ...this.state.sites,
      {
        description: this.state.siteName,
        url: this.state.siteUrl,
      },
    ];

    this.setState({
      sites: newSites,
      siteName: "",
      siteUrl: "",
    });

    this.props.onSitesChange(newSites);
  };

  handleSiteRemoveButton = (index: number) => {
    const isUserDecided = window.confirm(`本当に削除しますか?`);
    if (!isUserDecided) return;

    const newSites = this.state.sites.filter(
      (_, elemIndex) => elemIndex !== index
    );

    this.setState({
      sites: newSites,
    });
    this.props.onSitesChange(newSites);
  };

  render() {
    let siteUrlHelperText = "";

    if (this.state.isUrlInvalid) {
      siteUrlHelperText = "正しい形式で入力されていません";
    }

    return (
      <div className={CommonStyles.createProjectContentsBox}>
        <div className={CommonStyles.content_subtitle}>関連サイト</div>
        <List style={{ padding: 0 }}>
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
          value={this.state.siteName}
        />
        <TextInputField
          id="site_url"
          label="サイトのURL"
          onChange={this.handleSiteUrlChange}
          error={this.state.isUrlInvalid}
          value={this.state.siteUrl}
          helperText={siteUrlHelperText}
        />
        <CreateSendButton
          canSend={
            checkBlankSpace(this.state.siteName) &&
            checkBlankSpace(this.state.siteUrl) &&
            !this.state.isUrlInvalid
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
