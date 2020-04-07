import * as React from "react";
import * as styles from "css/comp/ProjectTag.module.css";

export type ProjectTagProp = {
  tag_id: string;
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
    return <p className={styles.ptag_wrapper}>{this.state.name}</p>;
  }
}

export default ProjectTag;
