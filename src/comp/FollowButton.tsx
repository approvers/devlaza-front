import * as React from "react";
import { Button } from "@material-ui/core";
import * as styles from "css/comp/FollowButton.module.css";

type userDetailsProps = {
  isFollow: boolean;
  updateFollowingList: (isFollow: boolean) => void;
};

const FollowButton = (props: userDetailsProps) => {
  return (
    <Button
      size="small"
      variant="outlined"
      className={styles.buttonContentsWrapper}
      color="secondary"
      onClick={() => props.updateFollowingList(props.isFollow)}
    >
      {props.isFollow ? <p>UnFollow</p> : <p>Follow</p>}
    </Button>
  );
};

export default FollowButton;
