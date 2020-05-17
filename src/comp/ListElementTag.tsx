import * as React from "react";
import { Avatar, Chip } from "@material-ui/core";
import * as styles from "css/comp/ProjectTag.module.css";

export type ListElementTagProps = {
  caption: string;
  imageUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};
class ListElementTag extends React.Component<ListElementTagProps, {}> {
  render() {
    let avatar: React.ReactElement | undefined;
    if (this.props.imageUrl != null) {
      avatar = <Avatar src={this.props.imageUrl} />;
    }

    return (
      <div className={styles.ptag_wrapper}>
        <Chip
          avatar={avatar}
          variant="outlined"
          label={this.props.caption}
          onClick={this.props.onClick}
          onDelete={this.props.onDelete}
        />
      </div>
    );
  }
}
export default ListElementTag;
