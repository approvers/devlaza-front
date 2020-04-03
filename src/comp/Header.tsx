import * as React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderState = {
  searchbox: string;
};
type HeaderProps = {};

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchbox: "",
    };
  }

  handleSearchBoxChange(inputValue: string) {
    this.setState({
      searchbox: inputValue,
    });
  }

  render() {
    return (
      <div className="header">
        <div className="header-logo">Devlaza</div>
        <div className="header-btn-wrapper">
          {/*
						CSS上でfloat: rightしているので
						表示上の順番とHTML上の順番が逆になってます
					*/}
          <div className="header-btn new-regist">新規登録</div>
          <div className="header-btn">ログイン</div>
          <div className="header-btn resp-low-prio">人気プロジェクト</div>
        </div>
        <div className="header-search">
          {/*
						CSS上でfloat: rightしているので
						表示上の順番とHTML上の順番が逆になってます
					*/}
          <div className="header-search-btn">
            <FontAwesomeIcon icon="search" />
          </div>
          <div className="header-search-text">
            <input
              value={this.state.searchbox}
              onChange={(e) => this.handleSearchBoxChange(e.target.value)}
            />
          </div>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
    );
  }
}

export default Header;
