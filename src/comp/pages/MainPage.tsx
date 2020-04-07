import * as React from "react";
import * as styles from "css/comp/pages/MainPage.module.css";

import { PersonAdd, AccountCircle } from "@material-ui/icons";
import { Button } from "@material-ui/core";

class MainPage extends React.Component {
  render() {
    return (
      <div className={styles.mainpage_wrapper}>
        <div className={styles.mainpage_title}>Devlaza</div>
        <div className={styles.mainpage_catchcopy}>
          「Devlaza」はすべての開発者のためのコミュニティーです。
          <br />
          あなたの開発欲をプロジェクトにぶつけてみませんか？
        </div>
        <div className={styles.mainpage_buttons}>
          <div className={styles.mainpage_button_wrapper}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<PersonAdd />}
            >
              新規登録
            </Button>
          </div>
          <div className={styles.mainpage_button_wrapper}>
            <Button
              color="default"
              variant="outlined"
              size="large"
              startIcon={<AccountCircle />}
            >
              ログイン
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
