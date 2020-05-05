import * as React from "react";
import * as styles from "css/comp/ProjectListView.module.css";

import ProjectTag from "./ProjectTag";

export type ProjectListViewProp = {
  name: string;
  tag_id: string[];
  summary: string;
};

class ProjectListView extends React.Component<ProjectListViewProp, {}> {
  render() {
    return (
      <div className={styles.plv_wrapper}>
        <div className={styles.plv_title}>{this.props.name}</div>
        <div className={styles.plv_tags}>
          {this.props.tag_id.map((id: string, index: number) => (
            <ProjectTag key={index} tagId={id} />
          ))}
        </div>
        <hr className={styles.plv_hr} />
        {this.props.summary}
      </div>
    );
  }
}

export default ProjectListView;
