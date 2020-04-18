import * as React from "react";
import { Button } from "@material-ui/core";
import * as styles from "css/comp/FollowButton.module.css";

type userDetailsProps = {
  userId: number;
  loginUserFollowingIdList: number[];
  updateFollowingList: (followingIndex: number, userId: number) => void;
};

const FollowButton = (props: userDetailsProps) => {
  const checkFollowing = () => {
    const following = { isFollowing: false, followingIndex: -1 };
    props.loginUserFollowingIdList.forEach((followingId: number, i: number) => {
      if (followingId === props.userId) {
        following.isFollowing = true;
        following.followingIndex = i;
      }
    });
    return following;
  };

  const [followingState, changeState] = React.useState(checkFollowing());

  const changeFollowingState = () => {
    props.updateFollowingList(followingState.followingIndex, props.userId);
    changeState(checkFollowing());
  };

  const buttonContents = () => {
    if (followingState.isFollowing) {
      return (
        <Button
          size="small"
          variant="outlined"
          className={styles.buttonContentsWrapper}
          color="secondary"
          onClick={() => changeFollowingState()}
        >
          <p>Unfollow</p>
        </Button>
      );
    }
    return (
      <Button
        size="small"
        variant="outlined"
        className={styles.buttonContentsWrapper}
        color="secondary"
        onClick={() => changeFollowingState()}
      >
        <p>follow</p>
      </Button>
    );
  };

  return <>{buttonContents()}</>;
};

export default FollowButton;
