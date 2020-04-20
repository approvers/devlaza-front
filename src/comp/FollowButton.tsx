import * as React from "react";
import { Button } from "@material-ui/core";
import * as styles from "css/comp/FollowButton.module.css";

type userDetailsProps = {
  isFollow: boolean;
  updateFollowingList: () => void;
};

const FollowButton = (props: userDetailsProps) => {
  const buttonContents = (isFollow: boolean) => {
    let followButtonText = "Follow";
    if (isFollow) {
      followButtonText = "Unfollow";
    }
    return <p>{followButtonText}</p>;
  };

  return (
    <Button
      size="small"
      variant="outlined"
      className={styles.buttonContentsWrapper}
      color="secondary"
      onClick={() => props.updateFollowingList()}
    >
      {buttonContents(props.isFollow)}
    </Button>
  );
};

export default FollowButton;
