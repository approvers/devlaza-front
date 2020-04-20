import * as React from "react";
import FollowButton from "../FollowButton";
import UserDetailsComponent from "../UserDetailsComponent";
import DevExperience from "../DevExperience";
import { AccountLink, AccountType } from "../AccountLink";
import { Divider } from "@material-ui/core";
import EventListener from "react-event-listener";
import * as styles from "css/comp/pages/UserDetailsPage.module.css";

// 表示するユーザーの情報
type UserDetailsState = {
  userId: number;
  name: string;
  birthDay: string;
  bio: string;
  favoriteLanguage: string;
  profileImageUrl: string;
  accounts: AccountType;
  showList: Array<keyof AccountType>;
  developmentExperienceId: number[];
  followingIdList: number[];
  followerIdList: number[];
  isPhone: boolean;
};

type UserDetailsProps = {
  loginUserFollowingIdList: number[];
  updateFollowingList: (followingIndex: number, userId: number) => void;
};

class UserDetailsPage extends React.Component<
  UserDetailsProps,
  UserDetailsState
> {
  constructor(props: UserDetailsProps) {
    super(props);
    this.state = {
      userId: 103,
      name: "unios103",
      birthDay: "2020/04/15",
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

  updateList = () => {
    this.props.updateFollowingList(
      this.checkFollowing().followIndex,
      this.state.userId
    );
  };

  checkFollowing = () => {
    const followingIndex = this.props.loginUserFollowingIdList.indexOf(
      this.state.userId
    );
    return { isFollow: followingIndex !== -1, followIndex: followingIndex };
  };

  render() {
    const element = {
      content: {
        userDetails: this.userDetails(),
        devExperience: <DevExperience />,
      },
      empty: { userDetails: <></>, devExperience: <></> },
    };
    let phoneElement = element.empty,
      pcElement = element.empty;
    if (this.state.isPhone) {
      phoneElement = element.content;
    } else {
      pcElement = element.content;
    }
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
              />
            </div>
            <div className={styles.followButton}>
              <FollowButton
                isFollow={this.checkFollowing().isFollow}
                updateFollowingList={this.updateList}
              />
            </div>
            {pcElement.userDetails}
            <div className={styles.accountWrapper}>
              <AccountLink
                accounts={this.state.accounts}
                showList={this.state.showList}
                isPhone={this.state.isPhone}
              />
            </div>
          </div>
          <div className={styles.profileDetailsWrapper}>
            <h1>{this.state.name}</h1>
            <Divider />
            {phoneElement.userDetails}
            <div className={styles.bio}>
              <p>{this.state.bio}</p>
            </div>
            {pcElement.devExperience}
          </div>
        </div>
        {phoneElement.devExperience}
      </>
    );
  }
}

export default UserDetailsPage;
