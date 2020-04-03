import * as React from "react";
import "../css/comp/ProjectListView.css";

import ProjectTag from "./ProjectTag";

export type ProjectListViewProp = {
  name: string;
  tag_id: string[];
  summary: string;
};

class ProjectListView extends React.Component<ProjectListViewProp, {}> {
  render() {
    return (
      <div className="plv-wrapper">
        <div className="plv-title">{this.props.name}</div>
        <div className="plv-tags">
          {this.props.tag_id.map((id: string) => (
            <ProjectTag tag_id={id} />
          ))}
        </div>
        <hr className="plv-hr" />
        {this.props.summary}
      </div>
    );
  }
}

export default ProjectListView;
