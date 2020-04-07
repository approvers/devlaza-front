import * as React from "react";
import * as styles from "css/comp/Header.module.css";
import { HeaderMenu, SearchContents } from "./Menu";
import { AppBar, Toolbar, IconButton, Drawer, Paper } from "@material-ui/core";
import EventListener from "react-event-listener";
import { Menu } from "@material-ui/icons";

export type HeaderState = {
  searchbox: string;
  showMenuIcon: boolean;
  showMenuList: boolean;
  moveSearchContents: boolean;
};
type HeaderProps = {};

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchbox: "",
      showMenuIcon: window.innerWidth <= 970 ? true : false,
      showMenuList: false,
      moveSearchContents: window.innerWidth <= 544 ? true : false,
    };
  }

  handleSearchBoxChange(inputValue: string) {
    this.setState({
      searchbox: inputValue,
    });
  }

  handleResize = () => {
    if (window.innerWidth <= 970) {
      this.setState({ showMenuIcon: true });
    } else {
      this.setState({
        showMenuIcon: false,
        showMenuList: false,
      });
    }
    if (window.innerWidth <= 544) {
      this.setState({ moveSearchContents: true });
    } else {
      this.setState({ moveSearchContents: false });
    }
  };

  changeMenuListStatus = (flag: boolean) => {
    this.setState({ showMenuList: flag });
  };

  menuButtonIcon = (
    <IconButton
      onClick={() => this.changeMenuListStatus(!this.state.showMenuList)}
    >
      <Menu className={styles.menuIcon} fontSize="large" />
    </IconButton>
  );

  render() {
    let menuContents: JSX.Element, searchContent: JSX.Element;
    let menuButtonList = (
      <HeaderMenu
        showMenuIcon={this.state.showMenuIcon}
        moveSearchContents={this.state.moveSearchContents}
        handleSearchBoxChange={this.handleSearchBoxChange}
        searchbox={this.state.searchbox}
      />
    );

    if (this.state.showMenuIcon) {
      menuContents = this.menuButtonIcon;
    } else {
      menuContents = menuButtonList;
    }

    if (!this.state.moveSearchContents) {
      searchContent = (
        <SearchContents
          handleSearchBoxChange={this.handleSearchBoxChange}
          searchbox={this.state.searchbox}
        />
      );
    } else {
      searchContent = <></>;
    }

    return (
      <React.Fragment>
        <EventListener target="window" onResize={this.handleResize} />
        <AppBar color="secondary">
          <Toolbar className={styles.header}>
            <div className={styles.header_contents_box}>
              <div className={styles.header_logo}>Devlaza</div>
              {searchContent}
            </div>
            {menuContents}
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Drawer
          anchor={"right"}
          open={this.state.showMenuList}
          onClose={() => this.changeMenuListStatus(false)}
        >
          <Paper className={styles.paper}>{menuButtonList}</Paper>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Header;
