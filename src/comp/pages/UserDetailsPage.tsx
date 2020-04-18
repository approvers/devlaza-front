import * as React from "react";
import { Twitter, GitHub, Mail } from "@material-ui/icons";
import FollowButton from "../FollowButton";
import UserDetailsComponent from "../UserDetailsComponent";
import { Link, Divider } from "@material-ui/core";
import EventListener from "react-event-listener";
import * as styles from "css/comp/pages/UserDetailsPage.module.css";

type accountType = {
  github: string;
  twitter: string;
  mailAddress: string;
};

type accountTypeOfElement = {
  github: JSX.Element;
  twitter: JSX.Element;
  mailAddress: JSX.Element;
};

// 表示するユーザーの情報
type userDetailsState = {
  userId: number;
  name: string;
  birthDay: number;
  bio: string;
  favoriteLanguage: string;
  profileImageUrl: string;
  accounts: accountType;
  showList: Array<keyof accountType>;
  developmentExperienceId: number[];
  followingIdList: number[];
  followerIdList: number[];
  isPhone: boolean;
};

type userDetailsProps = {
  loginUserFollowingIdList: number[];
  updateFollowingList: (followingIndex: number, userId: number) => void;
};

const accountsIcons: accountTypeOfElement = {
  twitter: <Twitter fontSize="small" />,
  github: <GitHub fontSize="small" />,
  mailAddress: <Mail fontSize="small" />,
};

const url: accountType = {
  twitter: "https://twitter.com/",
  github: "https://github.com/",
  mailAddress: "mailto:",
};

class UserDetailsPage extends React.Component<
  userDetailsProps,
  userDetailsState
> {
  constructor(props: userDetailsProps) {
    super(props);
    this.state = {
      userId: 103,
      name: "unios103",
      birthDay: 20200415,
      bio: "unios103だよ！Reactべんつよします。",
      favoriteLanguage: "TypeScript",
      profileImageUrl: "https://github.com/unios103.png",
      accounts: {
        github: "unios103",
        twitter: "unios103",
        mailAddress: "unios103@gmail.com",
      },
      showList: ["github", "twitter", "mailAddress"],
      developmentExperienceId: [7438921],
      followingIdList: [11, 33],
      followerIdList: [112],
      isPhone: window.innerWidth <= 600,
    };
  }

  returnAccount = () => {
    const accounts: accountType = this.state.accounts;
    const accountElement = this.state.showList.map(
      (
        accountName: keyof accountType | keyof accountTypeOfElement,
        i: number
      ) => {
        return (
          <Link
            className={styles.iconAndText}
            color="secondary"
            key={i}
            href={url[accountName] + accounts[accountName]}
          >
            <p>{accountsIcons[accountName]}</p>
            {this.state.isPhone ? <></> : <p>{accounts[accountName]}</p>}
          </Link>
        );
      }
    );
    return accountElement;
  };

  handleResize = () => {
    this.setState({ isPhone: window.innerWidth <= 600 });
  };

  userDetails = () => {
    return (
      <UserDetailsComponent
        birthDay={this.state.birthDay}
        favoriteLanguage={this.state.favoriteLanguage}
        profileImageUrl={this.state.profileImageUrl}
        followingIdList={this.state.followingIdList}
        followerIdList={this.state.followerIdList}
      />
    );
  };

  render() {
    return (
      <>
        <EventListener target="window" onResize={this.handleResize} />
        <div className={styles.profilePageWrapper}>
          <div className={styles.profileWrapper}>
            <div className={styles.profileImageWrapper}>
              <img
                src={this.state.profileImageUrl}
                alt={this.state.name}
                className={styles.profileImage}
              ></img>
            </div>
            <div className={styles.followButton}>
              <FollowButton
                userId={this.state.userId}
                loginUserFollowingIdList={this.props.loginUserFollowingIdList}
                updateFollowingList={this.props.updateFollowingList}
              />
            </div>
            {this.state.isPhone ? <></> : this.userDetails()}
            <div className={styles.accountWrapper}>{this.returnAccount()}</div>
          </div>
          <div className={styles.profileDetailsWrapper}>
            <h1>{this.state.name}</h1>
            <Divider />
            {this.state.isPhone ? this.userDetails() : <></>}
            <div className={styles.bio}>
              <p>{this.state.bio}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserDetailsPage;
