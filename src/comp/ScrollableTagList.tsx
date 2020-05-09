import * as React from "react";

import ListElementTag from "./ListElementTag";
import { Tag } from "../lib/model/Tag";

type ProjectTagListProps = {
  tags: Tag[];
  onTagClick?: (tag: Tag, e: React.MouseEvent<HTMLParagraphElement>) => void;
};

export class ScrollableTagList extends React.Component<
  ProjectTagListProps,
  {}
> {
  render() {
    return this.props.tags.map((tag, index) => (
      <ListElementTag
        caption={tag.name}
        key={index}
        onDelete={(e: React.MouseEvent<HTMLParagraphElement>) => {
          if (typeof this.props.onTagClick !== "undefined") {
            this.props.onTagClick(tag, e);
          }
        }}
      />
    ));
  }
}
