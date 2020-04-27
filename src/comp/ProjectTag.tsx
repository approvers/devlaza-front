import * as React from "react";
import * as styles from "css/comp/ProjectTag.module.css";

export type ProjectTagProp = {
  tag_id: string;
  onClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

type ProjectTagState = {
  name: string;
};

class ProjectTag extends React.Component<ProjectTagProp, ProjectTagState> {
  static defaultProps = {
    onClick: () => {
      /* do nothing as default */
    },
  };

  constructor(props: ProjectTagProp) {
    super(props);

    this.state = {
      name: "タグ: " + this.props.tag_id,
    };
  }

  render() {
    return (
      <p className={styles.ptag_wrapper} onClick={this.props.onClick}>
        {this.state.name}
      </p>
    );
  }
}

export default ProjectTag;
