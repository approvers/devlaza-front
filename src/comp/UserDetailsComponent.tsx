import * as React from "react";
import { Cake, Code, PeopleAlt } from "@material-ui/icons";
import { Link } from "@material-ui/core";
import * as styles from "css/comp/UserDetailsComponent.module.css";

type accountType = {
  github: string;
  twitter: string;
  mailAddress: string;
};

// 表示するユーザーの情報
type userDetailsState = {
  birthDay: number;
  favoriteLanguage: string;
  profileImageUrl: string;
  followingIdList: number[];
  followerIdList: number[];
};

const UserDetailsComponent = (props: userDetailsState) => {
  const conversionBirthdayFormat = () => {
    const birthDay =
      Math.floor(props.birthDay / 1e4) +
      "/" +
      Math.floor((props.birthDay % 1e4) / 1e2) +
      "/" +
      Math.floor(props.birthDay % 1e2);
    return birthDay;
  };

  const changeDisplayStyle = (numberOfFollow: number) => {
    if (numberOfFollow >= 1000) {
      return Math.floor(numberOfFollow / 1000) + "k";
    }
    return numberOfFollow;
  };

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.userDetails + " " + styles.iconBase}>
        <PeopleAlt className={styles.icon} fontSize="small" />
        <Link className={styles.followLink} color="inherit" href="/user/detail">
          <p>following {changeDisplayStyle(props.followingIdList.length)}</p>
        </Link>
        <Link className={styles.followLink} color="inherit" href="/user/detail">
          <p>followers {changeDisplayStyle(props.followerIdList.length)}</p>
        </Link>
      </div>
      <div className={styles.userDetails}>
        <div className={styles.iconBaseLine}>
          <Code className={styles.icon} fontSize="small" />
          <p>{props.favoriteLanguage}</p>
        </div>
        <div className={styles.iconBaseLine}>
          <Cake className={styles.icon} fontSize="small" />
          <p>{conversionBirthdayFormat()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
