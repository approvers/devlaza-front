import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventListener from "react-event-listener";
import * as styles from "css/App.module.css";
import Header from "./comp/Header";
import Footer from "./comp/Footer";

import { MuiThemeProvider } from "@material-ui/core/styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import * as Pages from "./comp/pages";
import { theme } from "./theme";

library.add(fas, far);

// ログインしているユーザーの情報
type AppStatus = {
  loginUserFollowingIdList: number[];
  isPhone: boolean;
};

type AppProps = {};

export const Context = React.createContext(window.innerWidth <= 600);

class App extends React.Component<AppProps, AppStatus> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loginUserFollowingIdList: [10, 220],
      isPhone: window.innerWidth <= 600,
    };
  }

  handleResize = () => {
    this.setState({ isPhone: window.innerWidth <= 600 });
  };

  userIdToFollow = (userId: number) => {
    const list = this.state.loginUserFollowingIdList;
    list.push(userId);
    this.setState({ loginUserFollowingIdList: list });
  };
  userIdToUnfollow = (userId: number) => {
    const list = this.state.loginUserFollowingIdList.filter((id: number) => {
      return id !== userId;
    });
    this.setState({ loginUserFollowingIdList: list });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <EventListener target="window" onResize={this.handleResize} />
        <Context.Provider value={this.state.isPhone}>
          <div className={styles.App}>
            <Header />
            <div className={styles.app_content_wrapper}>
              <Router>
                <Route exact path="/" component={Pages.MainPage} />
                <Route
                  exact
                  path="/projects/create"
                  component={Pages.CreateProjectPage}
                />
                <Route
                  path="/user/detail"
                  render={() => (
                    <Pages.UserDetailsPage
                      loginUserFollowingIdList={
                        this.state.loginUserFollowingIdList
                      }
                      userIdToFollow={this.userIdToFollow}
                      userIdToUnFollow={this.userIdToUnfollow}
                    />
                  )}
                />
                <Route
                  path="/projects/detail/:uuid"
                  component={Pages.ProjectDetailPage}
                />
              </Router>
            </div>
            <div className={styles.footerPosition}>
              <Footer />
            </div>
          </div>
        </Context.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
