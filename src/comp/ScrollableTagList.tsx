import * as React from "react";

import style from "css/comp/ScrollableTagList.module.css";
import ProjectTag from "./ProjectTag";

type ProjectTagListProps = {
  tagIDs: string[];
  onTagClick: (
    tagID: string,
    e: React.MouseEvent<HTMLParagraphElement>
  ) => void;
};

export class ScrollableTagList extends React.Component<
  ProjectTagListProps,
  {}
> {
  static defaultProps = {
    onTagClick: () => {
      /* do nothing by default*/
    },
  };

  render() {
    return (
      <div className={style.tag_list_wrapper}>
        <div className={style.tag_list}>
          {this.props.tagIDs.map((name) => (
            <ProjectTag
              tag_id={name}
              key={name}
              onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
                this.props.onTagClick(name, e);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
