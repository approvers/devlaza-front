import * as React from "react";
import { Chip } from "@material-ui/core";
import * as styles from "css/comp/ProjectTag.module.css";

export type ProjectTagProp = {
  tagId: string;
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

const ProjectTag: React.FC<ProjectTagProp> = (props: ProjectTagProp) => {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    // TODO: ここでAPIをぶっ叩く
    setName(`tag-${props.tagId}`);
  });

  return (
    <span className={styles.ptag_wrapper}>
      <Chip
        variant="outlined"
        label={name}
        onClick={props.onClick}
        onDelete={props.onDelete}
      />
    </span>
  );
};

export default ProjectTag;
