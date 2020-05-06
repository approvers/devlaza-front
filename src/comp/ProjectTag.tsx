import * as React from "react";
import { Chip } from "@material-ui/core";
import * as styles from "css/comp/ProjectTag.module.css";

export type ProjectTagProp = {
  tagId: string;
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

type ProjectTagState = {
  name: string;
};

class ProjectTag extends React.Component<ProjectTagProp, ProjectTagState> {
  constructor(props: ProjectTagProp) {
    super(props);

    this.state = {
      name: "",
    };
  }

  componentDidMount(): void {
    // TODO: APIを叩く
    this.setState({
      name: "タグ: " + this.props.tagId,
    });
  }

  render() {
    return (
      <span className={styles.ptag_wrapper}>
        <Chip
          variant="outlined"
          label={this.state.name}
          onClick={this.props.onClick}
          onDelete={this.props.onDelete}
        />
      </span>
    );
  }
}
export default ProjectTag;
