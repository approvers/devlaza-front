import * as React from "react";
import "../../css/comp/pages/MainPage.css";

import { PersonAdd, AccountCircle } from "@material-ui/icons";
import { Button } from "@material-ui/core";

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
            <Button variant="contained" size="large" startIcon={<PersonAdd />}>
              新規登録
            </Button>
          </div>
          <div className="mainpage-button-wrapper">
            <Button
              variant="contained"
              size="large"
              startIcon={<AccountCircle />}
            >
              ログイン
            </Button>
          </div>
        </div>
        <div className="mainpage-regist"></div>
      </div>
    );
  }
}

export default MainPage;
