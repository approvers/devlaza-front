import * as React from "react";
import { Button } from "@material-ui/core";
import * as styles from "css/comp/FollowButton.module.css";

type userDetailsProps = {
  isFollow: boolean;
  updateFollowingList: (isFollow: boolean) => void;
};

const FollowButton = (props: userDetailsProps) => {
  const buttonContents = (isFollow: boolean) => {
    if (isFollow) {
      return <p>Unfollow</p>;
    }
    return <p>Follow</p>;
  };

  return (
    <Button
      size="small"
      variant="outlined"
      className={styles.buttonContentsWrapper}
      color="secondary"
      onClick={() => props.updateFollowingList(props.isFollow)}
    >
      {buttonContents(props.isFollow)}
    </Button>
  );
};

export default FollowButton;
