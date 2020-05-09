import * as React from "react";
import * as styles from "css/comp/ProjectListView.module.css";

import ListElementTag from "./ListElementTag";
import { Tag } from "../lib/model/Tag";

export type ProjectListViewProp = {
  name: string;
  tags: Tag[];
  summary: string;
};

class ProjectListView extends React.Component<ProjectListViewProp, {}> {
  render() {
    return (
      <div className={styles.plv_wrapper}>
        <div className={styles.plv_title}>{this.props.name}</div>
        <div className={styles.plv_tags}>
          {this.props.tags.map((tag: Tag, index: number) => (
            <ListElementTag key={index} caption={tag.name} />
          ))}
        </div>
        <hr className={styles.plv_hr} />
        {this.props.summary}
      </div>
    );
  }
}

export default ProjectListView;
