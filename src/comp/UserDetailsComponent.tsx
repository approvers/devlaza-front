import * as React from "react";
import { Cake, Code, PeopleAlt } from "@material-ui/icons";
import { Link } from "@material-ui/core";
import * as styles from "css/comp/UserDetailsComponent.module.css";

// 表示するユーザーの情報
type userDetailsState = {
  birthDay: string;
  favoriteLanguage: string;
  profileImageUrl: string;
  followingIdList: number[];
  followerIdList: number[];
};

const simplifyNumberStyle = (numberOfFollow: number) => {
  if (numberOfFollow >= 1000) {
    return Math.floor(numberOfFollow / 1000) + "k";
  }
  return numberOfFollow;
};

const UserDetailsComponent = (props: userDetailsState) => {
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.userDetails + " " + styles.iconBase}>
        <PeopleAlt className={styles.icon} fontSize="small" />
        <Link className={styles.followLink} color="inherit" href="/user/detail">
          <p>following {simplifyNumberStyle(props.followingIdList.length)}</p>
        </Link>
        <Link className={styles.followLink} color="inherit" href="/user/detail">
          <p>followers {simplifyNumberStyle(props.followerIdList.length)}</p>
        </Link>
      </div>
      <div className={styles.userDetails}>
        <div className={styles.iconBaseLine}>
          <Code className={styles.icon} fontSize="small" />
          <p>{props.favoriteLanguage}</p>
        </div>
        <div className={styles.iconBaseLine}>
          <Cake className={styles.icon} fontSize="small" />
          <p>{props.birthDay}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
