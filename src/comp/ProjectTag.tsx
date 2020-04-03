import * as React from "react";
import "../css/comp/ProjectTag.css";

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
      name: "タグ: " + this.props.tag_id
    };
  }

  render() {
    return <div className="ptag-wrapper">{this.state.name}</div>;
  }
}

export default ProjectTag;
