import * as React from "react";
import "./MainPage.css";

import * as Icons from "@material-ui/icons";
import * as MaterialUI from "@material-ui/core";

class MainPage extends React.Component {
  render() {
    return (
      <div className="mainpage-wrapper">
        <div className="mainpage-title">Devlaza</div>
        <div className="mainpage-catchcopy">
          「Devlaza」はすべての開発者のためのコミュニティーです。
          <br />
          あなたの開発欲をプロジェクトにぶつけてみませんか？
        </div>
        <div className="mainpage-buttons">
          <div className="mainpage-button-wrapper">
            <MaterialUI.Button
              variant="contained"
              size="large"
              startIcon={<Icons.PersonAdd />}
            >
              新規登録
            </MaterialUI.Button>
          </div>
          <div className="mainpage-button-wrapper">
            <MaterialUI.Button
              variant="contained"
              size="large"
              startIcon={<Icons.AccountCircle />}
            >
              ログイン
            </MaterialUI.Button>
          </div>
        </div>
        <div className="mainpage-regist"></div>
      </div>
    );
  }
}

export default MainPage;
