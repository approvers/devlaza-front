import * as React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-row">
          <div className="footer-row-title">プロジェクトを探す</div>
          <ul className="footer-row-content">
            <li>人気プロジェクト</li>
            <li>条件を指定して検索</li>
          </ul>
        </div>
        <div className="footer-row">
          <div className="footer-row-title">プロジェクトを作る</div>
          <ul className="footer-row-content">
            <li>プロジェクトを作成</li>
          </ul>
        </div>
        <div className="footer-row">
          <div className="footer-row-title">ユーザーを探す</div>
          <ul className="footer-row-content">
            <li>名前から探す</li>
          </ul>
        </div>
        <div className="copyright">
          ©2020 Devlaza †Approvers† All rights reserved.
        </div>
      </div>
    );
  }
}

export default Footer;
