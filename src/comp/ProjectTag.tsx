import * as React from "react";
import { Chip } from "@material-ui/core";
import * as styles from "css/comp/ProjectTag.module.css";

export type ProjectTagProp = {
  tag_id: string;
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
      name: "タグ: " + this.props.tag_id,
    };
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
